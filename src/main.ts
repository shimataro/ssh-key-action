import * as fs from "fs";
import * as path from "path";

import * as core from "@actions/core";

interface FileInfo
{
	name: string;
	mode: number;
	flag: string;
	contents: string;
}

/**
 * main function
 */
function main(): void
{
	try
	{
		const name = core.getInput("name");
		const files: FileInfo[] = [
			{
				name: name,
				mode: 0o400,
				flag: "w",
				contents: core.getInput("private-key"),
			},
			{
				name: `${name}.pub`,
				mode: 0o444,
				flag: "w",
				contents: core.getInput("public-key"),
			},
			{
				name: "known_hosts",
				mode: 0o644,
				flag: "a",
				contents: core.getInput("known-hosts"),
			},
			{
				name: "config",
				mode: 0o644,
				flag: "a",
				contents: core.getInput("config"),
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
		for(const file of files)
		{
			const fileName = path.join(dirName, file.name);
			fs.writeFileSync(fileName, file.contents, {
				mode: file.mode,
				flag: file.flag,
			});
		}

		console.log(`SSH key has been stored to ${dirName} successfully.`);
	}
	catch(err)
	{
		core.setFailed(err.message);
	}
}

/**
 * get home directory
 * @returns home directory
 */
function getHomeDirectory(): string
{
	const homeEnv = process.platform == "win32" ? "USERPROFILE" : "HOME";
	const home = process.env[homeEnv];
	if(home === undefined)
	{
		throw Error(`${homeEnv} is not defined`);
	}

	return home;
}

main();
