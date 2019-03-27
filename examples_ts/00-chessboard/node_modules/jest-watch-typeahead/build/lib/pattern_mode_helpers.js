"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTypeaheadSelection = exports.printTypeaheadItem = exports.printMore = exports.printStartTyping = exports.printPatternMatches = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _stripAnsi = _interopRequireDefault(require("strip-ansi"));

var _jestWatcher = require("jest-watcher");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pluralize = (count, text) => count === 1 ? text : `${text}s`;

const printPatternMatches = (count, entity, pipe, extraText = '') => {
  const pluralized = pluralize(count, entity);
  const result = count ? `\n\n Pattern matches ${count} ${pluralized}` : `\n\n Pattern matches no ${pluralized}`;
  pipe.write(result + extraText);
};

exports.printPatternMatches = printPatternMatches;

const printStartTyping = (entity, pipe) => {
  pipe.write(`\n\n ${_chalk.default.italic.yellow(`Start typing to filter by a ${entity} regex pattern.`)}`);
};

exports.printStartTyping = printStartTyping;

const printMore = (entity, pipe, more) => {
  pipe.write(`\n   ${_chalk.default.dim(`...and ${more} more ${pluralize(more, entity)}`)}`);
};

exports.printMore = printMore;

const printTypeaheadItem = (item, pipe) => pipe.write(`\n ${_chalk.default.dim('\u203A')} ${item}`);

exports.printTypeaheadItem = printTypeaheadItem;

const formatTypeaheadSelection = (item, index, activeIndex, prompt) => {
  if (index === activeIndex) {
    prompt.setPromptSelection((0, _stripAnsi.default)(item));
    return _chalk.default.black.bgYellow((0, _stripAnsi.default)(item));
  }

  return item;
};

exports.formatTypeaheadSelection = formatTypeaheadSelection;