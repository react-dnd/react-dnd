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
	'chessboard-hooks': chessboard,
	'dustbin-single-target-hooks': dustbinSingleTarget,
	'dustbin-multiple-targets-hooks': dustbinMultipleTargets,
	'dustbin-copy-or-move-hooks': dustbinCopyOrMove,
	'dustbin-single-target-in-iframe-hooks': dustbinSingleTargetInIframe,
	'dustbin-single-target-with-fcs-hooks': dustbinSingleTargetWithFCs,
	'dustbin-stress-test-hooks': dustbinStressTest,
	'drag-around-custom-drag-layer-hooks': dragAroundCustomDragLayer,
	'drag-around-naive-hooks': dragAroundNaive,
	'nesting-drag-sources-hooks': nestingDragSources,
	'nesting-drop-targets-hooks': nestingDropTargets,
	'sortable-cancel-on-drop-outside-hooks': sortableCancelOnDropOutside,
	'sortable-simple-hooks': sortableSimple,
	'sortable-stress-test-hooks': sortableStressTest,
	'customize-drop-effects-hooks': customizeDropEffects,
	'customize-handles-and-previews-hooks': customizeHandlesAndPreviews,
	'other-native-files-hooks': otherNativeFiles,
}
