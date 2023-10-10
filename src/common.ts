import * as fs from "fs";
import * as path from "path";

import * as core from "@actions/core";

/** state name of backup suffix */
const STATE_BACKUP_SUFFIX = "backup-suffix";

/**
 * create backup suffix name
 * @param dirName directory to back up
 * @returns backup suffix
 */
export function createBackupSuffix(dirName: string): string {
    if (!fs.existsSync(dirName)) {
        // do nothing if directory does not exist
        return "";
    }

    const backupSuffix = `.bak-${Date.now()}`;
    core.saveState(STATE_BACKUP_SUFFIX, backupSuffix);
    return backupSuffix;
}

/**
 * get backup suffix name
 * @returns backup suffix (if not, empty string)
 */
export function getBackupSuffix(): string {
    return core.getState(STATE_BACKUP_SUFFIX);
}

/**
 * get SSH directory
 * @returns SSH directory name
 */
export function getSshDirectory(): string {
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
