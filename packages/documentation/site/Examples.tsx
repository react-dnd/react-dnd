import * as React from 'react'

const Examples: { [key: string]: any } = {
	CHESSBOARD_TUTORIAL_APP: (React as any).lazy(() =>
		import('../examples/00 Chessboard/Tutorial App'),
	),
	DUSTBIN_SINGLE_TARGET: (React as any).lazy(() =>
		import('../examples/01 Dustbin/Single Target'),
	),
	DUSTBIN_IFRAME: (React as any).lazy(() =>
		import('../examples/01 Dustbin/Single Target in iframe'),
	),
	DUSTBIN_SFC: (React as any).lazy(() =>
		import('../examples/01 Dustbin/Single Target with SFCs'),
	),
	DUSTBIN_COPY_OR_MOVE: (React as any).lazy(() =>
		import('../examples/01 Dustbin/Copy or Move'),
	),
	DUSTBIN_MULTIPLE_TARGETS: (React as any).lazy(() =>
		import('../examples/01 Dustbin/Multiple Targets'),
	),

	DUSTBIN_STRESS_TEST: (React as any).lazy(() =>
		import('../examples/01 Dustbin/Stress Test'),
	),
	DRAG_AROUND_NAIVE: (React as any).lazy(() =>
		import('../examples/02 Drag Around/Naive'),
	),
	DRAG_AROUND_CUSTOM_DRAG_LAYER: (React as any).lazy(() =>
		import('../examples/02 Drag Around/Custom Drag Layer'),
	),
	NESTING_DRAG_SOURCES: (React as any).lazy(() =>
		import('../examples/03 Nesting/Drag Sources'),
	),
	NESTING_DROP_TARGETS: (React as any).lazy(() =>
		import('../examples/03 Nesting/Drop Targets'),
	),
	SORTABLE_SIMPLE: (React as any).lazy(() =>
		import('../examples/04 Sortable/Simple'),
	),
	SORTABLE_CANCEL_ON_DROP_OUTSIDE: (React as any).lazy(() =>
		import('../examples/04 Sortable/Cancel on Drop Outside'),
	),
	SORTABLE_STRESS_TEST: (React as any).lazy(() =>
		import('../examples/04 Sortable/Stress Test'),
	),
	CUSTOMIZE_HANDLES_AND_PREVIEWS: (React as any).lazy(() =>
		import('../examples/05 Customize/Handles and Previews'),
	),
	CUSTOMIZE_DROP_EFFECTS: (React as any).lazy(() =>
		import('../examples/05 Customize/Drop Effects'),
	),
	OTHER_NATIVE_FILES: (React as any).lazy(() =>
		import('../examples/06 Other/Native Files'),
	),
}
export default Examples
