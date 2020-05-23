import React, { memo, useState, useEffect, useCallback } from 'react'
import SourceBox from './SourceBox'
import TargetBox from './TargetBox'

export const Container: React.FC = memo(function Container() {
	const [isMounted, setIsMounted] = useState(true)
	const [isDragging, setIsDragging] = useState(false)
	useEffect(
		function subscribeToIntervalTick() {
			if (!isDragging) {
				setIsMounted(true)
				return
			}
			const interval = setInterval(() => setIsMounted(!isMounted), 500)
			return () => clearInterval(interval)
		},
		[isMounted, isDragging],
	)
	const handleBeginDrag = useCallback(() => setIsDragging(true), [])
	const handleEndDrag = useCallback(() => setIsDragging(false), [])

	return (
		<>
			<div style={{ height: 100 }}>
				<div style={{ marginTop: 10 }}>
					{isMounted && (
						<SourceBox
							id="1"
							onBeginDrag={handleBeginDrag}
							onEndDrag={handleEndDrag}
						/>
					)}
				</div>
			</div>
			<div>
				<div>Target</div>
				<div style={{ marginTop: 10 }}>
					<TargetBox />
				</div>
			</div>
		</>
	)
})
