# cosmiconfig

[![Build Status](https://img.shields.io/travis/davidtheclark/cosmiconfig/master.svg?label=unix%20build)](https://travis-ci.org/davidtheclark/cosmiconfig) [![Build status](https://img.shields.io/appveyor/ci/davidtheclark/cosmiconfig/master.svg?label=windows%20build)](https://ci.appveyor.com/project/davidtheclark/cosmiconfig/branch/master)

Find and load a configuration object from
- a `package.json` property (anywhere up the directory tree)
- a JSON or YAML "rc file" (anywhere up the directory tree)
- a `.config.js` CommonJS module (anywhere up the directory tree)

For example, if your module's name is "soursocks," cosmiconfig will search out configuration in the following places:
- a `soursocks` property in `package.json` (anywhere up the directory tree)
- a `.soursocksrc` file in JSON or YAML format (anywhere up the directory tree)
- a `soursocks.config.js` file exporting a JS object (anywhere up the directory tree)

cosmiconfig continues to search in these places all the way up the directory tree until it finds acceptable configuration (or hits the home directory).

Additionally, all of these search locations are configurable: you can customize filenames or turn off any location.

You can also look for rc files with extensions, e.g. `.soursocksrc.json` or `.soursocksrc.yaml`.
You may like extensions on your rc files because you'll get syntax highlighting and linting in text editors.

## Installation

```
npm install cosmiconfig
```

Tested in Node 4+.

## Usage

```js
var cosmiconfig = require('cosmiconfig');

var explorer = cosmiconfig(yourModuleName[, options]);

explorer.load()
  .then((result) => {
    // result.config is the parsed configuration object
    // result.filepath is the path to the config file that was found
  })
  .catch((parsingError) => {
    // do something constructive
  });
```

The function `cosmiconfig()` searches for a configuration object and returns a Promise,
which resolves with an object containing the information you're looking for.

You can also pass option `sync: true` to load the config synchronously, returning the config itself.

So let's say `var yourModuleName = 'goldengrahams'` — here's how cosmiconfig will work:

- Starting from `process.cwd()` (or some other directory defined by the `searchPath` argument to `load()`), it looks for configuration objects in three places, in this order:
  1. A `goldengrahams` property in a `package.json` file (or some other property defined by `options.packageProp`);
  2. A `.goldengrahamsrc` file with JSON or YAML syntax (or some other filename defined by `options.rc`);
  3. A `goldengrahams.config.js` JS file exporting the object (or some other filename defined by `options.js`).
- If none of those searches reveal a configuration object, it moves up one directory level and tries again. So the search continues in `./`, `../`, `../../`, `../../../`, etc., checking those three locations in each directory.
- It continues searching until it arrives at your home directory (or some other directory defined by `options.stopDir`).
- If at any point a parseable configuration is found, the `cosmiconfig()` Promise resolves with its result object.
- If no configuration object is found, the `cosmiconfig()` Promise resolves with `null`.
- If a configuration object is found *but is malformed* (causing a parsing error), the `cosmiconfig()` Promise rejects and shares that error (so you should `.catch()` it).

All this searching can be short-circuited by passing `options.configPath` to specify a file.
cosmiconfig will read that file and try parsing it as JSON, YAML, or JS.

## Caching

As of v2, cosmiconfig uses a few caches to reduce the need for repetitious reading of the filesystem. Every new cosmiconfig instance (created with `cosmiconfig()`) has its own caches.

To avoid or work around caching, you can
- create separate instances of cosmiconfig, or
- set `cache: false` in your options.
- use the cache clearing methods documented below.

## API

### `var explorer = cosmiconfig(moduleName[, options])`

Creates a cosmiconfig instance (i.e. explorer) configured according to the arguments, and initializes its caches.

#### moduleName

Type: `string`

You module name. This is used to create the default filenames that cosmiconfig will look for.

#### Options

##### packageProp

Type: `string` or `false`
Default: `'[moduleName]'`

Name of the property in `package.json` to look for.

If `false`, cosmiconfig will not look in `package.json` files.

##### rc

Type: `string` or `false`
Default: `'.[moduleName]rc'`

Name of the "rc file" to look for, which can be formatted as JSON or YAML.

If `false`, cosmiconfig will not look for an rc file.

If `rcExtensions: true`, the rc file can also have extensions that specify the syntax, e.g. `.[moduleName]rc.json`.
You may like extensions on your rc files because you'll get syntax highlighting and linting in text editors.
Also, with `rcExtensions: true`, you can use JS modules as rc files, e.g. `.[moduleName]rc.js`.

##### js

Type: `string` or `false`
Default: `'[moduleName].config.js'`

Name of a JS file to look for, which must export the configuration object.

If `false`, cosmiconfig will not look for a JS file.

##### rcStrictJson

Type: `boolean`
Default: `false`

If `true`, cosmiconfig will expect rc files to be strict JSON. No YAML permitted, and no sloppy JSON.

By default, rc files are parsed with [js-yaml](https://github.com/nodeca/js-yaml), which is
more permissive with punctuation than standard strict JSON.

##### rcExtensions

Type: `boolean`
Default: `false`

If `true`, cosmiconfig will look for rc files with extensions, in addition to rc files without.

This adds a few steps to the search process.
Instead of *just* looking for `.goldengrahamsrc` (no extension), it will also look for the following, in this order:

- `.goldengrahamsrc.json`
- `.goldengrahamsrc.yaml`
- `.goldengrahamsrc.yml`
- `.goldengrahamsrc.js`

##### stopDir

Type: `string`
Default: Absolute path to your home directory

Directory where the search will stop.

##### cache

Type: `boolean`
Default: `true`

If `false`, no caches will be used.

##### sync

Type: `boolean`
Default: `false`

If `true`, config will be loaded synchronously.

##### transform

Type: `Function`

A function that transforms the parsed configuration. Receives the result object with `config` and `filepath` properties.

If the option `sync` is `false` (default), the function must return a Promise that resolves with the transformed result.
If the option `sync` is `true`, though, `transform` should be a synchronous function which returns the transformed result.

The reason you might use this option instead of simply applying your transform function some other way is that *the transformed result will be cached*. If your transformation involves additional filesystem I/O or other potentially slow processing, you can use this option to avoid repeating those steps every time a given configuration is loaded.

##### configPath

Type: `string`

If provided, cosmiconfig will load and parse a config from this path, and will not perform its usual search.

##### format

Type: `'json' | 'yaml' | 'js'`

The expected file format for the config loaded from `configPath`.

If not specified, cosmiconfig will try to infer the format using the extension name (if it has one).
In the event that the file does not have an extension or the extension is unrecognized, cosmiconfig will try to parse it as a JSON, YAML, or JS file.

### Instance methods (on `explorer`)

#### `load([searchPath, configPath])`

Find and load a configuration file. Returns a Promise that resolves with `null`, if nothing is found, or an object with two properties:
- `config`: The loaded and parsed configuration.
- `filepath`: The filepath where this configuration was found.

You should provide *either* `searchPath` *or* `configPath`. Use `configPath` if you know the path of the configuration file you want to load. Note that `configPath` takes priority over `searchPath` if both parameters are specified.

```js
explorer.load()

explorer.load('start/search/here');
explorer.load('start/search/at/this/file.css');

explorer.load(null, 'load/this/file.json');
```

If you provide `searchPath`, cosmiconfig will start its search at `searchPath` and continue to search up the directory tree, as documented above.
By default, `searchPath` is set to `process.cwd()`.

If you provide `configPath` (i.e. you already know where the configuration is that you want to load), cosmiconfig will try to read and parse that file. Note that the [`format` option](#format) is applicable for this as well.

#### `clearFileCache()`

Clears the cache used when you provide a `configPath` argument to `load`.

#### `clearDirectoryCache()`

Clears the cache used when you provide a `searchPath` argument to `load`.

#### `clearCaches()`

Performs both `clearFileCache()` and `clearDirectoryCache()`.

## Differences from [rc](https://github.com/dominictarr/rc)

[rc](https://github.com/dominictarr/rc) serves its focused purpose well. cosmiconfig differs in a few key ways — making it more useful for some projects, less useful for others:

- Looks for configuration in some different places: in a `package.json` property, an rc file, a `.config.js` file, and rc files with extensions.
- Built-in support for JSON, YAML, and CommonJS formats.
- Stops at the first configuration found, instead of finding all that can be found up the directory tree and merging them automatically.
- Options.
- Asynchronous by default (though can be run synchronously).

## Contributing & Development

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

And please do participate!
