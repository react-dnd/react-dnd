'use strict';

var _jestWatcher = require('jest-watcher');

var _file_name_pattern_prompt = require('./file_name_pattern_prompt');

var _file_name_pattern_prompt2 = _interopRequireDefault(_file_name_pattern_prompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FileNamePlugin {

  constructor({
    stdin,
    stdout
  }) {
    this._stdin = stdin;
    this._stdout = stdout;
    this._prompt = new _jestWatcher.Prompt();
    this._projects = [];
  }

  apply(jestHooks) {
    jestHooks.onFileChange(({ projects }) => {
      this._projects = projects;
    });
  }

  onKey(key) {
    this._prompt.put(key);
  }

  run(globalConfig, updateConfigAndRun) {
    const p = new _file_name_pattern_prompt2.default(this._stdout, this._prompt);
    p.updateSearchSources(this._projects);
    return new Promise((res, rej) => {
      p.run(value => {
        updateConfigAndRun({ mode: 'watch', testPathPattern: value });
        res();
      }, rej);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getUsageInfo() {
    return {
      key: 'p',
      prompt: 'filter by a filename regex pattern'
    };
  }
}

module.exports = FileNamePlugin;