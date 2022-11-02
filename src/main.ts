import fs from "fs";
import path from "path";

import * as core from "@actions/core";

interface FileInfo {
    name: string;
    contents: string;
    options: fs.WriteFileOptions;
}

const KNOWN_HOSTS = [
    "github.com ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==",
];

try {
    main();
} catch (err) {
    if (err instanceof Error) {
        core.setFailed(err);
    }
}

/**
 * main function
 */
function main(): void {
    // parameters
    const key = core.getInput("key", {
        required: true,
    });
    const name = core.getInput("name");
    const knownHosts = core.getInput("known_hosts", {
        required: true,
    });
    const config = core.getInput("config");
    const ifKeyExists = core.getInput("if_key_exists");

    // create ".ssh" directory
    const sshDirName = createSshDirectory();

    // files to be created
    const files: FileInfo[] = [
        {
            name: "known_hosts",
            contents: insertLf(buildKnownHostsArray(knownHosts).join("\n"), true, true),
            options: {
                mode: 0o644,
                flag: "a",
            },
        },
    ];
    if (shouldCreateKeyFile(path.join(sshDirName, name), ifKeyExists)) {
        files.push({
            name: name,
            contents: insertLf(key, false, true),
            options: {
                mode: 0o400,
                flag: "wx",
            },
        });
    }
    if (config !== "") {
        files.push({
            name: "config",
            contents: insertLf(config, true, true),
            options: {
                mode: 0o644,
                flag: "a",
            },
        });
    }

    // create files
    for (const file of files) {
        const fileName = path.join(sshDirName, file.name);
        fs.writeFileSync(fileName, file.contents, file.options);
    }

    console.log(`SSH key has been stored to ${sshDirName} successfully.`);
}

/**
 * create ".ssh" directory
 * @returns directory name
 */
function createSshDirectory(): string {
    const home = getHomeDirectory();
    const dirName = path.resolve(home, ".ssh");
    fs.mkdirSync(dirName, {
        recursive: true,
        mode: 0o700,
    });
    return dirName;
}

/**
 * get home directory
 * @returns home directory name
 */
function getHomeDirectory(): string {
    const homeEnv = getHomeEnv();
    const home = process.env[homeEnv];
    if (home === undefined) {
        throw Error(`${homeEnv} is not defined`);
    }

    if (home === "/github/home") {
        // Docker container
        return "/root";
    }

    return home;
}

/**
 * get HOME environment name
 * @returns HOME environment name
 */
function getHomeEnv(): string {
    if (process.platform === "win32") {
        // Windows
        return "USERPROFILE";
    }

    // macOS / Linux
    return "HOME";
}

/**
 * prepend/append LF to value if not empty
 * @param value the value to insert LF
 * @param prepend true to prepend
 * @param append true to append
 * @returns new value
 */
function insertLf(value: string, prepend: boolean, append: boolean): string {
    let affectedValue = value;

    if (value.length === 0) {
        // do nothing if empty
        return "";
    }
    if (prepend && !affectedValue.startsWith("\n")) {
        affectedValue = `\n${affectedValue}`;
    }
    if (append && !affectedValue.endsWith("\n")) {
        affectedValue = `${affectedValue}\n`;
    }

    return affectedValue;
}

/**
 * should create SSH key file?
 * @param keyFilePath path of key file
 * @param ifKeyExists action if SSH key exists
 * @returns Yes/No
 */
function shouldCreateKeyFile(keyFilePath: string, ifKeyExists: string): boolean {
    if (!fs.existsSync(keyFilePath)) {
        // should create if file does not exist
        return true;
    }

    switch (ifKeyExists) {
        case "replace":
            // remove file and should create if replace
            fs.unlinkSync(keyFilePath);
            return true;

        case "ignore":
            // should NOT create if ignore
            return false;

        default:
            // error otherwise
            throw new Error(`SSH key is already installed. Set "if_key_exists" to "replace" or "ignore" in order to avoid this error.`);
    }
}

/**
 * build array of known_hosts
 * @param knownHosts known_hosts
 * @returns array of known_hosts
 */
function buildKnownHostsArray(knownHosts: string): string[] {
    if (knownHosts === "unnecessary") {
        return KNOWN_HOSTS;
    }
    return KNOWN_HOSTS.concat(knownHosts);
}
