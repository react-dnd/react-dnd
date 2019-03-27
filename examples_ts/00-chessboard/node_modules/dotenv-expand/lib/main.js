'use strict'

var dotenvExpand = function (config) {
  var interpolate = function (env) {
    var matches = env.match(/\$([a-zA-Z0-9_]+)|\${([a-zA-Z0-9_]+)}/g) || []

    matches.forEach(function (match) {
      var key = match.replace(/\$|{|}/g, '')

      // process.env value 'wins' over .env file's value
      var variable = process.env[key] || config.parsed[key] || ''

      // Resolve recursive interpolations
      variable = interpolate(variable)

      env = env.replace(match, variable)
    })

    return env
  }

  for (var configKey in config.parsed) {
    var value = process.env[configKey] || config.parsed[configKey]

    if (config.parsed[configKey].substring(0, 2) === '\\$') {
      config.parsed[configKey] = value.substring(1)
    } else if (config.parsed[configKey].indexOf('\\$') > 0) {
      config.parsed[configKey] = value.replace(/\\\$/g, '$')
    } else {
      config.parsed[configKey] = interpolate(value)
    }
  }

  for (var processKey in config.parsed) {
    process.env[processKey] = config.parsed[processKey]
  }

  return config
}

module.exports = dotenvExpand
