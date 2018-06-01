import React from 'react'
import IndexPage from './IndexPage'

export default function renderPath(path: string, props: any, onRender: any) {
	onRender(IndexPage.renderToString(props))
}
