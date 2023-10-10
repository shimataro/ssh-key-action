import fs from "fs";
import path from "path";

import * as core from "@actions/core";

import * as common from "./common";

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
 * restore files
 * @param backupSuffix suffix of backup directory
 */
function restore(backupSuffix: string): void {
    const dirName = common.getSshDirectory();
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
    console.log(`Following files in suffix "${backupSuffix}" are restored; ${restoredFileNames.join(", ")}`);
}
