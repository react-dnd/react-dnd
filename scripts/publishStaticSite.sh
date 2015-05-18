#!/bin/bash
set -e

PROJECT_DIRECTORY="react-dnd"
SITE_DIRECTORY="$PROJECT_DIRECTORY-site"
GITHUB_REPO="git@github.com:gaearon/react-dnd.git"
GH_PAGES_SITE="http://gaearon.github.io/react-dnd/"

# Move to parent dir
cd ../

# Setup repo if doesnt exist
if [ ! -d "$SITE_DIRECTORY" ]; then
  read -p "No site repo setup, can I create it at \"$PWD/$SITE_DIRECTORY\"? [Y/n] " -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]] && [[ ! $REPLY == "" ]]
  then
    echo "Exit by user"
    exit 1
  fi
  git clone "$GITHUB_REPO" "$SITE_DIRECTORY"
  cd "$SITE_DIRECTORY"
  git checkout origin/gh-pages
  git checkout -b gh-pages
  git push --set-upstream origin gh-pages
  cd ../
fi

cd "$PROJECT_DIRECTORY"
npm run build-site
open __site__/index.html
cd ../

echo
echo
read -p "Are you ready to publish? [Y/n] " -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]] && [[ ! $REPLY == "" ]]
then
  echo "Exit by user"
  exit 1
fi

cd "$SITE_DIRECTORY"
git reset --hard
git checkout -- .
git clean -dfx
git fetch
git rebase
rm -Rf *
echo "$PWD"
cp -R ../$PROJECT_DIRECTORY/__site__/* .
git add --all
git commit -m "Update website"
git push
sleep 1
open $GH_PAGES_SITE
