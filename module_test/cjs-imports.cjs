/* eslint-disable @typescript-eslint/no-var-requires */
const { check } = require('./common.js')

check(require('dnd-core'), 'core')
check(require('react-dnd'), 'dnd')
check(require('react-dnd-html5-backend'), 'htmlBackend')
check(require('react-dnd-touch-backend'), 'touchBackend')
check(require('react-dnd-test-backend'), 'testBackend')
check(require('react-dnd-test-utils'), 'testUtils')
check(require('react-dnd-examples'), 'examples')

console.log('👍 CommonJS Modules OK')
