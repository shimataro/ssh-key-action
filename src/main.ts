import fs from "fs";
import path from "path";

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
		const files: FileInfo[] = [
			{
				name: core.getInput("name"),
				contents: insertLfToEnd(core.getInput("key", {
					required: true,
				})),
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
	const homeEnv = getHomeEnv();
	const home = process.env[homeEnv];
	if(home === undefined)
	{
		throw Error(`${homeEnv} is not defined`);
	}

	return home;
}

/**
 * get HOME environment name
 * @returns HOME environment name
 */
function getHomeEnv(): string
{
	if(process.platform === "win32")
	{
		// Windows
		return "USERPROFILE";
	}

	// macOS / Linux
	return "HOME";
}

/**
 * append LF to value to the end if not empty
 * @param value the value to prepend LF
 * @returns prepended value
 */
function insertLfToEnd(value: string): string
{
	let affectedValue = value;

	if(value.length === 0)
	{
		// do nothing if empty
		return "";
	}
	if(!affectedValue.endsWith("\n"))
	{
		affectedValue = `${affectedValue}\n`;
	}

	return affectedValue;
}

/**
 * prepend/append LF to value if not empty
 * @param value the value to prepend LF
 * @returns prepended value
 */
function insertLf(value: string): string
{
	let affectedValue = value;

	if(value.length === 0)
	{
		// do nothing if empty
		return "";
	}
	if(!affectedValue.startsWith("\n"))
	{
		affectedValue = `\n${affectedValue}`;
	}
	affectedValue = insertLfToEnd(affectedValue);

	return affectedValue;
}

main();
