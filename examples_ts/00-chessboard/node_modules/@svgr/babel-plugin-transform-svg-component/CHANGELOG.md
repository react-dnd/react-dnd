# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.1.0](https://github.com/smooth-code/svgr/compare/v4.0.4...v4.1.0) (2018-11-24)

**Note:** Version bump only for package @svgr/babel-plugin-transform-svg-component





## [4.0.1](https://github.com/smooth-code/svgr/compare/v4.0.0...v4.0.1) (2018-11-08)


### Bug Fixes

* **babel-plugin-transform-svg:** support template that only return a single node ([80ac40f](https://github.com/smooth-code/svgr/commit/80ac40f)), closes [#223](https://github.com/smooth-code/svgr/issues/223)
* **babel-plugin-transform-svg-component:** parsing error of JSX template exports defs ([#225](https://github.com/smooth-code/svgr/issues/225)) ([1e56309](https://github.com/smooth-code/svgr/commit/1e56309)), closes [/github.com/smooth-code/svgr/blob/master/packages/babel-plugin-transform-svg-component/src/util.js#L61](https://github.com//github.com/smooth-code/svgr/blob/master/packages/babel-plugin-transform-svg-component/src/util.js/issues/L61)





# [4.0.0](https://github.com/smooth-code/svgr/compare/v3.1.0...v4.0.0) (2018-11-04)


### Features

* **v4:** new architecture ([ac8b8ca](https://github.com/smooth-code/svgr/commit/ac8b8ca))


### BREAKING CHANGES

* **v4:** - `template` option must now returns a Babel AST
- `@svgr/core` does not include svgo & prettier by default
