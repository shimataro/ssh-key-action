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
function main() {
    try {
        const home = getHomeDirectory();
        const dirName = path.resolve(home, ".ssh");
        fs.mkdirSync(dirName, {
            recursive: true,
            mode: 0o700,
        });
        const privateKey = core.getInput('private-key');
        const publicKey = core.getInput('public-key');
        const name = core.getInput('name');
        const fileName = path.resolve(dirName, name);
        fs.writeFileSync(fileName, privateKey, {
            mode: 0o400,
        });
        fs.writeFileSync(`${fileName}.pub`, publicKey, {
            mode: 0o444,
        });
        console.log(`SSH key has been stored to ${fileName} successfully.`);
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
    const home_env = process.platform == "win32" ? "USERPROFILE" : "HOME";
    const home = process.env[home_env];
    if (home === undefined) {
        throw new Error(`${home_env} is not defined`);
    }
    return home;
}
main();
//# sourceMappingURL=main.js.map