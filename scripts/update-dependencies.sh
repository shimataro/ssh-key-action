#!/bin/bash
# update dependencies

set -e

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

# build check
npm run build

# commit
npm ci --only=production
git add package.json package-lock.json node_modules
git commit -m "update dependencies"

# finished!
echo -e "
${COLOR_SUCCESS}🎉All dependencies are updated successfully.🎉${COLOR_RESET}

Push changes and merge into 'develop' branch.

    git push --set-upstream origin ${BRANCH}
"
