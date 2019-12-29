import * as fs from "fs";
import * as path from "path";

import * as core from "@actions/core";

interface FileInfo
{
	name: string;
	contents: string;
	options: fs.WriteFileOptions;
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
				contents: core.getInput("private-key"),
				options: {
					mode: 0o400,
				},
			},
			{
				name: `${name}.pub`,
				contents: core.getInput("public-key"),
				options: {
					mode: 0o444,
				},
			},
			{
				name: "known_hosts",
				contents: core.getInput("known-hosts"),
				options: {
					mode: 0o644,
					flag: "a",
				},
			},
			{
				name: "config",
				contents: core.getInput("config"),
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
		for(const file of files)
		{
			const fileName = path.join(dirName, file.name);
			fs.writeFileSync(fileName, file.contents, file.options);
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
