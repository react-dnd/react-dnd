# rehype-parse

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Chat][chat-badge]][chat]

[Parser][] for **[unified][]**.
Parses HTML to **[hast][]** syntax trees.
Used in the [**rehype** processor][processor] but can be used on its own as
well.

* * *

**Announcing the unified collective!  🎉
[Read more about it on Medium »][announcement]**

## Sponsors

<!--lint ignore no-html maximum-line-length-->

<table>
  <tr valign="top">
    <td width="20%" align="center">
      <a href="https://zeit.co"><img src="https://avatars1.githubusercontent.com/u/14985020?s=400&v=4"></a>
      <br><br>🥇
      <a href="https://zeit.co">ZEIT</a>
    </td>
    <td width="20%" align="center">
      <a href="https://www.gatsbyjs.org"><img src="https://avatars1.githubusercontent.com/u/12551863?s=400&v=4"></a>
      <br><br>🥇
      <a href="https://www.gatsbyjs.org">Gatsby</a></td>
    <td width="20%" align="center">
      <a href="https://compositor.io"><img src="https://avatars1.githubusercontent.com/u/19245838?s=400&v=4"></a>
      <br><br>🥉
      <a href="https://compositor.io">Compositor</a>
    </td>
    <td width="20%" align="center">
      <a href="https://www.holloway.com"><img src="https://avatars1.githubusercontent.com/u/35904294?s=400&v=4"></a>
      <br><br>
      <a href="https://www.holloway.com">Holloway</a>
    </td>
    <td width="20%" align="center">
      <br><br><br><br>
      <a href="https://opencollective.com/unified"><strong>You?</strong>
    </td>
  </tr>
</table>

## Installation

[npm][]:

```bash
npm install rehype-parse
```

## Usage

This example shows how we parse HTML with this module and configure it to emit
parse errors except for duplicate attributes.
Then we transform HTML to markdown with [`rehype-remark`][rehype-remark] and
finally compile that markdown with [`remark-stringify`][remark-stringify].

Say we have the following file, `example.html`, with a few errors:

```html
<!doctypehtml>
<title class="a" class="b">Hello…</title>
<h1/>World!</h1>
```

And our script, `example.js`, looks as follows:

```js
var vfile = require('to-vfile')
var report = require('vfile-reporter')
var unified = require('unified')
var parse = require('rehype-parse')
var rehype2remark = require('rehype-remark')
var stringify = require('remark-stringify')

unified()
  .use(parse, {emitParseErrors: true, duplicateAttribute: false})
  .use(rehype2remark)
  .use(stringify)
  .process(vfile.readSync('example.html'), function(err, file) {
    console.error(report(err || file))
    console.log(String(file))
  })
```

Now, running `node example` yields:

```txt
example.html
  1:10-1:10  warning  Missing whitespace before doctype name                      missing-whitespace-before-doctype-name                 parse-error
    3:1-3:6  warning  Unexpected trailing slash on start tag of non-void element  non-void-html-element-start-tag-with-trailing-solidus  parse-error

⚠ 2 warnings
```

```markdown
# World!
```

## API

### `processor.use(parse[, options])`

Configure the `processor` to read HTML as input and process a
**[hast][]** syntax tree.

##### `options`

###### `options.fragment`

Specify whether to parse a fragment (`boolean`, default: `false`),
instead of a complete document.  In document mode, unopened `html`,
`head`, and `body` elements are opened in just the right places.

###### `options.space`

> ⚠️ rehype is not an XML parser.  It support SVG as embedded in HTML, but not
> the features available in the rest of XML/SVG.  Passing SVG files could strip
> useful information, but fragments of modern SVG should be fine.

Whether the document is in the `'html'` or `'svg'` space (`'svg'` or `'html'`,
default: `'html'`).

If an `svg` element is found in the HTML space, `toHTML` automatically switches
to the SVG space when entering the element, and switches back when leaving.

**Note**: make sure to set `fragment: true` if `space: 'svg'`.

###### `options.emitParseErrors`

