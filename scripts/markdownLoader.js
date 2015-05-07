"use strict";

var marked = require('marked');
var prism = require('./prism');

// functions come before keywords
prism.languages.insertBefore('javascript', 'keyword', {
  'var': /\b(this)\b/g,
  'block-keyword': /\b(if|else|while|for|function)\b/g,
  'primitive': /\b(true|false|null|undefined)\b/g,
  'function': prism.languages.function,
});

prism.languages.insertBefore('javascript', {
  'qualifier': /\b[A-Z][a-z0-9_]+/g,
});

marked.setOptions({
  xhtml: true,
  highlight: function(code) {
    return prism.highlight(code, prism.languages.javascript);
  }
});

var renderer = new marked.Renderer();

renderer.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }
  return '<code class="codeBlock">' +
    (escaped ? code : escapeCode(code, true)) +
  '</code>';
};

function escapeCode(code) {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = function(markdown) {
  if (this && this.cacheable) {
    // Webpack specific call
    this.cacheable();
  }

  return marked(markdown, { renderer: renderer });
};
