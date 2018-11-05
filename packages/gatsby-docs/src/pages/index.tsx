import * as React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import styled from 'styled-components'
import Layout from '../components/layout'
import Backend from 'react-dnd-html5-backend'

const IndexPage: React.SFC = () => (
	<Layout sidebar={<></>}>
		<Container>
			<DragDropContextProvider backend={Backend}>
				<div>React DnD</div>
			</DragDropContextProvider>
		</Container>
	</Layout>
)

const Container = styled.div`
	flex: 1;
	display: 'flex';
	margintop: '5rem';
`

export default IndexPage
