#!/bin/bash
# update dependencies
set -eu

DATE=$(date +"%Y%m%d")
BASE_BRANCH=$(git rev-parse --abbrev-ref HEAD)
TARGET_BRANCH=feature/update-dependencies-${DATE}

COLOR_SUCCESS="\033[1;32m"
COLOR_ERROR="\033[1;41m"
COLOR_RESET="\033[m"

cd $(dirname ${0})/..

# create target branch
if [[ ! ${BASE_BRANCH} =~ ^v[0-9]+$ ]]; then
	echo -e "${COLOR_ERROR}Error:${COLOR_RESET} Base branch must match 'v*'; got '${BASE_BRANCH}'."
	exit 1
fi
git checkout -b ${TARGET_BRANCH}

# check updates
npm ci
npm run check-updates -- -u

# re-install packages
rm -rf package-lock.json node_modules
npm i
npm dedupe

# test
npm run build
npm run verify

# commit
git add package.json package-lock.json dist
git commit -m "update dependencies"

# finished!
echo -e "
${COLOR_SUCCESS}🎉All dependencies are updated successfully.🎉${COLOR_RESET}

Push changes and merge into '${BASE_BRANCH}' branch.

    git push --set-upstream origin ${TARGET_BRANCH}
"
