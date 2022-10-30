#!/bin/bash
# update dependencies
set -eu

DATE=$(date +"%Y%m%d")
BRANCH=feature/update-dependencies-${DATE}
COLOR_SUCCESS="\e[1;32m"
COLOR_RESET="\e[m"

# create branch
git checkout develop
git checkout -b ${BRANCH}

# check updates
npm ci
npm run check-updates -- -u

# re-install packages
rm -rf package-lock.json node_modules
npm i
npm dedupe

# check
npm run build
npm run verify

# commit
git add package.json package-lock.json lib
git commit -m "update dependencies"

# finished!
echo -e "
${COLOR_SUCCESS}🎉All dependencies are updated successfully.🎉${COLOR_RESET}

Push changes and merge into 'develop' branch.

    git push --set-upstream origin ${BRANCH}
"
