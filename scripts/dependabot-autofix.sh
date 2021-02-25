#!/bin/bash
git diff-index --quiet HEAD
result=$?

set -e
if [ result == 0 ]
then
	echo "no changes detected: $result"  
else
	echo "changes detected: $result"
	git status
	git add yarn.lock .yarn/cache .pnp.*
	git commit -m "Dependabot autofix"
	git push
fi