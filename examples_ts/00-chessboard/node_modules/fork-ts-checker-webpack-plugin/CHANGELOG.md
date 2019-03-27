## v1.0.0-alpha.6

* [don't directly depend upon typescript](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/208)

## v1.0.0-alpha.5

* [can now provide path where typescript can be found](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/204)

## v1.0.0-alpha.4

* [make node 6 compatible](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/202)

## v1.0.0-alpha.3

* [replace peerDeps with runtime checks](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/201)

## v1.0.0-alpha.2

* [Add `useTypescriptIncrementalApi`](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/198) (#196)

## v1.0.0-alpha.1

* [Use object-spread instead of `Object.assign`](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/194) (#194)

## v1.0.0-alpha.0

* [Add support for webpack 5](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/166)

### Breaking Changes

Version `1.x` additionally supports webpack 5 alongside webpack 4, whose hooks are now tapped differently:

```diff
-  compiler.hooks.forkTsCheckerDone.tap(...args)
+  const forkTsCheckerHooks = ForkTsCheckerWebpackPlugin.getCompilerHooks(compiler)
+  forkTsCheckerHooks.done.tap(...args)  
```

v1.0.0-alpha.0 drops support for node 6.

## v0.5.2

* [Fix erroneous error on diagnostics at 0 line; remove deprecated fs.existsSync](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/190) (#190)

## v0.5.1

* [Make the checker compile with TypeScript 3.2](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/189)

## 0.5.0

 * Removed unused dependency `resolve`.
 * Replace `lodash` usage with native calls.
 * ** Breaking Changes**:
   * Removed all getters from `NormalizedMessage`, use direct property access instead.
 * **Internal**:
   * Test against ts-loader v5
   * Enable all strict type checks
   * Update dev dependencies

## v0.4.15

* [Add `tslintAutoFix` option to be passed on to tslint to auto format typescript files](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/174) (#174)

## v0.4.14

* [Add support for `reportFiles` option](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/179) (#179)

## v0.4.13

* [Merge in `compilerOptions` prior to calling `parseJsonConfigFileContent`](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/176) (#176)

## v0.4.12

* [Add `compilerOptions` option](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/173) (#173)

## v0.4.11

* [Fix os.cpus is not a function](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/172) (#172)

## v0.4.10

* [Allow fork-ts-checker-webpack-plugin to be imported in .ts files using ESM import syntax](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/163) (#163)

## v0.4.9

* [Set "compilationDone" before resolving "forkTsCheckerServiceBeforeStart"](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/146) (#146)

## v0.4.8

* [Fix(types collision): update webpack](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/151) (#142)

## v0.4.7

 * [Fix(types collision): update chalk and chokidar](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/147) (#142)
 * [Fix(logger): Don't limit Options.logger to Console type](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/143)

## v0.4.6

 * [Fix(types): Make options Partial<Options>](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/141) (#140)

## v0.4.5

 * [Fix(types): Add types to the plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/139) (#137)
 * [Fix(vue): Avoid false positive of no-consecutive-blank-lines TSLint rule in Vue file](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/138) (#130)

## v0.4.4

 * [Fix(vue): resolve src attribute on the script block on Vue files](https://github.com/Realytics/fork-ts-checker-webpack-plugin/pull/130) (#111, #85)
 * Add TypeScript ^3.0.0 to peerDependencies

## v0.4.3
 * Fix "File system lag can cause Invalid source file errors to slip through" (#127)

## v0.4.2
 * Format messages when `async` is false

## v0.4.1
 * Fix webpack 4 hooks bug

## v0.4.0
 * Support webpack 4

## v0.3.0
 * Add `vue` support

## v0.2.10
 * Fix #80 "Cannot read property 'getLineAndCharacterOfPosition' of undefined"
 * Fix #76 "TypeError: Cannot read property '0' of undefined"

## v0.2.9
 * Make errors formatting closer to `ts-loader` style
 * Handle tslint exclude option

## v0.2.8
 * Add `checkSyntacticErrors` option
 * Fix `process.env` pass to the child process
 * Add `fork-ts-checker-service-before-start` hook

## v0.2.7
 * Fix service is not killed when webpack watch is done

## v0.2.6
 * Add diagnostics/lints formatters - `formatter` and `formatterOptions` option

## v0.2.5
 * Add `async` option - more information in `README.md`

## v0.2.4
 * Fix `ESLint: "fork-ts-checker-webpack-plugin" is not published.` issue

## v0.2.3
 * Add support for webpack 3 as peerDependency

## v0.2.2
 * Force `isolatedModule: false` in checker compiler for better performance

## v0.2.1
 * Fix for `tslint: true` option issue

## v0.2.0
 * tsconfig.json and tslint.json path are not printed anymore.
 * `watch` option is not used on 'build' mode
 * Handle case with no options object (`new ForkTsCheckerWebpacPlugin()`)
 * Basic integration tests (along  units)
 * **Breaking changes**:
   * tslint is not enabled by default - you have to set `tslint: true` or `tslint: './path/to/tslint.json'` to enable it.
   * `blockEmit` option is removed - it choose automatically - blocks always on 'build' mode, never on 'watch' mode.

## v0.1.5
 * Disable tslint if module is not installed and no tslint path is passed
 * Improve README.md

## v0.1.4
 * Fix send to closed channel case
 * Fix removed files case
 * Add `fork-ts-checker-service-start-error` hook

## v0.1.3
 * Fix "Cannot read property 'mtime' of undefined on OSX"

## v0.1.2
 * Workers mode works correctly (fixed typo)

## v0.1.1
 * Support memory limit in multi-process mode
 * Handle already closed channel case on sending ipc message

## v0.1.0
 * Initial release - not production ready.
