export interface Page {
	location: string
	title: string
}

export interface PageGroup {
	title: string
	debug?: boolean
	pages: { [key: string]: Page }
}

export const Pages: { [key: string]: Page } = {
	HOME: {
		location: 'index.html',
		title: 'Home',
	},
}

export const APIPages: PageGroup[] = [
	{
		title: 'Topics',
		pages: {
			OVERVIEW: {
				location: '/docs/overview',
				title: 'Overview',
			},
			TUTORIAL: {
				location: '/docs/tutorial',
				title: 'Tutorial',
			},
			TESTING: {
				location: '/docs/testing',
				title: 'Testing',
			},
			FAQ: {
				location: '/docs/faq',
				title: 'FAQ',
			},
			TROUBLESHOOTING: {
				location: '/docs/troubleshooting',
				title: 'Troubleshooting',
			},
			EXAMPLES: {
				location: '/examples',
				title: 'Examples',
			},
		},
	},
	{
		title: 'Components',
		pages: {
			DND_PROVIDER: {
				location: '/docs/api/dnd-provider',
				title: 'DndProvider',
			},
			DRAG_PREVIEW_IMAGE: {
				location: '/docs/api/drag-preview-image',
				title: 'DragPreviewImage',
			},
		},
	},
	{
		title: 'Hooks',
		pages: {
			OVERVIEW: {
				location: '/docs/api/hooks-overview',
				title: 'Overview',
			},
			USE_DRAG: {
				location: '/docs/api/use-drag',
				title: 'useDrag',
			},
			USE_DROP: {
				location: '/docs/api/use-drop',
				title: 'useDrop',
			},
			USE_DRAG_LAYER: {
				location: '/docs/api/use-drag-layer',
				title: 'useDragLayer',
			},
			USE_DRAG_DROP_MANAGER: {
				location: '/docs/api/use-drag-drop-manager',
				title: 'useDragDropManager',
			},
		},
	},
	{
		title: 'Monitoring State',
		pages: {
			DRAG_SOURCE_MONITOR: {
				location: '/docs/api/drag-source-monitor',
				title: 'DragSourceMonitor',
			},
			DROP_TARGET_MONITOR: {
				location: '/docs/api/drop-target-monitor',
				title: 'DropTargetMonitor',
			},
			DRAG_LAYER_MONITOR: {
				location: '/docs/api/drag-layer-monitor',
				title: 'DragLayerMonitor',
			},
		},
	},
	{
		title: 'Backends',
		pages: {
			HTML5_BACKEND: {
				location: '/docs/backends/html5',
				title: 'HTML5',
			},
			TOUCH_BACKEND: {
				location: '/docs/backends/touch',
				title: 'Touch',
			},
			TEST_BACKEND: {
				location: '/docs/backends/test',
				title: 'Test',
			},
		},
	},
]

export const ExamplePages: PageGroup[] = [
	{
		title: 'Examples',
		pages: {
			ABOUT: {
				location: '/examples',
				title: 'About',
			},
			CHESSBOARD_TUTORIAL_APP: {
				location: '/examples/tutorial',
				title: 'Chessboard Tutorial',
			},
		},
	},
	{
		title: 'Dustbin',
		pages: {
			DUSTBIN_SINGLE_TARGET: {
				location: '/examples/dustbin/single-target',
				title: 'Single Target',
			},
			DUSTBIN_IFRAME: {
				location: '/examples/dustbin/iframe',
				title: 'Within an iframe',
			},
			DUSTBIN_COPY_OR_MOVE: {
				location: '/examples/dustbin/copy-or-move',
				title: 'Copy or Move',
			},
			DUSTBIN_MULTIPLE_TARGETS: {
				location: '/examples/dustbin/multiple-targets',
				title: 'Multiple Targets',
			},
			DUSTBIN_STRESS_TEST: {
				location: '/examples/dustbin/stress-test',
				title: 'Stress Test',
			},
		},
	},
	{
		title: 'Drag Around',
		pages: {
			DRAG_AROUND_NAIVE: {
				location: '/examples/drag-around/naive',
				title: 'Naive',
			},
			DRAG_AROUND_CUSTOM_DRAG_LAYER: {
				location: '/examples/drag-around/custom-drag-layer',
				title: 'Custom Drag Layer',
			},
		},
	},
	{
		title: 'Nesting',
		pages: {
			NESTING_DRAG_SOURCES: {
				location: '/examples/nesting/drag-sources',
				title: 'Drag Sources',
			},
			NESTING_DROP_TARGETS: {
				location: '/examples/nesting/drop-targets',
				title: 'Drop Targets',
			},
		},
	},
	{
		title: 'Sortable',
		pages: {
			SORTABLE_SIMPLE: {
				location: '/examples/sortable/simple',
				title: 'Simple',
			},
			SORTABLE_CANCEL_ON_DROP_OUTSIDE: {
				location: '/examples/sortable/cancel-on-drop-outside',
				title: 'Cancel on Drop Outside',
			},
			SORTABLE_STRESS_TEST: {
				location: '/examples/sortable/stress-test',
				title: 'Stress Test',
			},
		},
	},
	{
		title: 'Customize',
		pages: {
			CUSTOMIZE_HANDLES_AND_PREVIEWS: {
				location: '/examples/customize/handles-and-previews',
				title: 'Handles and Previews',
			},
			CUSTOMIZE_DROP_EFFECTS: {
				location: '/examples/customize/drop-effects',
				title: 'Drop Effects',
			},
		},
	},
	{
		title: 'Other Cases',
		pages: {
			OTHER_NATIVE_FILES: {
				location: '/examples/other/native-files',
				title: 'Native Files',
			},
			OTHER_HTML_FILES: {
				location: '/examples/other/native-html',
				title: 'Native Html',
			},
		},
	},
	{
		title: 'Regressions',
		debug: true,
		pages: {
			REGRESSION_DRAG_SOURCE_RERENDER: {
				location: '/examples/regression/drag-source-rerender',
				title: 'Drag Source Rerender',
			},
			REGRESSION_REMOUNT_WITH_CORRECT_PROPS: {
				location: '/examples/regression/remount-with-correct-props',
				title: 'Drag Source Remount',
			},

			REGRESSION_PREVIEWN_MEMORY_LEAK: {
				location: '/examples/regression/previews-memory-leak',
				title: 'Previews Memory Leak',
			},

			REGRESSION_CHAINED_CONNECTORS: {
				location: '/examples/regression/chained-connectors',
				title: 'Chained Connectors',
			},
		},
	},
]

export const DOCS_DEFAULT: Page = APIPages[0].pages.OVERVIEW
export const EXAMPLES_DEFAULT: Page = ExamplePages[0].pages
	.CHESSBOARD_TUTORIAL_APP as Page
