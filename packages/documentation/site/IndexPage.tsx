import { APIPages, ExamplePages, Pages } from './Constants'
import HomePage from './pages/HomePage'
import APIPage from './pages/APIPage'
import ExamplePage from './pages/ExamplePage'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import ApiDocs from './ApiDocs'
import Examples from './Examples'
import IndexStyle from './IndexStyle'

export interface IndexPageProps {
	devMode?: boolean
	files: any
	location: string
}

export interface IndexPageState {
	renderPage?: boolean
}

export default class IndexPage extends React.Component<
	IndexPageProps,
	IndexPageState
> {
	public static getDoctype() {
		return '<!doctype html>'
	}

	public static renderToString(props: IndexPageProps) {
		return (
			IndexPage.getDoctype() +
			ReactDOMServer.renderToString(<IndexPage {...props} />)
		)
	}

	constructor(props: IndexPageProps) {
		super(props)
		this.state = {
			renderPage: !this.props.devMode,
		}
	}

	public componentDidMount() {
		if (!this.state.renderPage) {
			this.setState({
				renderPage: true,
			})
		}
	}

	public render() {
		// Dump out our current props to a global object via a script tag so
		// when initialising the browser environment we can bootstrap from the
		// same props as what each page was rendered with.
		const browserInitScriptObj = {
			__html: 'window.INITIAL_PROPS = ' + JSON.stringify(this.props) + ';\n',
		}

		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<title>React DnD</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
					/>
					<base target="_blank" />
					<IndexStyle />
				</head>
				<body>
					{this.state.renderPage && this.renderPage()}
					<script dangerouslySetInnerHTML={browserInitScriptObj} />
					<script src={this.props.files['main.js']} />
				</body>
			</html>
		)
	}

	private renderPage() {
		switch (this.props.location) {
			case Pages.HOME.location:
				return <HomePage />
		}

		for (const groupIndex in APIPages) {
			if (groupIndex !== undefined) {
				const group = APIPages[groupIndex]
				const pageKeys = Object.keys(group.pages)

				for (const key of pageKeys) {
					if (key) {
						const page = group.pages[key]
						if (this.props.location === page.location) {
							return <APIPage example={page} html={ApiDocs[key]} />
						}
					}
				}
			}
		}

		for (const groupIndex in ExamplePages) {
			if (groupIndex !== undefined) {
				const group = ExamplePages[groupIndex]
				const pageKeys = Object.keys(group.pages)

				for (const key of pageKeys) {
					if (key) {
						const page = group.pages[key]
						const Example = Examples[key]

						if (this.props.location === page.location) {
							return (
								<ExamplePage example={page}>
									<Example />
								</ExamplePage>
							)
						}
					}
				}
			}
		}

		throw new Error(
			'Page of location ' + JSON.stringify(this.props.location) + ' not found.',
		)
	}
}
