# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.1.0](https://github.com/smooth-code/svgr/compare/v4.0.4...v4.1.0) (2018-11-24)

**Note:** Version bump only for package @svgr/core





## [4.0.3](https://github.com/smooth-code/svgr/compare/v4.0.2...v4.0.3) (2018-11-13)


### Bug Fixes

* upgrade dependencies ([7e2195f](https://github.com/smooth-code/svgr/commit/7e2195f))





## [4.0.2](https://github.com/smooth-code/svgr/compare/v4.0.1...v4.0.2) (2018-11-08)

**Note:** Version bump only for package @svgr/core





## [4.0.1](https://github.com/smooth-code/svgr/compare/v4.0.0...v4.0.1) (2018-11-08)

**Note:** Version bump only for package @svgr/core





# [4.0.0](https://github.com/smooth-code/svgr/compare/v3.1.0...v4.0.0) (2018-11-04)


### Features

* **svgo:** prefix ids by default ([06c338d](https://github.com/smooth-code/svgr/commit/06c338d)), closes [#210](https://github.com/smooth-code/svgr/issues/210)
* **v4:** new architecture ([ac8b8ca](https://github.com/smooth-code/svgr/commit/ac8b8ca))
* allow dynamic properties in replaceAttrValues option ([15f55fe](https://github.com/smooth-code/svgr/commit/15f55fe)), closes [#205](https://github.com/smooth-code/svgr/issues/205)


### BREAKING CHANGES

* **v4:** - `template` option must now returns a Babel AST
- `@svgr/core` does not include svgo & prettier by default





# [3.1.0](https://github.com/smooth-code/svgr/compare/v3.0.0...v3.1.0) (2018-10-05)


### Bug Fixes

* style & custom SVG properties ([#203](https://github.com/smooth-code/svgr/issues/203)) ([f8b2212](https://github.com/smooth-code/svgr/commit/f8b2212)), closes [#199](https://github.com/smooth-code/svgr/issues/199) [#201](https://github.com/smooth-code/svgr/issues/201)


### Features

* allow Mask & Image on React Native ([#202](https://github.com/smooth-code/svgr/issues/202)) ([0256bc0](https://github.com/smooth-code/svgr/commit/0256bc0))





<a name="3.0.0"></a>
# [3.0.0](https://github.com/smooth-code/svgr/compare/v2.4.1...v3.0.0) (2018-10-01)


### Bug Fixes

* fix --icon + --no-dimensions ([7535693](https://github.com/smooth-code/svgr/commit/7535693)), closes [#141](https://github.com/smooth-code/svgr/issues/141)
* fix expandProps when position is not allowed ([45522fc](https://github.com/smooth-code/svgr/commit/45522fc))


### Features

* **config:** improve runtime config ([e52cdce](https://github.com/smooth-code/svgr/commit/e52cdce)), closes [#192](https://github.com/smooth-code/svgr/issues/192)
* **template:** expose `getProps` util for template ([5cb238e](https://github.com/smooth-code/svgr/commit/5cb238e)), closes [#187](https://github.com/smooth-code/svgr/issues/187)
* add synchronous API ([169eb2f](https://github.com/smooth-code/svgr/commit/169eb2f)), closes [#185](https://github.com/smooth-code/svgr/issues/185)
* always prefix component name with "Svg" ([f71aa7a](https://github.com/smooth-code/svgr/commit/f71aa7a)), closes [#190](https://github.com/smooth-code/svgr/issues/190)
* do not remove style tag ([a4ce09a](https://github.com/smooth-code/svgr/commit/a4ce09a)), closes [#191](https://github.com/smooth-code/svgr/issues/191)
* new "expandProps" option ([bb95828](https://github.com/smooth-code/svgr/commit/bb95828)), closes [#170](https://github.com/smooth-code/svgr/issues/170)
* remove "svgAttributes" option ([4e46a5d](https://github.com/smooth-code/svgr/commit/4e46a5d)), closes [#173](https://github.com/smooth-code/svgr/issues/173)
* use forwardRef on React Native ([4bdd989](https://github.com/smooth-code/svgr/commit/4bdd989)), closes [#184](https://github.com/smooth-code/svgr/issues/184)
* use React.forwardRef ([cbee51c](https://github.com/smooth-code/svgr/commit/cbee51c)), closes [#184](https://github.com/smooth-code/svgr/issues/184)


### BREAKING CHANGES

* "--no-expand-props" is now replaced by "--expand-props none". You can now specify a position "start" or "end" for "expandProps"
property.
* `svgAttributes` has been removed, please use `svgProps` instead.
* "ref" option now uses `React.forwardRef`. You don't have to use "svgRef"
prop, just use "ref" and it will work. `React.forwardRef` requires React
> 16.3.
* Style tag will no longer be automatically removed. SVGO should handle it
correctly using "inlineStyles" plugin. If you want to remove them,
enable "removeStyleElement" plugin in your SVGO config.
* **config:** - Runtime configuration is always loaded (even with Node API `convert`)
- In CLI, "--config" is now "--config-file"; this new option can be used
everywhere





<a name="2.4.1"></a>
## [2.4.1](https://github.com/smooth-code/svgr/compare/v2.4.0...v2.4.1) (2018-09-16)


### Bug Fixes

* **config:** fix custom config & default options ([#176](https://github.com/smooth-code/svgr/issues/176)) ([9a6c40b](https://github.com/smooth-code/svgr/commit/9a6c40b))





<a name="2.4.0"></a>
# [2.4.0](https://github.com/smooth-code/svgr/compare/v2.3.0...v2.4.0) (2018-09-16)


### Bug Fixes

* use literal instead of litteral ([7849fd4](https://github.com/smooth-code/svgr/commit/7849fd4))


### Features

* allow to spread props at the start ([#166](https://github.com/smooth-code/svgr/issues/166)) ([cd659dc](https://github.com/smooth-code/svgr/commit/cd659dc))
* **upgrade:** h2x@1.1.0 (jsdom@12.0.0) & others ([2d9b7bd](https://github.com/smooth-code/svgr/commit/2d9b7bd))
* new option "svgProps" ([#172](https://github.com/smooth-code/svgr/issues/172)) ([9657110](https://github.com/smooth-code/svgr/commit/9657110))





<a name="2.2.0"></a>
# [2.2.0](https://github.com/smooth-code/svgr/compare/v2.1.1...v2.2.0) (2018-08-13)


### Bug Fixes

* remove null-byte characters ([#154](https://github.com/smooth-code/svgr/issues/154)) ([de7f8a7](https://github.com/smooth-code/svgr/commit/de7f8a7)), closes [#153](https://github.com/smooth-code/svgr/issues/153)


### Features

* **core:** pass info to SVGO ([2b2353b](https://github.com/smooth-code/svgr/commit/2b2353b)), closes [#152](https://github.com/smooth-code/svgr/issues/152)





<a name="2.1.1"></a>
## [2.1.1](https://github.com/smooth-code/svgr/compare/v2.1.0...v2.1.1) (2018-07-11)


### Bug Fixes

* **core:** config conflict with icon option ([#137](https://github.com/smooth-code/svgr/issues/137)) ([e13a99a](https://github.com/smooth-code/svgr/commit/e13a99a))




<a name="2.1.0"></a>
# [2.1.0](https://github.com/smooth-code/svgr/compare/v2.0.0...v2.1.0) (2018-07-08)


### Features

* add .editorconfig support ([#129](https://github.com/smooth-code/svgr/issues/129)) ([968fd82](https://github.com/smooth-code/svgr/commit/968fd82))
* **cli:** support custom filename cases ([#136](https://github.com/smooth-code/svgr/issues/136)) ([4922f7a](https://github.com/smooth-code/svgr/commit/4922f7a)), closes [#118](https://github.com/smooth-code/svgr/issues/118)
