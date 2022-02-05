/* eslint-disable @typescript-eslint/no-var-requires */
import * as core from 'dnd-core'
import * as dnd from 'react-dnd'
import * as htmlBackend from 'react-dnd-html5-backend'
import * as touchBackend from 'react-dnd-touch-backend'
import * as testBackend from 'react-dnd-test-backend'
import * as testUtils from 'react-dnd-test-utils'
import * as examples from 'react-dnd-examples'
import { check } from './common.js'

check(core, 'core')
check(dnd, 'dnd')
check(htmlBackend, 'htmlBackend')
check(touchBackend, 'touchBackend')
check(testBackend, 'testBackend')
check(testUtils, 'testUtils')
check(examples, 'examples')

console.log('👍 ESModules OK')
