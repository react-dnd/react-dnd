import React from 'react'

const styles: React.CSSProperties = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

export interface BoxProps {
	title: string
	yellow?: boolean
}

const Box: React.FC<BoxProps> = ({ title, yellow }) => {
	const backgroundColor = yellow ? 'yellow' : 'white'
	return <div style={{ ...styles, backgroundColor }}>{title}</div>
}

export default Box
