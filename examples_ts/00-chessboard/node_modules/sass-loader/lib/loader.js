"use strict";

const path = require("path");
const async = require("neo-async");
const formatSassError = require("./formatSassError");
const webpackImporter = require("./webpackImporter");
const normalizeOptions = require("./normalizeOptions");
const pify = require("pify");
const semver = require("semver");

let nodeSassJobQueue = null;

/**
 * The sass-loader makes node-sass available to webpack modules.
 *
 * @this {LoaderContext}
 * @param {string} content
 */
function sassLoader(content) {
    const callback = this.async();
    const isSync = typeof callback !== "function";
    const self = this;
    const resourcePath = this.resourcePath;

    function addNormalizedDependency(file) {
        // node-sass returns POSIX paths
        self.dependency(path.normalize(file));
    }

    if (isSync) {
        throw new Error("Synchronous compilation is not supported anymore. See https://github.com/webpack-contrib/sass-loader/issues/333");
    }

    const options = normalizeOptions(this, content, webpackImporter(
        resourcePath,
        pify(this.resolve.bind(this)),
        addNormalizedDependency
    ));

    // Skip empty files, otherwise it will stop webpack, see issue #21
    if (options.data.trim() === "") {
        callback(null, "");
        return;
    }

    const render = getRenderFuncFromSassImpl(options.implementation || require("node-sass"));

    render(options, (err, result) => {
        if (err) {
            formatSassError(err, this.resourcePath);
            err.file && this.dependency(err.file);
            callback(err);
            return;
        }

        if (result.map && result.map !== "{}") {
            result.map = JSON.parse(result.map);
            // result.map.file is an optional property that provides the output filename.
            // Since we don't know the final filename in the webpack build chain yet, it makes no sense to have it.
            delete result.map.file;
            // The first source is 'stdin' according to node-sass because we've used the data input.
            // Now let's override that value with the correct relative path.
            // Since we specified options.sourceMap = path.join(process.cwd(), "/sass.map"); in normalizeOptions,
            // we know that this path is relative to process.cwd(). This is how node-sass works.
            result.map.sources[0] = path.relative(process.cwd(), resourcePath);
            // node-sass returns POSIX paths, that's why we need to transform them back to native paths.
            // This fixes an error on windows where the source-map module cannot resolve the source maps.
            // @see https://github.com/webpack-contrib/sass-loader/issues/366#issuecomment-279460722
            result.map.sourceRoot = path.normalize(result.map.sourceRoot);
            result.map.sources = result.map.sources.map(path.normalize);
        } else {
            result.map = null;
        }

        result.stats.includedFiles.forEach(addNormalizedDependency);
        callback(null, result.css.toString(), result.map);
    });
}

/**
 * Verifies that the implementation and version of Sass is supported by this loader.
 *
 * @param {Object} module
 * @returns {Function}
 */
function getRenderFuncFromSassImpl(module) {
    const info = module.info;
    const components = info.split("\t");

    if (components.length < 2) {
        throw new Error("Unknown Sass implementation \"" + info + "\".");
    }

    const implementation = components[0];
    const version = components[1];

    if (!semver.valid(version)) {
        throw new Error("Invalid Sass version \"" + version + "\".");
    }

    if (implementation === "dart-sass") {
        if (!semver.satisfies(version, "^1.3.0")) {
            throw new Error("Dart Sass version " + version + " is incompatible with ^1.3.0.");
        }
        return module.render.bind(module);
    } else if (implementation === "node-sass") {
        if (!semver.satisfies(version, "^4.0.0")) {
            throw new Error("Node Sass version " + version + " is incompatible with ^4.0.0.");
        }
        // There is an issue with node-sass when async custom importers are used
        // See https://github.com/sass/node-sass/issues/857#issuecomment-93594360
        // We need to use a job queue to make sure that one thread is always available to the UV lib
        if (nodeSassJobQueue === null) {
            const threadPoolSize = Number(process.env.UV_THREADPOOL_SIZE || 4);

            nodeSassJobQueue = async.queue(module.render.bind(module), threadPoolSize - 1);
        }

        return nodeSassJobQueue.push.bind(nodeSassJobQueue);
    }
    throw new Error("Unknown Sass implementation \"" + implementation + "\".");
}

module.exports = sassLoader;
