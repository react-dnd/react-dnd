import * as React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import StaticHTMLBlock from './StaticHTMLBlock'

import './CodeBlock.less'

let preferredSyntax = 'es7'
type Observer = (value: string) => void
const observers: Observer[] = []

const SYNTAXES: Syntax[] = ['es7', 'es6', 'es5']

function subscribe(observer: Observer) {
	observers.push(observer)
	return () => {
		observers.slice(observers.indexOf(observer), 1)
	}
}

function setPreferredSyntax(syntax: string) {
	preferredSyntax = syntax
	observers.forEach(o => o(preferredSyntax))
}

export interface CodeBlockProps {
	es5: string
	es6: string
	es7: string
}

export type Syntax = 'es5' | 'es6' | 'es7'

export interface CodeBlockState {
	chosen: boolean
	syntax: Syntax
}

export default class CodeBlock extends React.Component<
	CodeBlockProps,
	CodeBlockState
> {
	public static propTypes = {
		es5: PropTypes.string,
		es6: PropTypes.string,
		es7: PropTypes.string,
	}

	public static defaultProps = {
		es5: '',
		es6: '',
		es7: '',
	}

	private unsubscribe: (() => void) | undefined

	constructor(props: CodeBlockProps) {
		super(props)
		this.state = {
			chosen: false,
			syntax:
				(props.es7 && props.es7.trim().length && 'es7') ||
				(props.es6 && props.es6.trim().length && 'es6') ||
				(props.es5 && props.es5.trim().length && 'es5') ||
				'es5',
		}
	}

	public componentDidMount() {
		this.unsubscribe = subscribe(this.handlePreferredSyntaxChange.bind(this))
	}

	public componentWillUnmount() {
		if (this.unsubscribe) {
			this.unsubscribe()
		}
	}

	public render(): React.ReactNode {
		return (
			<div className="CodeBlock">
				<ul className="CodeBlock-tabs">
					{SYNTAXES.map(this.renderSyntaxLink, this)}
				</ul>
				<div className="CodeBlock-content">
					<StaticHTMLBlock html={this.props[this.state.syntax]} />
				</div>
			</div>
		)
	}

	private handleSyntaxClick(syntax: Syntax) {
		this.setState({
			syntax,
			chosen: true,
		})

		const thisDom = findDOMNode(this) as HTMLDivElement
		if (!thisDom) {
			return null
		}
		const scrollTopBefore = thisDom.getBoundingClientRect().top
		setPreferredSyntax(syntax)
		const scrollTopAfter = thisDom.getBoundingClientRect().top

		window.scroll(
			window.pageXOffset || window.scrollX,
			(window.pageYOffset || window.scrollY) -
				(scrollTopBefore - scrollTopAfter),
		)
	}

	private handlePreferredSyntaxChange(syntax: Syntax) {
		if (this.state.chosen || this.state.syntax === syntax) {
			return
		}

		if (this.props[syntax].trim().length) {
			this.setState({
				syntax,
			})
		}
	}

	private renderSyntaxLink(syntax: Syntax) {
		const value = this.props[syntax]
		if (!value || !value.trim().length) {
			return
		}

		if (
			syntax === 'es5' &&
			!this.props.es6.trim().length &&
			!this.props.es7.trim().length
		) {
			return
		}

		const active = this.state.syntax === syntax
		return (
			<li
				className={`CodeBlock-tab ${active ? 'CodeBlock-activeTab' : ''}`}
				key={syntax}
			>
				<a onClick={this.handleSyntaxClick.bind(this, syntax)}>
					{syntax.toUpperCase()}
				</a>
			</li>
		)
	}
}
