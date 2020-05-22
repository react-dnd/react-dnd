import React, { useContext, useState } from 'react'
import { DndContext, DndContextType } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export function Profiler() {
	const dndContext: DndContextType = useContext(DndContext)
	const backend = dndContext?.dragDropManager?.getBackend() as HTML5Backend
	const [key, setKey] = useState(0)

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setKey(Math.random())
		}, 100)
		return () => clearTimeout(timeout)
	})

	const profile = backend?.profile() || {}
	const profileElements = Object.keys(profile).map((key) => (
		<li key={key}>
			{key}: {profile[key]}
		</li>
	))

	return (
		<div key={key}>
			<ul>{profileElements}</ul>
		</div>
	)
}
