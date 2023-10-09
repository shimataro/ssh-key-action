import fs from "fs";
import path from "path";

import * as core from "@actions/core";

interface FileInfo {
    name: string;
    contents: string;
    options: fs.WriteFileOptions;
}

const STATE_BACKUP_SUFFIX = "backup-suffix";

const KNOWN_HOSTS = [
    "github.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj7ndNxQowgcQnjshcLrqPEiiphnt+VTTvDP6mHBL9j1aNUkY4Ue1gvwnGLVlOhGeYrnZaMgRK6+PKCUXaDbC7qtbW8gIkhL7aGCsOr/C56SJMy/BCZfxd1nWzAOxSDPgVsmerOBYfNqltV9/hWCqBywINIR+5dIg6JTJ72pcEpEjcYgXkE2YEFXV1JHnsKgbLWNlhScqb2UmyRkQyytRLtL+38TGxkxCflmO+5Z8CSSNY7GidjMIZ7Q4zMjA2n1nGrlTDkzwDCsw+wqFPGQA179cnfGWOWRVruj16z6XyvxvjJwbz0wQZ75XK5tKSb7FNyeIEs4TT4jk+S4dhPeAUC5y+bDYirYgM4GC7uEnztnZyaVWQ7B381AK4Qdrwt51ZqExKbQpTUNn+EjqoTwvqNj4kqx5QUCI0ThS/YkOxJCXmPUWZbhjpCg56i+2aB6CmK2JGhn57K5mj0MNdBXA4/WnwH6XoPWJzK5Nyu2zB3nAZp+S5hpQs+p1vN1/wsjk=",
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
    if (!isPost()) {
        setup();
        setPost();
    } else {
        cleanup();
    }
}

/**
 * is post process?
 * @returns Yes/No
 */
function isPost(): boolean {
    return Boolean(core.getState("isPost"));
}

/**
 * update post state
 */
function setPost(): void {
    core.saveState("isPost", "true");
}

/**
 * setup function
 */
function setup(): void {
    const backupSuffix = generateBackupSuffix();

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
    const backedUpFileNames: string[] = [];
    for (const file of files) {
        const fileName = path.join(sshDirName, file.name);
        if (backup(fileName, backupSuffix)) {
            backedUpFileNames.push(file.name);
        }

        fs.writeFileSync(fileName, file.contents, file.options);
    }

    console.log(`SSH key has been stored to ${sshDirName} successfully.`);
    if (backedUpFileNames.length > 0) {
        console.log(`Following files are backed up in suffix "${backupSuffix}; ${backedUpFileNames.join(", ")}.`);
    }
}

/**
 * cleanup function
 */
function cleanup(): void {
    const backupSuffix = core.getState(STATE_BACKUP_SUFFIX);
    if (backupSuffix === "") {
        // remove ".ssh" directory if suffix is not set
        const sshDirName = removeSshDirectory();

        console.log(`SSH key in ${sshDirName} has been removed successfully.`);
    } else {
        restore(backupSuffix);

        console.log(`Files that have suffix "${backupSuffix} has been restored successfully.`);
    }
}

/**
 * generate backup suffix name
 * @returns backup suffix
 */
function generateBackupSuffix(): string {
    const dirName = getSshDirectory();
    if (!fs.existsSync(dirName)) {
        // do nothing if .ssh does not exist
        return "";
    }

    const backupSuffix = `.bak-${Date.now()}`;
    core.saveState(STATE_BACKUP_SUFFIX, backupSuffix);
    return backupSuffix;
}

/**
 * back up file
 * @param fileName file to back up
 * @param backupSuffix suffix
 * @returns is file backed up?
 */
function backup(fileName: string, backupSuffix: string): boolean {
    if (backupSuffix === "") {
        return false;
    }
    if (!fs.existsSync(fileName)) {
        return false;
    }

    // move -> copy (in order to keep permissions when restore)
    const fileNameBak = `${fileName}${backupSuffix}`;
    fs.renameSync(fileName, fileNameBak);
    fs.copyFileSync(fileNameBak, fileName);

    return true;
}

/**
 * restore files
 * @param backupSuffix suffix of backup directory
 */
function restore(backupSuffix: string): void {
    const dirName = getSshDirectory();
    const keyFileName = core.getInput("name");

    const restoredFileNames: string[] = [];
    for (const fileName of ["known_hosts", "config", keyFileName]) {
        const pathNameOrg = path.join(dirName, fileName);
        const pathNameBak = `${pathNameOrg}${backupSuffix}`;

        if (!fs.existsSync(pathNameBak)) {
            continue;
        }

        fs.rmSync(pathNameOrg);
        fs.renameSync(pathNameBak, pathNameOrg);
        restoredFileNames.push(fileName);
    }
    console.log(`Following files are restored; ${restoredFileNames.join(",")}`);
}

/**
 * create ".ssh" directory
 * @returns directory name
 */
function createSshDirectory(): string {
    const dirName = getSshDirectory();
    fs.mkdirSync(dirName, {
        recursive: true,
        mode: 0o700,
    });
    return dirName;
}

/**
 * remove ".ssh" directory
 * @returns removed directory name
 */
function removeSshDirectory(): string {
    const dirName = getSshDirectory();
    fs.rmSync(dirName, {
        recursive: true,
        force: true,
    });
    return dirName;
}

/**
 * get SSH directory
 * @returns SSH directory name
 */
function getSshDirectory(): string {
    return path.resolve(getHomeDirectory(), ".ssh");
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
