import React, { useState, useEffect } from 'react'
import Container from './Container'

export interface SortableStressTestState {
	shouldRender: boolean
}

const SortableStressTest: React.FC = () => {
	// Avoid rendering on server because the big data list is generated
	const [shouldRender, setShouldRender] = useState(false)
	useEffect(() => setShouldRender(true))
	return <>{shouldRender && <Container />}</>
}

export default SortableStressTest
