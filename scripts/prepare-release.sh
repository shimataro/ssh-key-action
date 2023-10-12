#!/bin/bash
# requires following programs:
# - git; I believe you have already installed.
# - sed; Both GNU sed and POSIX sed will work.
set -eu

GITHUB_BASE="https://github.com"
GITHUB_USER="shimataro"
GITHUB_REPO="ssh-key-action"

UPSTREAM="origin"

COLOR_ERROR="\033[1;41m"
COLOR_SECTION="\033[1;34m"
COLOR_COMMAND_NAME="\033[1;34m"
COLOR_OPTION="\033[4;36m"
COLOR_COMMAND="\033[4m"
COLOR_FILE="\033[1;34m"
COLOR_BRANCH="\033[1;31m"
COLOR_INPUT="\033[1;31m"
COLOR_SELECT="\033[1;32m"
COLOR_RESET="\033[m"

URL_PRODUCT="${GITHUB_BASE}/${GITHUB_USER}/${GITHUB_REPO}"
URL_REPOSITORY="${URL_PRODUCT}.git"
URL_COMPARE="${URL_PRODUCT}/compare"
URL_RELEASE="${URL_PRODUCT}/releases/new"

function main() {
	cd $(dirname ${0})/..

	if [[ $# -lt 1 ]]; then
		usage
	fi

	local NEW_VERSION=$1
	local CURRENT_VERSION=$(
		node -e 'console.log(JSON.parse(require("fs").readFileSync("package.json")).version)'
	)
	local TAG="v${NEW_VERSION}"
	local BRANCH="release/v${NEW_VERSION}"
	local BASE_BRANCH="${TAG%%.*}"

	check_version_format ${NEW_VERSION}
	check_current_branch ${BASE_BRANCH}

	create_branch ${BRANCH} ${BASE_BRANCH}
	update_package_version ${NEW_VERSION}
	update_changelog ${NEW_VERSION}
	verify_package
	commit_changes ${NEW_VERSION}
	finish ${NEW_VERSION} ${CURRENT_VERSION} ${BRANCH} ${BASE_BRANCH} ${TAG}
}

function usage() {
	local COMMAND=$(basename ${0})

	echo -e "${COLOR_SECTION}NAME${COLOR_RESET}
	${COMMAND} - Prepare for new release

${COLOR_SECTION}SYNOPSIS${COLOR_RESET}
	${COLOR_COMMAND_NAME}${COMMAND}${COLOR_RESET} <${COLOR_OPTION}new-version${COLOR_RESET}>

${COLOR_SECTION}DESCRIPTION${COLOR_RESET}
	This command will...
	- create a new branch for release
	- update ${COLOR_FILE}CHANGELOG.md${COLOR_RESET}
	- update package version in ${COLOR_FILE}package.json${COLOR_RESET}
	- update dependencies version in ${COLOR_FILE}package.json${COLOR_RESET}
	- verify
	- ...and commit!

	${COLOR_OPTION}new-version${COLOR_RESET} must follow \"Semantic Versioning\" <https://semver.org/>.
"
	exit 1
}

function check_version_format() {
	if [[ ${1} =~ ^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*) ]]; then
		return
	fi

	echo -e "${COLOR_ERROR}ERROR:${COLOR_RESET} Follow \"Semantic Versioning\" <https://semver.org/> for new version.
" >&2
	exit 2
}

function check_current_branch() {
	local BASE_BRANCH=$1
	local CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
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
	local BASE_BRANCH=$2

	git checkout -b ${BRANCH} ${BASE_BRANCH}
}

function update_package_version() {
	local VERSION=$1

	npm version --no-git-tag-version ${VERSION}
}

function update_changelog() {
	local VERSION=$1
	local DATE=`date "+%Y-%m-%d"`
	local KEYWORD="Unreleased"

	sed -i".bak" -r \
		-e "s/^((##[[:space:]]+)\[${KEYWORD}\])$/\1\n\n\2[${VERSION}] - ${DATE}/" \
		-e "s/^(\[${KEYWORD}\](.*))(v.*)\.\.\.HEAD$/\1v${VERSION}...HEAD\n[${VERSION}]\2\3...v${VERSION}/" \
		CHANGELOG.md
}

function verify_package() {
	npm run verify
}

function commit_changes() {
	local VERSION=$1

	git add CHANGELOG.md package.json package-lock.json
	git commit -m "version ${VERSION}"
}

function finish() {
	local NEW_VERSION="${1}"
	local CURRENT_VERSION="${2}"
	local BRANCH="${3}"
	local BASE_BRANCH="${4}"
	local TAG="${5}"

	local TITLE="${GITHUB_REPO} ${NEW_VERSION} released"
	local CHANGELOG=$(
		git diff v${CURRENT_VERSION} -- CHANGELOG.md |
		sed -r -e '/^[^+]/d' -e 's/^\+(.*)$/\1/' -e '/^## /d' -e '/^\+/d' -e '/^\[/d' |
		urlencode |
		replace_lf
	)
	local PRERELEASE=0
	if [[ ${NEW_VERSION} == "0."* ]]; then
		# < 1.0.0
		PRERELEASE=1
	fi
	if [[ ${NEW_VERSION} =~ -[0-9a-zA-Z] ]]; then
		# -alpha, -pre, -rc, etc...
		PRERELEASE=1
	fi

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
4. Create a new release
	${URL_RELEASE}?tag=${TAG}&target=${BASE_BRANCH}&title=$(urlencode <<<"${TITLE}")&body=${CHANGELOG}&prerelease=${PRERELEASE}
	Tag version: ${COLOR_INPUT}${TAG}${COLOR_RESET}
	Target: ${COLOR_INPUT}${BASE_BRANCH}${COLOR_RESET}
	Release title: ${COLOR_INPUT}${TITLE}${COLOR_RESET}
	Description this release: (copy and paste CHANGELOG.md)
5. Post processing
	${COLOR_COMMAND}git checkout ${BASE_BRANCH}${COLOR_RESET}
	${COLOR_COMMAND}git pull${COLOR_RESET}
	${COLOR_COMMAND}git fetch -p${COLOR_RESET}
	${COLOR_COMMAND}git branch -D ${BRANCH}${COLOR_RESET}

That's all!
"
}

function urlencode() {
	# https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding
	sed -r \
		-e 's/%/%25/g' \
		-e 's/\$/%24/g' -e 's/\(/%28/g' -e 's/\)/%29/g' -e 's/\*/%2A/g' -e 's/\+/%2B/g' -e 's/\//%2F/g' -e 's/\?/%3F/g' -e 's/\[/%5B/g' -e 's/\]/%5D/g' \
		-e 's/!/%21/g' -e 's/#/%23/g' -e 's/&/%26/g' -e "s/'/%27/g" -e 's/,/%2C/g' -e 's/:/%3A/g' -e 's/;/%3B/g' -e 's/=/%3D/g' -e 's/@/%40/g' \
		-e 's/ /+/g'
}

function replace_lf() {
	sed -r \
		-e ':a' -e 'N' -e '$!ba' \
		-e 's/^\n+//' -e 's/\n+$//' -e 's/\n/%0A/g'
}

main "$@"
