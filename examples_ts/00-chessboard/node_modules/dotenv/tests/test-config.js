const fs = require('fs')

const t = require('tap')
const sinon = require('sinon')

const dotenv = require('../lib/main')

const mockParseResponse = {test: 'foo'}
let readFileSyncStub

t.beforeEach(done => {
  readFileSyncStub = sinon.stub(fs, 'readFileSync').returns('test=foo')
  sinon.stub(dotenv, 'parse').returns(mockParseResponse)
  done()
})

t.afterEach(done => {
  readFileSyncStub.restore()
  dotenv.parse.restore()
  done()
})

t.test('takes option for path', ct => {
  ct.plan(1)

  const testPath = 'tests/.env'
  dotenv.config({path: testPath})

  ct.equal(readFileSyncStub.args[0][0], testPath)
})

t.test('takes option for encoding', ct => {
  ct.plan(1)

  const testEncoding = 'base64'
  dotenv.config({encoding: testEncoding})

  ct.equal(readFileSyncStub.args[0][1].encoding, testEncoding)
})

t.test('reads path with encoding, parsing output to process.env', ct => {
  ct.plan(2)

  const res = dotenv.config()
  ct.same(res.parsed, mockParseResponse)

  ct.equal(readFileSyncStub.callCount, 1)
})

t.test('makes load a synonym of config', ct => {
  ct.plan(2)

  const env = dotenv.load()
  ct.same(env.parsed, mockParseResponse)
  ct.equal(readFileSyncStub.callCount, 1)
})

t.test('does not write over keys already in process.env', ct => {
  ct.plan(2)

  const existing = 'bar'
  process.env.test = existing
  // 'foo' returned as value in `beforeEach`. should keep this 'bar'
  const env = dotenv.config()

  ct.equal(env.parsed.test, mockParseResponse.test)
  ct.equal(process.env.test, existing)
})

t.test('does not write over keys already in process.env if the key has a falsy value', ct => {
  ct.plan(2)

  const existing = ''
  process.env.test = existing
  // 'foo' returned as value in `beforeEach`. should keep this ''
  const env = dotenv.config()

  ct.equal(env.parsed.test, mockParseResponse.test)
  // NB: process.env.test becomes undefined on Windows
  ct.notOk(process.env.test)
})

t.test('returns parsed object', ct => {
  ct.plan(2)

  const env = dotenv.config()

  ct.notOk(env.error)
  ct.same(env.parsed, mockParseResponse)
})

t.test('returns any errors thrown from reading file or parsing', ct => {
  ct.plan(1)

  readFileSyncStub.throws()
  const env = dotenv.config()

  ct.type(env.error, Error)
})
