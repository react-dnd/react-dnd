#!/bin/bash
set -e
if [[ `git status --porcelain --untracked-files=no` ]]; then
	echo "changes detected"
	git add yarn.lock .yarn/cache .pnp.*
	git commit -m "Dependabot autofix"
	git push
else
	echo "no changes detected"  
fi