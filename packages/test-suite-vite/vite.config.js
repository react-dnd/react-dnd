/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('vite')
const { default: reactJsx } = require('vite-react-jsx')

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: 'es2020',
	},
	plugins: [reactJsx()],
})
