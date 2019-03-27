const fs = require('fs')

const t = require('tap')

const dotenv = require('../lib/main')

process.env.TEST = 'test'
const parsed = dotenv.parse(fs.readFileSync('tests/.env', {encoding: 'utf8'}))

t.plan(16)

t.type(parsed, Object, 'should return an object')

t.equal(parsed.BASIC, 'basic', 'sets basic environment variable')

t.equal(parsed.AFTER_LINE, 'after_line', 'reads after a skipped line')

t.equal(parsed.EMPTY, '', 'defaults empty values to empty string')

t.equal(parsed.DOUBLE_QUOTES, 'double_quotes', 'escapes double quoted values')

t.equal(parsed.SINGLE_QUOTES, 'single_quotes', 'escapes single quoted values')

t.equal(parsed.EXPAND_NEWLINES, 'expand\nnewlines', 'expands newlines but only if double quoted')

t.equal(parsed.DONT_EXPAND_NEWLINES_1, 'dontexpand\\nnewlines', 'expands newlines but only if double quoted')

t.equal(parsed.DONT_EXPAND_NEWLINES_2, 'dontexpand\\nnewlines', 'expands newlines but only if double quoted')

t.notOk(parsed.COMMENTS, 'ignores commented lines')

t.equal(parsed.EQUAL_SIGNS, 'equals==', 'respects equals signs in values')

t.equal(parsed.RETAIN_INNER_QUOTES, '{"foo": "bar"}', 'retains inner quotes')

t.equal(parsed.RETAIN_INNER_QUOTES_AS_STRING, '{"foo": "bar"}', 'retains inner quotes')

t.equal(parsed.INCLUDE_SPACE, 'some spaced out string', 'retains spaces in string')

t.equal(parsed['USERNAME'], 'therealnerdybeast@example.tld', 'parses email addresses completely')

const payload = dotenv.parse(Buffer.from('BASIC=basic'))
t.equal(payload.BASIC, 'basic', 'should parse a buffer from a file into an object')
