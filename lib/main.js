"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const core = __importStar(require("@actions/core"));
const KNOWN_HOSTS = [
    "github.com ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==",
];
/**
 * main function
 */
function main() {
    try {
        const inputName = core.getInput("name");
        const inputKey = core.getInput("key", {
            required: true,
        });
        const inputKnownHosts = core.getInput("known_hosts");
        const inputConfig = core.getInput("config");
        const files = [
            {
                name: inputName,
                contents: inputKey,
                options: {
                    mode: 0o400,
                    flag: "ax",
                },
            },
            {
                name: "known_hosts",
                contents: prependLf(KNOWN_HOSTS.concat(inputKnownHosts).join("\n")),
                options: {
                    mode: 0o644,
                    flag: "a",
                },
            },
            {
                name: "config",
                contents: prependLf(inputConfig),
                options: {
                    mode: 0o644,
                    flag: "a",
                },
            },
        ];
        // create ".ssh" directory
        const home = getHomeDirectory();
        const dirName = path_1.default.resolve(home, ".ssh");
        fs_1.default.mkdirSync(dirName, {
            recursive: true,
            mode: 0o700,
        });
        // create files
        for (const file of files) {
            const fileName = path_1.default.join(dirName, file.name);
            fs_1.default.writeFileSync(fileName, file.contents, file.options);
        }
        console.log(`SSH key has been stored to ${dirName} successfully.`);
    }
    catch (err) {
        core.setFailed(err.message);
    }
}
/**
 * get home directory
 * @returns home directory
 */
function getHomeDirectory() {
    const homeEnv = getHomeEnv();
    const home = process.env[homeEnv];
    if (home === undefined) {
        throw Error(`${homeEnv} is not defined`);
    }
    return home;
}
/**
 * get HOME environment name
 * @returns HOME environment name
 */
function getHomeEnv() {
    if (process.platform === "win32") {
        // Windows
        return "USERPROFILE";
    }
    // macOS / Linux
    return "HOME";
}
/**
 * prepend LF to value if not empty
 * @param value the value to prepend LF
 * @returns prepended value
 */
function prependLf(value) {
    if (value.length === 0) {
        // do nothing if empty
        return "";
    }
    return `\n${value}`;
}
main();
//# sourceMappingURL=main.js.map