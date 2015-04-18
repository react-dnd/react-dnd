'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;
exports['default'] = createConnectRef;

var _shallowEqual = require('./utils/shallowEqual');

var _shallowEqual2 = _interopRequireWildcard(_shallowEqual);

var _Disposable$SerialDisposable = require('disposables');

var _findDOMNode = require('react');

function createConnectRef(connect) {
  var disposable = new _Disposable$SerialDisposable.SerialDisposable();

  var currentNode = null;
  var currentOptions = null;

  function ref(nextComponentOrNode, nextOptions) {
    var nextNode = _findDOMNode.findDOMNode(nextComponentOrNode);
    if (nextNode === currentNode && _shallowEqual2['default'](currentOptions, nextOptions)) {
      return;
    }

    currentNode = nextNode;
    currentOptions = nextOptions;

    if (!nextNode) {
      disposable.setDisposable(null);
      return;
    }

    var currentDispose = connect(nextNode, nextOptions);
    disposable.setDisposable(new _Disposable$SerialDisposable.Disposable(currentDispose));
  }

  return { disposable: disposable, ref: ref };
}

module.exports = exports['default'];