const Examples: { [key: string]: any } = {
	CHESSBOARD_TUTORIAL_APP: require('../examples/00 Chessboard/Tutorial App')
		.default,
	DUSTBIN_SINGLE_TARGET: require('../examples/01 Dustbin/Single Target')
		.default,
	DUSTBIN_IFRAME: require('../examples/01 Dustbin/Single Target in iframe')
		.default,
	DUSTBIN_SFC: require('../examples/01 Dustbin/Single Target with SFCs')
		.default,
	DUSTBIN_COPY_OR_MOVE: require('../examples/01 Dustbin/Copy or Move').default,
	DUSTBIN_MULTIPLE_TARGETS: require('../examples/01 Dustbin/Multiple Targets')
		.default,

	DUSTBIN_STRESS_TEST: require('../examples/01 Dustbin/Stress Test').default,
	DRAG_AROUND_NAIVE: require('../examples/02 Drag Around/Naive').default,
	DRAG_AROUND_CUSTOM_DRAG_LAYER: require('../examples/02 Drag Around/Custom Drag Layer')
		.default,
	NESTING_DRAG_SOURCES: require('../examples/03 Nesting/Drag Sources').default,
	NESTING_DROP_TARGETS: require('../examples/03 Nesting/Drop Targets').default,
	SORTABLE_SIMPLE: require('../examples/04 Sortable/Simple').default,
	SORTABLE_CANCEL_ON_DROP_OUTSIDE: require('../examples/04 Sortable/Cancel on Drop Outside')
		.default,
	SORTABLE_STRESS_TEST: require('../examples/04 Sortable/Stress Test').default,
	CUSTOMIZE_HANDLES_AND_PREVIEWS: require('../examples/05 Customize/Handles and Previews')
		.default,
	CUSTOMIZE_DROP_EFFECTS: require('../examples/05 Customize/Drop Effects')
		.default,
	OTHER_NATIVE_FILES: require('../examples/06 Other/Native Files').default,
}
export default Examples
