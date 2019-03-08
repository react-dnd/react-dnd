import React from 'react'
import chessboard from './00 Chessboard'
import dustbinCopyOrMove from './01 Dustbin/Copy or Move'
import dustbinMultipleTargets from './01 Dustbin/Multiple Targets'
import dustbinSingleTarget from './01 Dustbin/Single Target'
import dustbinSingleTargetInIframe from './01 Dustbin/Single Target in iframe'
import dustbinSingleTargetWithFCs from './01 Dustbin/Single Target with FCs'
import dustbinStressTest from './01 Dustbin/Stress Test'
import dragAroundCustomDragLayer from './02 Drag Around/Custom Drag Layer'
import dragAroundNaive from './02 Drag Around/Naive'
import nestingDragSources from './03 Nesting/Drag Sources'
import nestingDropTargets from './03 Nesting/Drop Targets'
import sortableCancelOnDropOutside from './04 Sortable/Cancel on Drop Outside'
import sortableSimple from './04 Sortable/Simple'
import sortableStressTest from './04 Sortable/Stress Test'
import customizeDropEffects from './05 Customize/Drop Effects'
import customizeHandlesAndPreviews from './05 Customize/Handles and Previews'
import otherNativeFiles from './06 Other/Native Files'

export * from './isDebugMode'
export const componentIndex: {
	[key: string]: React.ComponentClass<any> | React.FunctionComponent<any>
} = {
	chessboard,
	'dustbin-single-target': dustbinSingleTarget,
	'dustbin-multiple-targets': dustbinMultipleTargets,
	'dustbin-copy-or-move': dustbinCopyOrMove,
	'dustbin-single-target-in-iframe': dustbinSingleTargetInIframe,
	'dustbin-single-target-with-fcs': dustbinSingleTargetWithFCs,
	'dustbin-stress-test': dustbinStressTest,
	'drag-around-custom-drag-layer': dragAroundCustomDragLayer,
	'drag-around-naive': dragAroundNaive,
	'nesting-drag-sources': nestingDragSources,
	'nesting-drop-targets': nestingDropTargets,
	'sortable-cancel-on-drop-outside': sortableCancelOnDropOutside,
	'sortable-simple': sortableSimple,
	'sortable-stress-test': sortableStressTest,
	'customize-drop-effects': customizeDropEffects,
	'customize-handles-and-previews': customizeHandlesAndPreviews,
	'other-native-files': otherNativeFiles,
}
