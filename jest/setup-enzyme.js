/* eslint-disable @typescript-eslint/no-var-requires */
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })
