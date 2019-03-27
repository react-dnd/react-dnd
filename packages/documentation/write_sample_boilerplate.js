const fs = require('fs')
const path = require('path')

function walk_examples(dir, done) {
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
					walk_examples(file, (err, res) => {
						results = results.concat(res)
						if (!--pending) done(null, results)
					})
				} else {
					if (file.endsWith('index.jsx')) {
						results.push(file)
					}
					if (!--pending) done(null, results)
				}
			})
		})
	})
}

walk_examples(path.join(__dirname, 'static/examples_js'), function(
	err,
	results,
) {
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
			`{
        "name": "react-dnd-example-${index}",
        "main": "src/index.js",
        "description": "auto-generated package for codesandbox import",
        "private": true,
        "version": "0.0.0",
        "scripts": {
          "start": "react-scripts start",
          "build": "react-scripts build",
          "test": "react-scripts test --env=jsdom",
          "eject": "react-scripts eject"
        },
        "dependencies": {
          "react": "16.8.4",
          "react-dom": "16.8.4",
          "react-scripts": "2.1.8",
          "react-dnd": "*",
					"react-dnd-html5-backend": "*",
					"babel-jest": "23.6.0"
				},
				"browserslist": [
					">0.2%",
					"not dead",
					"not ie <= 11",
					"not op_mini all"
				]
      }
      `,
		)

		const sandboxAppFile = path.join(exampleDir, 'src/index.js')
		fs.writeFileSync(
			sandboxAppFile,
			`
			import React from 'react'
			import ReactDOM from 'react-dom'
			import Example from './example'
			import { DragDropContextProvider } from 'react-dnd'
			import HTML5Backend from 'react-dnd-html5-backend'
			
			function App() {
				return (
					<div className="App">
						<DragDropContextProvider backend={HTML5Backend}>
							<Example />
						</DragDropContextProvider>
					</div>
				)
			}
			
			const rootElement = document.getElementById('root')
			ReactDOM.render(<App />, rootElement)			
    `,
		)

		const htmlFile = path.join(exampleDir, 'public/index.html')
		fs.writeFileSync(
			htmlFile,
			`
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
    `,
		)

		const manifestFile = path.join(exampleDir, 'public/manifest.json')
		fs.writeFileSync(
			manifestFile,
			`
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

    `,
		)

		const envFile = path.join(exampleDir, '.env')
		fs.writeFileSync(envFile, `SKIP_PREFLIGHT_CHECK = true`)
	})
})
