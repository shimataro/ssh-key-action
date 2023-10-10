import * as fs from "fs";
import * as path from "path";

import * as core from "@actions/core";

import * as common from "./common";

try {
    post();
} catch (err) {
    if (err instanceof Error) {
        core.setFailed(err);
    }
}

/**
 * cleanup function
 */
export function post(): void {
    const backupSuffix = common.getBackupSuffix();
    if (backupSuffix === "") {
        // remove ".ssh" directory if suffix is not set
        removeSshDirectory();
    } else {
        // restore files from backup suffix
        restore(backupSuffix);
    }
}

/**
 * remove ".ssh" directory
 */
function removeSshDirectory(): void {
    const dirName = common.getSshDirectory();
    fs.rmSync(dirName, {
        recursive: true,
        force: true,
    });

    console.log(`SSH key in ${dirName} has been removed successfully.`);
}

/**
 * restore files from backups
 * @param backupSuffix suffix of backup directory
 */
function restore(backupSuffix: string): void {
    const dirName = common.getSshDirectory();
    const restoredFileNames: string[] = [];
    const entries = fs.readdirSync(dirName)
        .filter((entry) => {
            // skip if not a backed-up file
            return entry.endsWith(backupSuffix);
        });

    for (const entry of entries) {
        const entryOrg = entry.substring(0, entry.length - backupSuffix.length);
        const pathNameOrg = path.join(dirName, entryOrg);
        const pathNameBak = path.join(dirName, entry);

        fs.rmSync(pathNameOrg);
        fs.renameSync(pathNameBak, pathNameOrg);
        restoredFileNames.push(entryOrg);
    }
    console.log(`Following files in suffix "${backupSuffix}" are restored; ${restoredFileNames.join(", ")}`);
}
