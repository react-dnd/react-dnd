import * as React from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import StaticHTMLBlock from './StaticHTMLBlock'
import theme from '../theme'

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
				<CodeblockTabs>
					{SYNTAXES.map(this.renderSyntaxLink, this)}
				</CodeblockTabs>
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
			<CodeblockTab key={syntax}>
				<TabLink
					active={active}
					onClick={this.handleSyntaxClick.bind(this, syntax)}
				>
					{syntax.toUpperCase()}
				</TabLink>
			</CodeblockTab>
		)
	}
}

const CodeblockTabs = styled.ul`
	padding: 0;
`

const CodeblockTab = styled.li`
	display: inline-block;
	margin-right: 10px;
`

interface TabLinkProps {
	active?: boolean
}
const TabLink = styled.a`
	cursor: pointer;
	color: ${(props: TabLinkProps) => (props.active ? theme.color.accent : '')};
`
