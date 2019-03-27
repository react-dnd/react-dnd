'use strict'

const resolve = require('path').resolve

const config = require('cosmiconfig')

const loadOptions = require('./options.js')
const loadPlugins = require('./plugins.js')

/**
 * Load Config
 *
 * @method rc
 *
 * @param  {Object} ctx Config Context
 * @param  {String} path Config Path
 * @param  {Object} options Config Options
 *
 * @return {Promise} config PostCSS Config
 */
const rc = (ctx, path, options) => {
  /**
   * @type {Object}
   *
   * @prop {String} cwd=process.cwd() Config search start location
   * @prop {String} env=process.env.NODE_ENV Config Enviroment, will be set to `development` by `postcss-load-config` if `process.env.NODE_ENV` is `undefined`
   */
  ctx = Object.assign({
    cwd: process.cwd(),
    env: process.env.NODE_ENV
  }, ctx)
  /**
   * @type {String} `process.cwd()`
   *
   */
  path = path ? resolve(path) : process.cwd()

  /**
   * @type {Object}
   *
   * @prop {Boolean} rcExtensions=true
   */
  options = Object.assign({
    rcExtensions: true
  }, options)

  if (!ctx.env) {
    process.env.NODE_ENV = 'development'
  }

  return config('postcss', options)
    .load(path)
    .then((result) => {
      if (!result) {
        throw new Error(`No PostCSS Config found in: ${path}`)
      }

      let file = result.filepath || ''
      let config = result.config || {}

      if (typeof config === 'function') {
        config = config(ctx)
      } else {
        config = Object.assign({}, config, ctx)
      }

      if (!config.plugins) {
        config.plugins = []
      }

      return {
        plugins: loadPlugins(config, file),
        options: loadOptions(config, file),
        file: file
      }
    })
}

/**
 * Autoload Config for PostCSS
 *
 * @author Michael Ciniawsky @michael-ciniawsky <michael.ciniawsky@gmail.com>
 * @license MIT
 *
 * @module postcss-load-config
 * @version 2.0.0
 *
 * @requires comsiconfig
 * @requires ./options
 * @requires ./plugins
 */
module.exports = rc
