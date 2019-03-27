# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.1.0](https://github.com/smooth-code/svgr/compare/v4.0.4...v4.1.0) (2018-11-24)

**Note:** Version bump only for package @svgr/hast-util-to-babel-ast





## [4.0.3](https://github.com/smooth-code/svgr/compare/v4.0.2...v4.0.3) (2018-11-13)


### Bug Fixes

* upgrade dependencies ([7e2195f](https://github.com/smooth-code/svgr/commit/7e2195f))





## [4.0.2](https://github.com/smooth-code/svgr/compare/v4.0.1...v4.0.2) (2018-11-08)


### Bug Fixes

* **hast-util-to-babel-ast:** replace tabs by spaces in attributes ([b0f3d19](https://github.com/smooth-code/svgr/commit/b0f3d19)), closes [#219](https://github.com/smooth-code/svgr/issues/219)





## [4.0.1](https://github.com/smooth-code/svgr/compare/v4.0.0...v4.0.1) (2018-11-08)


### Bug Fixes

* **hast-util-to-babel-ast:** correctly transforms data & aria attributes ([99711c4](https://github.com/smooth-code/svgr/commit/99711c4)), closes [#221](https://github.com/smooth-code/svgr/issues/221)
* **hast-util-to-babel-ast:** replace line-breaks in attributes ([00a2625](https://github.com/smooth-code/svgr/commit/00a2625)), closes [#219](https://github.com/smooth-code/svgr/issues/219)





# [4.0.0](https://github.com/smooth-code/svgr/compare/v3.1.0...v4.0.0) (2018-11-04)


### Features

* **v4:** new architecture ([ac8b8ca](https://github.com/smooth-code/svgr/commit/ac8b8ca))


### BREAKING CHANGES

* **v4:** - `template` option must now returns a Babel AST
- `@svgr/core` does not include svgo & prettier by default
