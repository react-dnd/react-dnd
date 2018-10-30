import { createGlobalStyle } from 'styled-components'
import theme from './theme'

export default createGlobalStyle`
* { box-sizing: border-box; }

html, body {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: ${theme.color.body};
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-size: 14px;
  line-height: 1.625;
}

@media only screen and (min-width: ${theme.dimensions.screen.tablet}) {
  body {
    font-size: 18px;
  }
}

h1, h2, h3, h4, h5, h6 {
  color: ${theme.color.header};
}

a[href] {
  color: ${theme.color.link};
  text-decoration: none;
}

a[id]:not([href]) {
  // This is quite a badass hack.
  // We really those anchors despite the navbar!
  position: relative;
  top: -${theme.dimensions.navbar.height};
}

pre, code {
  font-family: Consolas, 'Source Code Pro', Menlo, monospace;
  background: #F9F8F7;
  color: #484A4C;
}

a code {
  color: inherit;
}

code {
  margin: -0.05rem -0.15em;
  padding: 0.05rem 0.35em;
}

blockquote {
  margin: 1rem 0;
  padding: 0 1rem;
  color: #727476;
  border-left: solid 3px #DCDAD9;
}

blockquote > :first-child {
  margin-top: 0;
}

blockquote > :last-child {
  margin-bottom: 0;
}

hr {
  border: 1px solid;
  color: ${theme.color.body};
  opacity: 0.1;
}

// Markdown
.codeBlock {
  -webkit-overflow-scrolling: touch;
  background: #FCFBFA;
  border-left: solid 3px #ECEAE9;
  box-sizing: border-box;
  display: block;
  // font-size: 0.875em;
  margin: 0.5rem 0;
  overflow-y: scroll;
  padding: 0.5rem 8px 0.5rem 12px;
  white-space: pre;
}

.t.blockParams {
  padding-left: 2ch;
}

// TODO: not random colors
.token.punctuation,
.token.ignore,
.t.interfaceDef,
.t.member,
.t.callSig {
  color: #808890;
}

.token.function,
.token.class-name,
.token.qualifier,
.t.fnQualifier,
.t.fnName {
  color: #32308E;
}

.token.primitive,
.t.primitive {
  color: #922;
}

.token.number,
.t.typeParam {
  color: #905;
}

.t.typeQualifier,
.t.typeName {
  color: #013679;
}

.t.param {
  color: #945277;
}

.t.memberName {
  color: teal;
}

.token.block-keyword,
.token.keyword,
.t.keyword {
  color: #A51;
}

.token.string,
.token.regex {
  color: #df5050;
}

.token.operator {
  color: #a67f59;
}

.token.comment {
  color: #998;
  font-style: italic;
}
`
