#!/bin/bash
# requires following packages:
# - git; I believe it's already installed.
# - sed; GNU sed is preferred. POSIX sed may not work.
set -eu

COLOR_ERROR="\e[1;41m"
COLOR_SECTION="\e[1;34m"
COLOR_COMMAND_NAME="\e[1;34m"
COLOR_OPTION="\e[4;36m"
COLOR_COMMAND="\e[4m"
COLOR_FILE="\e[1;34m"
COLOR_BRANCH="\e[1;31m"
COLOR_INPUT="\e[1;31m"
COLOR_SELECT="\e[1;32m"
COLOR_RESET="\e[m"

function main() {
	if [ $# -lt 1 ]; then
		usage
	fi

	cd $(dirname ${0})/..

	local VERSION=$1
	check_version_format ${VERSION}

	update_changelog ${VERSION}
	update_package_version ${VERSION}
	update_dependencies_version
	regenerate_package_lock
	build_package
	commit_changes ${VERSION}
}

function usage() {
	local COMMAND=`basename ${0}`

	echo -e "${COLOR_SECTION}NAME${COLOR_RESET}
	${COMMAND} - Prepare for new release

${COLOR_SECTION}SYNOPSIS${COLOR_RESET}
	${COLOR_COMMAND_NAME}${COMMAND}${COLOR_RESET} <${COLOR_OPTION}new-version${COLOR_RESET}>

${COLOR_SECTION}DESCRIPTION${COLOR_RESET}
	This command:
	- updates ${COLOR_FILE}CHANGELOG.md${COLOR_RESET}
	- updates package version in ${COLOR_FILE}package.json${COLOR_RESET}
	- updates dependencies version in ${COLOR_FILE}package.json${COLOR_RESET}
	- verifies
	- ...and commits!

	${COLOR_OPTION}new-version${COLOR_RESET} must follow \"Semantic Versioning\" <https://semver.org/>.
"
	exit 1
}

function check_version_format() {
	if [[ $1 =~ ^[0-9]+\.[0-9]+\.[0-9]+ ]]; then
		return
	fi

	echo -e "${COLOR_ERROR}ERROR:${COLOR_RESET} Follow \"Semantic Versioning\" <https://semver.org/> for new version.
" >&2
	exit 2
}

function update_changelog() {
	local VERSION=$1
	local DATE=`date "+%Y-%m-%d"`
	local KEYWORD="Unreleased"

	sed -i".bak" -r \
		-e "s/^((##\s+)\[${KEYWORD}\])$/\1\n\n\2[${VERSION}] - ${DATE}/" \
		-e "s/^(\[${KEYWORD}\](.*))(v.*)\.\.\.HEAD$/\1v${VERSION}...HEAD\n[${VERSION}]\2\3...v${VERSION}/" \
		CHANGELOG.md
}

function update_package_version() {
	local VERSION=$1

	sed -i".bak" -r \
		-e "s/(\"version\"\s*:\s*)\".*?\"/\1\"${VERSION}\"/" \
		package.json
}

function update_dependencies_version() {
	npm ci
	npm run check-updates -- -u
}

function regenerate_package_lock() {
	rm -rf package-lock.json node_modules
	npm install
}

function build_package() {
	npm run build
	npm run verify
}

function commit_changes() {
	local VERSION=$1

	rm -rf node_modules
	npm ci --only=production
	git add CHANGELOG.md package.json package-lock.json lib
	git commit -m "version ${VERSION}"
}

main "$@"
