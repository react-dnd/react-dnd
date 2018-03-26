import React from 'react'
import { hydrate } from 'react-dom'
import IndexPage from './IndexPage'

hydrate(<IndexPage {...window.INITIAL_PROPS} />, document)
