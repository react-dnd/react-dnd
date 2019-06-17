/* eslint-disable */
const fs = require('fs')
const path = require('path')
const reactDndVersion = require('../../core/react-dnd/package.json').version
const reactDndHtml5BackendVersion = require('../../core/html5-backend/package.json')
	.version

const APP_FILE_CONTENT = `
	import React from 'react'
	import ReactDOM from 'react-dom'
	import Example from './example'
	import { DndProvider } from 'react-dnd'
	import HTML5Backend from 'react-dnd-html5-backend'
	
	function App() {
		return (
			<div className="App">
				<DndProvider backend={HTML5Backend}>
					<Example />
				</DndProvider>
			</div>
		)
	}
	
	const rootElement = document.getElementById('root')
	ReactDOM.render(<App />, rootElement)	
`

const MANIFEST_FILE_CONTENT = `
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}`

const HTML_FILE_CONTENT = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1, shrink-to-fit=no"
		/>
		<meta name="theme-color" content="#000000" />
		<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
		<title>React App</title>
	</head>
	<body>
		<noscript>You need to enable JavaScript to run this app.</noscript>
		<div id="root"></div>
	</body>
</html>
`

const makePackageJson = (index, isTS) => {
	const result = {
		name: `react-dnd-example-${index}`,
		main: `src/index.${isTS ? 'tsx' : 'js'}`,
		description: 'auto-generated package for codesandbox import',
		private: true,
		version: '0.0.0',
		scripts: {
			start: 'react-scripts start',
			build: 'react-scripts build',
			test: 'react-scripts test --env=jsdom',
			eject: 'react-scripts eject',
		},
		dependencies: {
			react: '16.8.4',
			'react-dom': '16.8.4',
			'react-scripts': '2.1.8',
			'react-dnd': reactDndVersion,
			'react-dnd-html5-backend': reactDndHtml5BackendVersion,
			'babel-jest': '23.6.0',
			faker: '^4.1.0',
			'immutability-helper': '^3.0.0',
			'react-frame-component': '^4.1.0',
		},
		browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
	}
	if (isTS) {
		result.dependencies = {
			...result.dependencies,
			typescript: '^3.3.3333',
			'@types/react': '^16.8.7',
			'@types/react-dom': '^16.8.2',
			'@types/jest': '^24.0.9',
			'@types/node': '^11.12.0',
		}
	}
	return result
}

function walk_examples(dir, look_for, done) {
	var results = []
	fs.readdir(dir, (err, list) => {
		if (err) {
			return done(err)
		}

		let pending = list.length
		if (!pending) {
			return done(null, results)
		}

		list.forEach(file => {
			file = path.resolve(dir, file)

			fs.stat(file, (err, stat) => {
				if (stat && stat.isDirectory()) {
					walk_examples(file, look_for, (err, res) => {
						results = results.concat(res)
						if (!--pending) done(null, results)
					})
				} else {
					if (file.endsWith(look_for)) {
						results.push(file)
					}
					if (!--pending) done(null, results)
				}
			})
		})
	})
}

function handleJsExample(err, results) {
	if (err) throw err
	results.forEach((exampleIndex, index) => {
		const exampleDir = path.dirname(exampleIndex)
		console.log('processing example', exampleDir)

		// Move example code into `src`
		const srcDir = path.join(exampleDir, 'src')
		const publicDir = path.join(exampleDir, 'public')
		fs.mkdirSync(srcDir, { recursive: true })
		fs.mkdirSync(publicDir, { recursive: true })

		const exampleFiles = fs.readdirSync(exampleDir)
		exampleFiles.forEach(file => {
			if (file.endsWith('.js') || file.endsWith('.jsx')) {
				const sourcePath = path.join(exampleDir, file)
				const targetPath = path.join(srcDir, file)
				fs.renameSync(sourcePath, targetPath)
			}
		})

		// Rename index.jsx to example.jsx. Reserve index. for the bootstrapping codes
		fs.renameSync(
			path.join(srcDir, 'index.jsx'),
			path.join(srcDir, 'example.jsx'),
		)

		const packageJsonFile = path.join(exampleDir, 'package.json')
		fs.writeFileSync(
			packageJsonFile,
			JSON.stringify(makePackageJson(index), null, 2),
		)

		const sandboxAppFile = path.join(srcDir, 'index.js')
		fs.writeFileSync(sandboxAppFile, APP_FILE_CONTENT)

		const htmlFile = path.join(publicDir, 'index.html')
		fs.writeFileSync(htmlFile, HTML_FILE_CONTENT)

		const manifestFile = path.join(publicDir, 'manifest.json')
		fs.writeFileSync(manifestFile, MANIFEST_FILE_CONTENT)

		const envFile = path.join(exampleDir, '.env')
		fs.writeFileSync(envFile, `SKIP_PREFLIGHT_CHECK = true`)
	})
}

function handleTsExample(err, results) {
	if (err) throw err
	results.forEach((exampleIndex, index) => {
		const exampleDir = path.dirname(exampleIndex)
		console.log('processing example', exampleDir)

		// Move example code into `src`
		const srcDir = path.join(exampleDir, 'src')
		const publicDir = path.join(exampleDir, 'public')
		fs.mkdirSync(srcDir, { recursive: true })
		fs.mkdirSync(publicDir, { recursive: true })

		const exampleFiles = fs.readdirSync(exampleDir)
		exampleFiles.forEach(file => {
			if (file.endsWith('.ts') || file.endsWith('.tsx')) {
				const sourcePath = path.join(exampleDir, file)
				const targetPath = path.join(srcDir, file)
				fs.renameSync(sourcePath, targetPath)
			}
		})

		// Rename index.jsx to example.jsx. Reserve index. for the bootstrapping codes
		fs.renameSync(
			path.join(srcDir, 'index.tsx'),
			path.join(srcDir, 'example.tsx'),
		)

		const packageJsonFile = path.join(exampleDir, 'package.json')
		fs.writeFileSync(
			packageJsonFile,
			JSON.stringify(makePackageJson(index, true), null, 2),
		)

		const sandboxAppFile = path.join(srcDir, 'index.tsx')
		fs.writeFileSync(sandboxAppFile, APP_FILE_CONTENT)

		const htmlFile = path.join(publicDir, 'index.html')
		fs.writeFileSync(htmlFile, HTML_FILE_CONTENT)

		const manifestFile = path.join(publicDir, 'manifest.json')
		fs.writeFileSync(manifestFile, MANIFEST_FILE_CONTENT)

		const envFile = path.join(exampleDir, '.env')
		fs.writeFileSync(envFile, `SKIP_PREFLIGHT_CHECK = true`)
	})
}

// Write JS Examples
walk_examples(
	path.join(__dirname, 'static/examples_hooks_js'),
	'index.jsx',
	handleJsExample,
)
walk_examples(
	path.join(__dirname, 'static/examples_decorators_js'),
	'index.jsx',
	handleJsExample,
)

// Write TS Examples
walk_examples(
	path.join(__dirname, 'static/examples_hooks_ts'),
	'index.tsx',
	handleTsExample,
)
walk_examples(
	path.join(__dirname, 'static/examples_decorators_ts'),
	'index.tsx',
	handleTsExample,
)