> ⚠️ Parse errors are currently being added to HTML.
> Not all errors emitted by parse5 (or rehype-parse) are specced yet.
> Some documentation may still be missing.

Emit parse errors while parsing on the [vfile][] (`boolean`, default: `false`).

Setting this to true starts emitting [HTML parse errors][parse-errors].

Specific rules can be turned off by setting them to `false` (or `0`).
The default, when `emitParseErrors: true`, is `true` (or `1`), and means that
rules emit as warnings.
Rules can also be configured with `2`, to turn them into fatal errors.

The specific parse errors that are currently supported are detailed below:

<!-- parse-error start -->

*   `abandonedHeadElementChild` — unexpected metadata element after head ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/abandoned-head-element-child/index.html))
*   [`abruptClosingOfEmptyComment`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-abrupt-closing-of-empty-comment) — unexpected abruptly closed empty comment ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/abrupt-closing-of-empty-comment/index.html))
*   [`abruptDoctypePublicIdentifier`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-abrupt-doctype-public-identifier) — unexpected abruptly closed public identifier ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/abrupt-doctype-public-identifier/index.html))
*   [`abruptDoctypeSystemIdentifier`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-abrupt-doctype-system-identifier) — unexpected abruptly closed system identifier ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/abrupt-doctype-system-identifier/index.html))
*   [`absenceOfDigitsInNumericCharacterReference`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-absence-of-digits-in-numeric-character-reference) — unexpected non-digit at start of numeric character reference ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/absence-of-digits-in-numeric-character-reference/index.html))
*   [`cdataInHtmlContent`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-cdata-in-html-content) — unexpected CDATA section in HTML ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/cdata-in-html-content/index.html))
*   [`characterReferenceOutsideUnicodeRange`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-character-reference-outside-unicode-range) — unexpected too big numeric character reference ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/character-reference-outside-unicode-range/index.html))
*   `closingOfElementWithOpenChildElements` — unexpected closing tag with open child elements ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/closing-of-element-with-open-child-elements/index.html))
*   [`controlCharacterInInputStream`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-control-character-in-input-stream) — unexpected control character ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/control-character-in-input-stream/index.html))
*   [`controlCharacterReference`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-control-character-reference) — unexpected control character reference ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/control-character-reference/index.html))
*   `disallowedContentInNoscriptInHead` — disallowed content inside \`&lt;noscript>\` in \`&lt;head>\` ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/disallowed-content-in-noscript-in-head/index.html))
*   [`duplicateAttribute`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-duplicate-attribute) — unexpected duplicate attribute ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/duplicate-attribute/index.html))
*   [`endTagWithAttributes`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-end-tag-with-attributes) — unexpected attribute on closing tag ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/end-tag-with-attributes/index.html))
*   [`endTagWithTrailingSolidus`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-end-tag-with-trailing-solidus) — unexpected slash at end of closing tag ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/end-tag-with-trailing-solidus/index.html))
*   `endTagWithoutMatchingOpenElement` — unexpected unopened end tag ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/end-tag-without-matching-open-element/index.html))
*   [`eofBeforeTagName`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-eof-before-tag-name) — unexpected end of file ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/eof-before-tag-name/index.html))
*   [`eofInCdata`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-eof-in-cdata) — unexpected end of file in CDATA ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/eof-in-cdata/index.html))
*   [`eofInComment`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-eof-in-comment) — unexpected end of file in comment ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/eof-in-comment/index.html))
*   [`eofInDoctype`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-eof-in-doctype) — unexpected end of file in doctype ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/eof-in-doctype/index.html))
*   `eofInElementThatCanContainOnlyText` — unexpected end of file in element that can only contain text ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/eof-in-element-that-can-contain-only-text/index.html))
*   [`eofInScriptHtmlCommentLikeText`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-eof-in-script-html-comment-like-text) — unexpected end of file in comment inside script ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/eof-in-script-html-comment-like-text/index.html))
*   [`eofInTag`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-eof-in-tag) — unexpected end of file in tag ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/eof-in-tag/index.html))
*   [`incorrectlyClosedComment`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-incorrectly-closed-comment) — incorrectly closed comment ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/incorrectly-closed-comment/index.html))
*   [`incorrectlyOpenedComment`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-incorrectly-opened-comment) — incorrectly opened comment ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/incorrectly-opened-comment/index.html))
*   [`invalidCharacterSequenceAfterDoctypeName`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-invalid-character-sequence-after-doctype-name) — invalid sequence after doctype name ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/invalid-character-sequence-after-doctype-name/index.html))
*   [`invalidFirstCharacterOfTagName`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-invalid-first-character-of-tag-name) — invalid first character in tag name ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/invalid-first-character-of-tag-name/index.html))
*   `misplacedDoctype` — misplaced doctype ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/misplaced-doctype/index.html))
*   `misplacedStartTagForHeadElement` — misplaced \`&lt;head>\` start tag ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/misplaced-start-tag-for-head-element/index.html))
*   [`missingAttributeValue`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-attribute-value) — missing attribute value ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-attribute-value/index.html))
*   `missingDoctype` — missing doctype before other content ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-doctype/index.html))
*   [`missingDoctypeName`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-doctype-name) — missing doctype name ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-doctype-name/index.html))
*   [`missingDoctypePublicIdentifier`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-doctype-public-identifier) — missing public identifier in doctype ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-doctype-public-identifier/index.html))
*   [`missingDoctypeSystemIdentifier`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-doctype-system-identifier) — missing system identifier in doctype ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-doctype-system-identifier/index.html))
*   [`missingEndTagName`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-end-tag-name) — missing name in end tag ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-end-tag-name/index.html))
*   [`missingQuoteBeforeDoctypePublicIdentifier`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-quote-before-doctype-public-identifier) — missing quote before public identifier in doctype ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-quote-before-doctype-public-identifier/index.html))
*   [`missingQuoteBeforeDoctypeSystemIdentifier`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-quote-before-doctype-system-identifier) — missing quote before system identifier in doctype ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-quote-before-doctype-system-identifier/index.html))
*   [`missingSemicolonAfterCharacterReference`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-semicolon-after-character-reference) — missing semicolon after character reference ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-semicolon-after-character-reference/index.html))
*   [`missingWhitespaceAfterDoctypePublicKeyword`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-whitespace-after-doctype-public-keyword) — missing whitespace after public identifier in doctype ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-whitespace-after-doctype-public-keyword/index.html))
*   [`missingWhitespaceAfterDoctypeSystemKeyword`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-whitespace-after-doctype-system-keyword) — missing whitespace after system identifier in doctype ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-whitespace-after-doctype-system-keyword/index.html))
*   [`missingWhitespaceBeforeDoctypeName`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-whitespace-before-doctype-name) — missing whitespace before doctype name ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-whitespace-before-doctype-name/index.html))
*   [`missingWhitespaceBetweenAttributes`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-whitespace-between-attributes) — missing whitespace between attributes ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-whitespace-between-attributes/index.html))
*   [`missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-missing-whitespace-between-doctype-public-and-system-identifiers) — missing whitespace between public and system identifiers in doctype ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/missing-whitespace-between-doctype-public-and-system-identifiers/index.html))
*   [`nestedComment`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-nested-comment) — unexpected nested comment ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/nested-comment/index.html))
*   `nestedNoscriptInHead` — unexpected nested \`&lt;noscript>\` in \`&lt;head>\` ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/nested-noscript-in-head/index.html))
*   `nonConformingDoctype` — unexpected non-conforming doctype declaration ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/non-conforming-doctype/index.html))
*   [`nonVoidHtmlElementStartTagWithTrailingSolidus`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-non-void-html-element-start-tag-with-trailing-solidus) — unexpected trailing slash on start tag of non-void element ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/non-void-html-element-start-tag-with-trailing-solidus/index.html))
*   [`noncharacterCharacterReference`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-noncharacter-character-reference) — unexpected noncharacter code point referenced by character reference ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/noncharacter-character-reference/index.html))
*   [`noncharacterInInputStream`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-noncharacter-in-input-stream) — unexpected noncharacter character ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/noncharacter-in-input-stream/index.html))
*   [`nullCharacterReference`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-null-character-reference) — unexpected NULL character referenced by character reference ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/null-character-reference/index.html))
*   `openElementsLeftAfterEof` — unexpected end of file ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/open-elements-left-after-eof/index.html))
*   [`surrogateCharacterReference`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-surrogate-character-reference) — unexpected surrogate character referenced by character reference ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/surrogate-character-reference/index.html))
*   [`surrogateInInputStream`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-surrogate-in-input-stream) — unexpected surrogate character
*   [`unexpectedCharacterAfterDoctypeSystemIdentifier`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-unexpected-character-after-doctype-system-identifier) — invalid character after system identifier in doctype ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/unexpected-character-after-doctype-system-identifier/index.html))
*   [`unexpectedCharacterInAttributeName`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-unexpected-character-in-attribute-name) — unexpected character in attribute name ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/unexpected-character-in-attribute-name/index.html))
*   [`unexpectedCharacterInUnquotedAttributeValue`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-unexpected-character-in-unquoted-attribute-value) — unexpected character in unquoted attribute value ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/unexpected-character-in-unquoted-attribute-value/index.html))
*   [`unexpectedEqualsSignBeforeAttributeName`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-unexpected-equals-sign-before-attribute-name) — unexpected equals sign before attribute name  ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/unexpected-equals-sign-before-attribute-name/index.html))
*   [`unexpectedNullCharacter`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-unexpected-null-character) — unexpected NULL character ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/unexpected-null-character/index.html))
*   [`unexpectedQuestionMarkInsteadOfTagName`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-unexpected-question-mark-instead-of-tag-name) — unexpected question mark instead of tag name ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/unexpected-question-mark-instead-of-tag-name/index.html))
*   [`unexpectedSolidusInTag`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-unexpected-solidus-in-tag) — unexpected slash in tag ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/unexpected-solidus-in-tag/index.html))
*   [`unknownNamedCharacterReference`](https://html.spec.whatwg.org/multipage/parsing.html#parse-error-unknown-named-character-reference) — unexpected unknown named character reference ([example](https://github.com/rehypejs/rehype/blob/master/test/parse-error/unknown-named-character-reference/index.html))

<!-- parse-error end -->

###### `options.verbose`

Patch extra positional information (`boolean`, default: `false`).
If specified, the following element:

```html
<img src="#" alt>
```

...has the following `data`:

```js
{ position:
   { opening:
      { start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 18, offset: 17 } },
     closing: null,
     properties:
      { src:
         { start: { line: 1, column: 6, offset: 5 },
           end: { line: 1, column: 13, offset: 12 } },
        alt:
         { start: { line: 1, column: 14, offset: 13 },
           end: { line: 1, column: 17, offset: 16 } } } } }
```

### `parse.Parser`

Access to the [parser][], if you need it.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/rehypejs/rehype/master.svg

[build]: https://travis-ci.org/rehypejs/rehype

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype.svg

[coverage]: https://codecov.io/github/rehypejs/rehype

[downloads-badge]: https://img.shields.io/npm/dm/rehype-parse.svg

[downloads]: https://www.npmjs.com/package/rehype-parse

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-parse.svg

[size]: https://bundlephobia.com/result?p=rehype-parse

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[license]: https://github.com/rehypejs/rehype/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[rehype-remark]: https://github.com/rehypejs/rehype-remark

[remark-stringify]: https://github.com/remarkjs/remark/tree/master/packages/remark-stringify

[unified]: https://github.com/unifiedjs/unified

[vfile]: https://github.com/vfile/vfile

[parse-errors]: https://html.spec.whatwg.org/multipage/parsing.html#parse-errors

[processor]: https://github.com/rehypejs/rehype/blob/master/packages/rehype

[hast]: https://github.com/syntax-tree/hast

[parser]: https://github.com/unifiedjs/unified#processorparser

[announcement]: https://medium.com/unifiedjs/collectively-evolving-through-crowdsourcing-22c359ea95cc
