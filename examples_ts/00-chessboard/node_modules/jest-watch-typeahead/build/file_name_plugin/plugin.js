"use strict";

var _jestWatcher = require("jest-watcher");

var _prompt = _interopRequireDefault(require("./prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FileNamePlugin {
  constructor({
    stdin,
    stdout,
    config = {}
  }) {
    this._stdin = stdin;
    this._stdout = stdout;
    this._prompt = new _jestWatcher.Prompt();
    this._projects = [];
    this._usageInfo = {
      key: config.key || 'p',
      prompt: config.prompt || 'filter by a filename regex pattern'
    };
  }

  apply(jestHooks) {
    jestHooks.onFileChange(({
      projects
    }) => {
      this._projects = projects;
    });
  }

  onKey(key) {
    this._prompt.put(key);
  }

  run(globalConfig, updateConfigAndRun) {
    const p = new _prompt.default(this._stdout, this._prompt);
    p.updateSearchSources(this._projects);
    return new Promise((res, rej) => {
      p.run(value => {
        updateConfigAndRun({
          mode: 'watch',
          testPathPattern: value
        });
        res();
      }, rej);
    });
  }

  getUsageInfo() {
    return this._usageInfo;
  }

}

module.exports = FileNamePlugin;