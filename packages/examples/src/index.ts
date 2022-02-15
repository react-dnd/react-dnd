import type { ComponentClass, FunctionComponent } from 'react'
import chessboard from './00-chessboard/index'
import dustbinCopyOrMove from './01-dustbin/copy-or-move/index'
import dustbinMultipleTargets from './01-dustbin/multiple-targets/index'
import dustbinSingleTarget from './01-dustbin/single-target/index'
import dustbinSingleTargetInIframe from './01-dustbin/single-target-in-iframe/index'
import dustbinStressTest from './01-dustbin/stress-test/index'
import dragAroundCustomDragLayer from './02-drag-around/custom-drag-layer/index'
import dragAroundNaive from './02-drag-around/naive/index'
import nestingDragSources from './03-nesting/drag-sources/index'
import nestingDropTargets from './03-nesting/drop-targets/index'
import sortableCancelOnDropOutside from './04-sortable/cancel-on-drop-outside/index'
import sortableSimple from './04-sortable/simple/index'
import sortableStressTest from './04-sortable/stress-test/index'
import customizeDropEffects from './05-customize/drop-effects/index'
import customizeHandlesAndPreviews from './05-customize/handles-and-previews/index'
import otherNativeFiles from './06-other/native-files/index'
import otherNativeHtml from './06-other/native-html/index'
import dragSourceRerender from './07-regression/drag-source-rerender/index'
import remountWithCorrectProps from './07-regression/remount-with-correct-props/index'
import otherChainedConnectors from './07-regression/chained-connectors/index'
import otherPreviewsMemoryLeak from './07-regression/previews-memory-leak/index'

export const componentIndex: {
	[key: string]: ComponentClass<any> | FunctionComponent<any>
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
	'other-native-html': otherNativeHtml,
	'other-chained-connectors': otherChainedConnectors,
	'other-previews-memory-leak': otherPreviewsMemoryLeak,
}
