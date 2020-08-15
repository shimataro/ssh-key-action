"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const core = __importStar(require("@actions/core"));
/**
 * main function
 */
function main() {
    try {
        const files = [
            {
                name: core.getInput("name"),
                contents: core.getInput("key", {
                    required: true,
                }),
                options: {
                    mode: 0o400,
                    flag: "ax",
                },
            },
            {
                name: "known_hosts",
                contents: insertLf(core.getInput("known_hosts", {
                    required: true,
                })),
                options: {
                    mode: 0o644,
                    flag: "a",
                },
            },
            {
                name: "config",
                contents: insertLf(core.getInput("config")),
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
 * prepend/append LF to value if not empty
 * @param value the value to prepend LF
 * @returns prepended value
 */
function insertLf(value) {
    let affectedValue = value;
    if (value.length === 0) {
        // do nothing if empty
        return "";
    }
    if (!affectedValue.startsWith("\n")) {
        affectedValue = `\n${affectedValue}`;
    }
    if (!affectedValue.endsWith("\n")) {
        affectedValue = `${affectedValue}\n`;
    }
    return affectedValue;
}
main();
//# sourceMappingURL=main.js.map