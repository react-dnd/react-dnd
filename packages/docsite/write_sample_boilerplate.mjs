/* eslint-disable */
import fs from 'fs'
import path from 'path'
import { removeImportExtensions } from '../../scripts/removeImportExtensions.mjs'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

const rootPkgJson = require('../../package.json')
const reactDndPkgJson = require('../react-dnd/package.json')
const craTesterPkgJson = require('../test-suite-cra/package.json')
const examplesPkgJson = require('../examples/package.json')
const reactDndHtml5BackendVersion =
	require('../backend-html5/package.json').version

const APP_FILE_CONTENT = `
	import { render } from 'react-dom'
	import Example from './example'
	import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'

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
	render(<App />, rootElement)
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

const TS_CONFIG = {
	compilerOptions: {
		target: 'ESNext',
		module: 'ESNext',
		moduleResolution: 'Node',
		lib: ['dom', 'dom.iterable', 'esnext'],
		allowJs: true,
		skipLibCheck: true,
		esModuleInterop: true,
		allowSyntheticDefaultImports: true,
		strict: true,
		forceConsistentCasingInFileNames: true,
		noFallthroughCasesInSwitch: true,
		resolveJsonModule: true,
		isolatedModules: true,
		noEmit: true,
		jsx: 'react-jsx',
		rootDir: './src',
		experimentalDecorators: true,
		useDefineForClassFields: true,
	},
	include: ['src'],
}

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
			...craTesterPkgJson['dependencies'],
			...examplesPkgJson['dependencies'],
			'react-dnd': reactDndPkgJson.version,
			'react-dnd-html5-backend': reactDndHtml5BackendVersion,
			'prop-types': '*',
			'dnd-core': undefined,
			'react-dnd-examples': undefined,
		},
		devDependencies: {
			...craTesterPkgJson['devDependencies'],
		},
		eslintConfig: {
			extends: ['react-app', 'react-app/jest'],
		},
		browserslist: {
			production: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
			development: [
				'last 1 chrome version',
				'last 1 firefox version',
				'last 1 safari version',
			],
		},
	}
	if (isTS) {
		result.devDependencies = {
			...result.devDependencies,
			typescript: rootPkgJson.devDependencies.typescript,
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

		list.forEach((file) => {
			file = path.resolve(dir, file)

			fs.stat(file, (err, stat) => {
				if (stat?.isDirectory()) {
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
		exampleFiles.forEach((file) => {
			if (file.endsWith('.js') || file.endsWith('.jsx')) {
				const sourcePath = path.join(exampleDir, file)
				const targetPath = path.join(srcDir, file)
				fs.renameSync(sourcePath, targetPath)
			}
		})

		// Rename index.jsx to example.jsx. Reserve index. for the bootstrapping codes
		fs.renameSync(
			path.join(srcDir, 'index.js'),
			path.join(srcDir, 'example.js'),
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
		fs.writeFileSync(envFile, 'SKIP_PREFLIGHT_CHECK = true')
	})
}

function handleTsExample(err, results) {
	if (err) throw err
	results.forEach(async (exampleIndex, index) => {
		const exampleDir = path.dirname(exampleIndex)
		console.log('processing example', exampleDir)

		// Move example code into `src`
		const srcDir = path.join(exampleDir, 'src')
		const publicDir = path.join(exampleDir, 'public')
		fs.mkdirSync(srcDir, { recursive: true })
		fs.mkdirSync(publicDir, { recursive: true })

		const exampleFiles = fs.readdirSync(exampleDir)
		exampleFiles.forEach((file) => {
			if (file.endsWith('.ts') || file.endsWith('.tsx')) {
				const sourcePath = path.join(exampleDir, file)
				const targetPath = path.join(srcDir, file)
				fs.renameSync(sourcePath, targetPath)
			}
		})

		// Rename index.jsx to example.jsx. Reserve index. for the bootstrapping codes
		fs.renameSync(
			path.join(srcDir, 'index.ts'),
			path.join(srcDir, 'example.ts'),
		)

		const packageJsonFile = path.join(exampleDir, 'package.json')
		fs.writeFileSync(
			packageJsonFile,
			JSON.stringify(makePackageJson(index, true), null, 2),
		)

		const tsConfigFile = path.join(exampleDir, 'tsconfig.json')
		fs.writeFileSync(tsConfigFile, JSON.stringify(TS_CONFIG, null, 4))

		const sandboxAppFile = path.join(srcDir, 'index.tsx')
		fs.writeFileSync(sandboxAppFile, APP_FILE_CONTENT)

		const htmlFile = path.join(publicDir, 'index.html')
		fs.writeFileSync(htmlFile, HTML_FILE_CONTENT)

		const manifestFile = path.join(publicDir, 'manifest.json')
		fs.writeFileSync(manifestFile, MANIFEST_FILE_CONTENT)

		const envFile = path.join(exampleDir, '.env')
		fs.writeFileSync(envFile, 'SKIP_PREFLIGHT_CHECK = true')

		await removeImportExtensions(path.join(exampleDir, 'src'))
	})
}
// Write JS Examples
walk_examples(
	path.join(__dirname, 'static/examples_js'),
	'index.js',
	handleJsExample,
)

// Write TS Examples
walk_examples(
	path.join(__dirname, 'static/examples_ts'),
	'index.ts',
	handleTsExample,
)

console.log('done')
