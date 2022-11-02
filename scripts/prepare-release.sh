#!/bin/bash
# requires following packages:
# - git; I believe you have already installed.
# - sed; GNU sed is preferred. POSIX sed may not work.
# - perl; Already installed on most of unix system.
set -eu

BASE_BRANCH="develop"

PACKAGE_NAME="ssh-key-action"
URL_PRODUCT="https://github.com/shimataro/${PACKAGE_NAME}"
URL_REPOSITORY="${URL_PRODUCT}.git"
URL_COMPARE="${URL_PRODUCT}/compare"
URL_RELEASE="${URL_PRODUCT}/releases/new"

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
	cd $(dirname ${0})/..

	if [ $# -lt 1 ]; then
		usage
	fi

	local VERSION=$1
	local BRANCH="release/v${VERSION}"
	local TAG="v${VERSION}"

	check_version_format ${VERSION}
	check_current_branch

	create_branch ${BRANCH}
	update_changelog ${VERSION}
	update_package_version ${VERSION}
	build_package
	commit_changes ${VERSION}
	finish ${VERSION} ${BRANCH} ${TAG}
}

function usage() {
	local COMMAND=`basename ${0}`

	echo -e "${COLOR_SECTION}NAME${COLOR_RESET}
	${COMMAND} - Create a branch and prepare for new release

${COLOR_SECTION}SYNOPSIS${COLOR_RESET}
	${COLOR_COMMAND_NAME}${COMMAND}${COLOR_RESET} <${COLOR_OPTION}new-version${COLOR_RESET}>

${COLOR_SECTION}DESCRIPTION${COLOR_RESET}
	This command:
	- creates a new branch for release
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

function check_current_branch() {
	local CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`
	if [ ${CURRENT_BRANCH} = ${BASE_BRANCH} ]; then
		return
	fi

	echo -e "${COLOR_ERROR}ERROR:${COLOR_RESET} Work on ${COLOR_BRANCH}${BASE_BRANCH}${COLOR_RESET} branch
	${COLOR_COMMAND}git checkout ${BASE_BRANCH}${COLOR_RESET}
" >&2
	exit 2
}

function create_branch() {
	local BRANCH=$1

	git checkout -b ${BRANCH} ${BASE_BRANCH}
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

	# update package.json
	npm version --no-git-tag-version ${VERSION}
}

function build_package() {
	npm run build
	npm run verify
}

function commit_changes() {
	local VERSION=$1

	git add .
	git commit -m "version ${VERSION}"
}

function finish() {
	local VERSION=$1
	local BRANCH=$2
	local TAG=$3
	local TARGET_BRANCH="v${VERSION%%[!0-9]*}"
	local UPSTREAM="origin"
	local CHANGELOG=$(git diff ${UPSTREAM}/${TARGET_BRANCH} ${BRANCH} CHANGELOG.md | sed -e "/^[^+]/d" -e "s/^\+\(.*\)$/\1/" -e "/^## /d" -e "/^\+/d" -e "/^\[/d" -e "s/\s/%20/g" -e "s/#/%23/g" -e 's/\n//g' | perl -pe "s/\n/%0A/g" | perl -pe "s/^(%0A)+//" | perl -pe "s/(%0A)+$//")

	echo -e "
Branch ${COLOR_BRANCH}${BRANCH}${COLOR_RESET} has been created.
Remaining processes are...

1. Make sure all changes are correct
	${COLOR_COMMAND}git diff ${BASE_BRANCH} ${BRANCH}${COLOR_RESET}
2. Push to remote ${UPSTREAM}
	${COLOR_COMMAND}git push --set-upstream ${UPSTREAM} ${BRANCH}${COLOR_RESET}
3. Create a pull-request: ${COLOR_BRANCH}${BRANCH}${COLOR_RESET} to ${COLOR_BRANCH}${BASE_BRANCH}${COLOR_RESET}
	${URL_COMPARE}/${BASE_BRANCH}...${BRANCH}?expand=1
	select ${COLOR_SELECT}Squash and merge${COLOR_RESET}
4. Create a pull-request: ${COLOR_BRANCH}${BASE_BRANCH}${COLOR_RESET} to ${COLOR_BRANCH}${TARGET_BRANCH}${COLOR_RESET}
	${URL_COMPARE}/${TARGET_BRANCH}...${BASE_BRANCH}?expand=1&title=version%20${VERSION}&body=${CHANGELOG}
	select ${COLOR_SELECT}Create a merge commit${COLOR_RESET}
5. Create a new release
	${URL_RELEASE}?tag=${TAG}&target=${TARGET_BRANCH}&title=${PACKAGE_NAME}%20${VERSION}%20released&body=${CHANGELOG}
	Tag version: ${COLOR_INPUT}${TAG}${COLOR_RESET}
	Target: ${COLOR_INPUT}${TARGET_BRANCH}${COLOR_RESET}
	Release title: ${COLOR_INPUT}${PACKAGE_NAME} ${VERSION} released${COLOR_RESET}
	Description this release: (copy and paste CHANGELOG.md)
6. Post processing
	${COLOR_COMMAND}git checkout ${BASE_BRANCH}${COLOR_RESET}
	${COLOR_COMMAND}git pull${COLOR_RESET}
	${COLOR_COMMAND}git fetch -p${COLOR_RESET}
	${COLOR_COMMAND}git branch -D ${BRANCH}${COLOR_RESET}

That's all!
"
}

main "$@"
