"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const core = __importStar(require("@actions/core"));
/**
 * main function
 */
function main() {
    try {
        const files = [
            {
                name: core.getInput("name"),
                contents: core.getInput("private-key", {
                    required: true,
                }),
                options: {
                    mode: 0o400,
                    flag: "ax",
                },
            },
            {
                name: "known_hosts",
                contents: prependLf(core.getInput("known-hosts")),
                options: {
                    mode: 0o644,
                    flag: "a",
                },
            },
            {
                name: "config",
                contents: prependLf(core.getInput("config")),
                options: {
                    mode: 0o644,
                    flag: "a",
                },
            },
        ];
        // create ".ssh" directory
        const home = getHomeDirectory();
        const dirName = path.resolve(home, ".ssh");
        fs.mkdirSync(dirName, {
            recursive: true,
            mode: 0o700,
        });
        // create files
        for (const file of files) {
            const fileName = path.join(dirName, file.name);
            fs.writeFileSync(fileName, file.contents, file.options);
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