import fs from "fs";
import path from "path";

import * as core from "@actions/core";

interface FileInfo
{
	name: string;
	contents: string;
	options: fs.WriteFileOptions;
}

const KNOWN_HOSTS = [
	"github.com ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==",
];

/**
 * main function
 */
function main(): void
{
	try
	{
		const inputName = core.getInput("name");
		const inputKey = core.getInput("key", {
			required: true,
		});
		const inputKnownHosts = core.getInput("known_hosts");
		const inputConfig = core.getInput("config");

		const files: FileInfo[] = [
			{
				name: inputName,
				contents: inputKey,
				options: {
					mode: 0o400,
					flag: "ax",
				},
			},
			{
				name: "known_hosts",
				contents: prependLf(KNOWN_HOSTS.concat(inputKnownHosts).join("\n")),
				options: {
					mode: 0o644,
					flag: "a",
				},
			},
			{
				name: "config",
				contents: prependLf(inputConfig),
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
 * prepend LF to value if not empty
 * @param value the value to prepend LF
 * @returns prepended value
 */
function prependLf(value: string): string
{
	if(value.length === 0)
	{
		// do nothing if empty
		return "";
	}

	return `\n${value}`;
}

main();
