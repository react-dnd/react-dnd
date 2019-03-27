import React from 'react'
import BoxWithImage from './BoxWithImage'
import BoxWithHandle from './BoxWithHandle'
const CodeSandboxer = require('react-codesandboxer')

const Container: React.FC = () => (
	<div>
		<CodeSandboxer
			examplePath="examples_js/05%20Customize/Handles%20and%20Previews/index.js"
			gitInfo={{
				account: 'react-dnd',
				repository: 'react-dnd',
				host: 'github',
			}}
		>
			{() => <button type="submit">Upload to CodeSandbox</button>}
		</CodeSandboxer>
		<div style={{ marginTop: '1.5rem' }}>
			<BoxWithHandle />
			<BoxWithImage />
		</div>
	</div>
)

export default Container
