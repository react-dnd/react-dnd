# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.3](https://github.com/smooth-code/svgr/compare/v4.0.2...v4.0.3) (2018-11-13)


### Bug Fixes

* upgrade dependencies ([7e2195f](https://github.com/smooth-code/svgr/commit/7e2195f))





# [4.0.0](https://github.com/smooth-code/svgr/compare/v3.1.0...v4.0.0) (2018-11-04)


### Features

* **svgo:** prefix ids by default ([06c338d](https://github.com/smooth-code/svgr/commit/06c338d)), closes [#210](https://github.com/smooth-code/svgr/issues/210)
* **v4:** new architecture ([ac8b8ca](https://github.com/smooth-code/svgr/commit/ac8b8ca))


### BREAKING CHANGES

* **v4:** - `template` option must now returns a Babel AST
- `@svgr/core` does not include svgo & prettier by default
