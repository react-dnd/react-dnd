/* eslint-disable @typescript-eslint/no-var-requires */
const core = require('dnd-core')
const dnd = require('react-dnd')
const htmlBackend = require('react-dnd-html5-backend')
const testBackend = require('react-dnd-test-backend')
const testUtils = require('react-dnd-test-utils')
const touchBackend = require('react-dnd-touch-backend')
const { check } = require('./common.js')

check(core, 'core')
check(dnd, 'dnd')
check(htmlBackend, 'htmlBackend')
check(touchBackend, 'touchBackend')
check(testBackend, 'testBackend')
check(testUtils, 'testUtils')

console.log('👍 CJS OK')
