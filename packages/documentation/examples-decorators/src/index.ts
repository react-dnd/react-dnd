import React from 'react'
import chessboard from './00-chessboard'
import dustbinCopyOrMove from './01-dustbin/copy-or-move'
import dustbinMultipleTargets from './01-dustbin/multiple-targets'
import dustbinSingleTarget from './01-dustbin/single-target'
import dustbinSingleTargetInIframe from './01-dustbin/single-target-in-iframe'
import dustbinStressTest from './01-dustbin/stress-test'
import dragAroundCustomDragLayer from './02-drag-around/custom-drag-layer'
import dragAroundNaive from './02-drag-around/naive'
import nestingDragSources from './03-nesting/drag-sources'
import nestingDropTargets from './03-nesting/drop-targets'
import sortableCancelOnDropOutside from './04-sortable/cancel-on-drop-outside'
import sortableSimple from './04-sortable/simple'
import sortableStressTest from './04-sortable/stress-test'
import customizeDropEffects from './05-customize/drop-effects'
import customizeHandlesAndPreviews from './05-customize/handles-and-previews'
import otherNativeFiles from './06-other/native-files'
import dragSourceRerender from './07-regression/drag-source-rerender'
import remountWithCorrectProps from './07-regression/remount-with-correct-props'
import otherChainedConnectors from './07-regression/chained-connectors'

export const componentIndex: {
	[key: string]: React.ComponentClass<any> | React.FunctionComponent<any>
} = {
	chessboard,
	'dustbin-single-target': dustbinSingleTarget,
	'dustbin-multiple-targets': dustbinMultipleTargets,
	'dustbin-copy-or-move': dustbinCopyOrMove,
	'dustbin-single-target-in-iframe': dustbinSingleTargetInIframe,
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
	'other-drag-source-rerender': dragSourceRerender,
	'other-remount-with-correct-props': remountWithCorrectProps,
	'other-native-files': otherNativeFiles,
	'other-chained-connectors': otherChainedConnectors,
}
