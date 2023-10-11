import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import * as core from "@actions/core";

/** state name of backup suffix */
const STATE_BACKUP_SUFFIX = "backup-suffix";
const STATE_CREATED_FILES = "created-files";

/**
 * create backup suffix name
 * @param dirName directory to back up
 * @returns backup suffix; empty string if directory does not exist
 */
export function createBackupSuffix(dirName: string): string {
    if (!fs.existsSync(dirName)) {
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
 * save created file names
 * @param fileNames array of file names
 */
export function saveCreatedFileNames(fileNames: string[]): void {
    const json = JSON.stringify(fileNames);
    core.saveState(STATE_CREATED_FILES, json);
}

/**
 * save created file names
 * @returns saved array of file names
 */
export function loadCreatedFileNames(): string[] {
    const json = core.getState(STATE_CREATED_FILES);
    if (json === "") {
        return [];
    }

    return JSON.parse(json) as string[];
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
    const homedir = os.homedir();
    if (homedir === "/github/home") {
        // Docker container
        return "/root";
    }

    return homedir;
}
