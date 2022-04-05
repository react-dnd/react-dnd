import type { ComponentClass, FunctionComponent } from 'react'

import chessboard from './00-chessboard/index.js'
import dustbinCopyOrMove from './01-dustbin/copy-or-move/index.js'
import dustbinMultipleTargets from './01-dustbin/multiple-targets/index.js'
import dustbinSingleTarget from './01-dustbin/single-target/index.js'
import dustbinSingleTargetInIframe from './01-dustbin/single-target-in-iframe/index.js'
import dustbinStressTest from './01-dustbin/stress-test/index.js'
import dragAroundCustomDragLayer from './02-drag-around/custom-drag-layer/index.js'
import dragAroundNaive from './02-drag-around/naive/index.js'
import nestingDragSources from './03-nesting/drag-sources/index.js'
import nestingDropTargets from './03-nesting/drop-targets/index.js'
import sortableCancelOnDropOutside from './04-sortable/cancel-on-drop-outside/index.js'
import sortableSimple from './04-sortable/simple/index.js'
import sortableStressTest from './04-sortable/stress-test/index.js'
import customizeDropEffects from './05-customize/drop-effects/index.js'
import customizeHandlesAndPreviews from './05-customize/handles-and-previews/index.js'
import otherNativeFiles from './06-other/native-files/index.js'
import otherNativeHtml from './06-other/native-html/index.js'
import otherChainedConnectors from './07-regression/chained-connectors/index.js'
import dragSourceRerender from './07-regression/drag-source-rerender/index.js'
import otherPreviewsMemoryLeak from './07-regression/previews-memory-leak/index.js'
import remountWithCorrectProps from './07-regression/remount-with-correct-props/index.js'

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
