import createTestBackend, { TestBackend } from 'react-dnd-test-backend'
import * as Types from './types'
import { NormalSource, NonDraggableSource, NumberSource } from './sources'
import {
	NormalTarget,
	NonDroppableTarget,
	TargetWithNoDropResult,
} from './targets'
import {
	DragDropManager,
	HandlerRegistry,
	DragDropMonitor,
} from '../interfaces'
import DragDropManagerImpl from '../DragDropManagerImpl'

describe.only('DragDropMonitor', () => {
	let manager: DragDropManager<any>
	let backend: TestBackend
	let registry: HandlerRegistry
	let monitor: DragDropMonitor

	beforeEach(() => {
		manager = new DragDropManagerImpl(createTestBackend as any)
		backend = (manager.getBackend() as any) as TestBackend
		registry = manager.getRegistry()
		monitor = manager.getMonitor()
	})

	describe('state change subscription', () => {
		it('throws on bad listener', () => {
			expect(() => monitor.subscribeToStateChange(() => { /* empty */ })).not.toThrow()

			expect(() => (monitor as any).subscribeToStateChange()).toThrow()
			expect(() => (monitor as any).subscribeToStateChange(42)).toThrow()
			expect(() => (monitor as any).subscribeToStateChange('hi')).toThrow()
			expect(() => (monitor as any).subscribeToStateChange({})).toThrow()
		})

		it('throws on bad handlerIds', () => {
			expect(() =>
				monitor.subscribeToStateChange(() => {/* empty */}, { handlerIds: [] }),
			).not.toThrow()
			expect(() =>
				monitor.subscribeToStateChange(() => {/* empty */}, { handlerIds: ['hi'] }),
			).not.toThrow()
			expect(() =>
				monitor.subscribeToStateChange(() => {/* empty */}, { handlerIds: {} as any}),
			).toThrow()
			expect(() =>
				monitor.subscribeToStateChange(() => {/* empty */}, { handlerIds: (() => {/* empty */}) as any }),
			).toThrow()
		})

		it('allows to unsubscribe', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)

			let raisedChange = false
			const unsubscribe = monitor.subscribeToStateChange(() => {
				raisedChange = true
			})

			unsubscribe()
			expect(unsubscribe).not.toThrow()

			backend.simulateBeginDrag([sourceId])
			expect(raisedChange).toEqual(false)
		})

		it('raises global change event on beginDrag()', done => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)

			monitor.subscribeToStateChange(done)
			backend.simulateBeginDrag([sourceId])
		})

		it('raises global change event on beginDrag() even if a subscriber causes other changes', done => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()

			let notified = false
			monitor.subscribeToStateChange(() => {
				if (!notified) {
					notified = true
					registry.addTarget(Types.FOO, target)
				}
			})

			monitor.subscribeToStateChange(done)
			backend.simulateBeginDrag([sourceId])
		})

		it('raises local change event on sources and targets in beginDrag()', () => {
			const sourceA = new NormalSource()
			const sourceAId = registry.addSource(Types.FOO, sourceA)
			const sourceB = new NormalSource()
			const sourceBId = registry.addSource(Types.FOO, sourceB)
			const targetA = new NormalTarget()
			const targetAId = registry.addTarget(Types.FOO, targetA)

			let raisedChangeForSourceA = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceA = true
				},
				{
					handlerIds: [sourceAId],
				},
			)

			let raisedChangeForSourceB = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceB = true
				},
				{
					handlerIds: [sourceBId],
				},
			)

			let raisedChangeForSourceAAndB = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceAAndB = true
				},
				{
					handlerIds: [sourceAId, sourceBId],
				},
			)

			let raisedChangeForTargetA = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetA = true
				},
				{
					handlerIds: [targetAId],
				},
			)

			backend.simulateBeginDrag([sourceAId])
			expect(raisedChangeForSourceA).toEqual(true)
			expect(raisedChangeForSourceB).toEqual(true)
			expect(raisedChangeForSourceAAndB).toEqual(true)
			expect(raisedChangeForTargetA).toEqual(true)
		})

		it('raises local change event on sources and targets in endDrag()', () => {
			const sourceA = new NormalSource()
			const sourceAId = registry.addSource(Types.FOO, sourceA)
			const sourceB = new NormalSource()
			const sourceBId = registry.addSource(Types.FOO, sourceB)
			const targetA = new NormalTarget()
			const targetAId = registry.addTarget(Types.FOO, targetA)

			backend.simulateBeginDrag([sourceAId])

			let raisedChangeForSourceA = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceA = true
				},
				{
					handlerIds: [sourceAId],
				},
			)

			let raisedChangeForSourceB = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceB = true
				},
				{
					handlerIds: [sourceBId],
				},
			)

			let raisedChangeForSourceAAndB = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceAAndB = true
				},
				{
					handlerIds: [sourceAId, sourceBId],
				},
			)

			let raisedChangeForTargetA = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetA = true
				},
				{
					handlerIds: [targetAId],
				},
			)

			backend.simulateEndDrag()
			expect(raisedChangeForSourceA).toEqual(true)
			expect(raisedChangeForSourceB).toEqual(true)
			expect(raisedChangeForSourceAAndB).toEqual(true)
			expect(raisedChangeForTargetA).toEqual(true)
		})

		it('raises local change event on sources and targets in drop()', () => {
			const sourceA = new NormalSource()
			const sourceAId = registry.addSource(Types.FOO, sourceA)
			const sourceB = new NormalSource()
			const sourceBId = registry.addSource(Types.FOO, sourceB)
			const targetA = new NormalTarget()
			const targetAId = registry.addTarget(Types.FOO, targetA)

			backend.simulateBeginDrag([sourceAId])
			backend.simulateHover([targetAId])

			let raisedChangeForSourceA = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceA = true
				},
				{
					handlerIds: [sourceAId],
				},
			)

			let raisedChangeForSourceB = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceB = true
				},
				{
					handlerIds: [sourceBId],
				},
			)

			let raisedChangeForSourceAAndB = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceAAndB = true
				},
				{
					handlerIds: [sourceAId, sourceBId],
				},
			)

			let raisedChangeForTargetA = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetA = true
				},
				{
					handlerIds: [targetAId],
				},
			)

			backend.simulateDrop()
			expect(raisedChangeForSourceA).toEqual(true)
			expect(raisedChangeForSourceB).toEqual(true)
			expect(raisedChangeForSourceAAndB).toEqual(true)
			expect(raisedChangeForTargetA).toEqual(true)
		})

		it('raises local change event only on previous and next targets in hover()', () => {
			const sourceA = new NormalSource()
			const sourceAId = registry.addSource(Types.FOO, sourceA)
			const sourceB = new NormalSource()
			const sourceBId = registry.addSource(Types.FOO, sourceB)
			const targetA = new NormalTarget()
			const targetAId = registry.addTarget(Types.FOO, targetA)
			const targetB = new NormalTarget()
			const targetBId = registry.addTarget(Types.FOO, targetB)
			const targetC = new NormalTarget()
			const targetCId = registry.addTarget(Types.FOO, targetC)
			const targetD = new NormalTarget()
			const targetDId = registry.addTarget(Types.FOO, targetD)
			const targetE = new NormalTarget()
			const targetEId = registry.addTarget(Types.FOO, targetE)

			backend.simulateBeginDrag([sourceAId])
			backend.simulateHover([targetAId, targetBId])

			let raisedChangeForSourceA = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceA = true
				},
				{
					handlerIds: [sourceAId],
				},
			)

			let raisedChangeForSourceB = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceB = true
				},
				{
					handlerIds: [sourceBId],
				},
			)

			let raisedChangeForTargetA = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetA = true
				},
				{
					handlerIds: [targetAId],
				},
			)

			let raisedChangeForTargetB = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetB = true
				},
				{
					handlerIds: [targetBId],
				},
			)

			let raisedChangeForTargetC = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetC = true
				},
				{
					handlerIds: [targetCId],
				},
			)

			let raisedChangeForTargetD = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetD = true
				},
				{
					handlerIds: [targetDId],
				},
			)

			let raisedChangeForTargetE = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetE = true
				},
				{
					handlerIds: [targetEId],
				},
			)

			let raisedChangeForSourceBAndTargetC = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceBAndTargetC = true
				},
				{
					handlerIds: [sourceBId, targetCId],
				},
			)

			let raisedChangeForSourceBAndTargetE = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForSourceBAndTargetE = true
				},
				{
					handlerIds: [sourceBId, targetEId],
				},
			)

			backend.simulateHover([targetDId, targetEId])
			expect(raisedChangeForSourceA).toEqual(false)
			expect(raisedChangeForSourceB).toEqual(false)
			expect(raisedChangeForTargetA).toEqual(true)
			expect(raisedChangeForTargetB).toEqual(true)
			expect(raisedChangeForTargetC).toEqual(false)
			expect(raisedChangeForTargetD).toEqual(true)
			expect(raisedChangeForTargetE).toEqual(true)
			expect(raisedChangeForSourceBAndTargetC).toEqual(false)
			expect(raisedChangeForSourceBAndTargetE).toEqual(true)
		})

		it('raises local change event when target stops being or becomes innermost in hover()', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const targetA = new NormalTarget()
			const targetAId = registry.addTarget(Types.FOO, targetA)
			const targetB = new NormalTarget()
			const targetBId = registry.addTarget(Types.FOO, targetB)
			const targetC = new NormalTarget()
			const targetCId = registry.addTarget(Types.FOO, targetC)
			const targetD = new NormalTarget()
			const targetDId = registry.addTarget(Types.FOO, targetD)

			backend.simulateBeginDrag([sourceId])
			backend.simulateHover([targetAId, targetBId, targetCId, targetDId])

			let raisedChangeForTargetA = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetA = true
				},
				{
					handlerIds: [targetAId],
				},
			)

			let raisedChangeForTargetB = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetB = true
				},
				{
					handlerIds: [targetBId],
				},
			)

			let raisedChangeForTargetC = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetC = true
				},
				{
					handlerIds: [targetCId],
				},
			)

			let raisedChangeForTargetD = false
			monitor.subscribeToStateChange(
				() => {
					raisedChangeForTargetD = true
				},
				{
					handlerIds: [targetDId],
				},
			)

			backend.simulateHover([targetAId, targetBId, targetCId])
			expect(raisedChangeForTargetA).toEqual(false)
			expect(raisedChangeForTargetB).toEqual(false)
			expect(raisedChangeForTargetC).toEqual(true)
			expect(raisedChangeForTargetD).toEqual(true)

			raisedChangeForTargetA = false
			raisedChangeForTargetB = false
			raisedChangeForTargetC = false
			raisedChangeForTargetD = false
			backend.simulateHover([targetAId, targetBId, targetCId, targetDId])
			expect(raisedChangeForTargetA).toEqual(false)
			expect(raisedChangeForTargetB).toEqual(false)
			expect(raisedChangeForTargetC).toEqual(true)
			expect(raisedChangeForTargetD).toEqual(true)

			raisedChangeForTargetA = false
			raisedChangeForTargetB = false
			raisedChangeForTargetC = false
			raisedChangeForTargetD = false
			backend.simulateHover([targetAId])
			expect(raisedChangeForTargetA).toEqual(true)
			expect(raisedChangeForTargetB).toEqual(true)
			expect(raisedChangeForTargetC).toEqual(true)
			expect(raisedChangeForTargetD).toEqual(true)

			raisedChangeForTargetA = false
			raisedChangeForTargetB = false
			raisedChangeForTargetC = false
			raisedChangeForTargetD = false
			backend.simulateHover([targetAId, targetBId])
			expect(raisedChangeForTargetA).toEqual(true)
			expect(raisedChangeForTargetB).toEqual(true)
			expect(raisedChangeForTargetC).toEqual(false)
			expect(raisedChangeForTargetD).toEqual(false)
		})

		it('raises global change event on endDrag()', done => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			registry.addTarget(Types.FOO, target)

			backend.simulateBeginDrag([sourceId])
			monitor.subscribeToStateChange(done)
			backend.simulateEndDrag()
		})

		it('raises global change event on drop()', done => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			backend.simulateBeginDrag([sourceId])
			backend.simulateHover([targetId])

			monitor.subscribeToStateChange(done)
			backend.simulateDrop()
		})

		it('does not raise global change event if hover targets have not changed', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const targetA = new NormalTarget({ a: 123 })
			const targetAId = registry.addTarget(Types.FOO, targetA)
			const targetB = new TargetWithNoDropResult()
			const targetBId = registry.addTarget(Types.FOO, targetB)

			let raisedChange = false
			monitor.subscribeToStateChange(() => {
				raisedChange = true
			})

			backend.simulateBeginDrag([sourceId])
			expect(raisedChange).toEqual(true)
			raisedChange = false

			backend.simulateHover([targetAId])
			expect(raisedChange).toEqual(true)
			raisedChange = false

			backend.simulateHover([targetBId])
			expect(raisedChange).toEqual(true)
			raisedChange = false

			backend.simulateHover([targetBId])
			expect(raisedChange).toEqual(false)

			backend.simulateHover([targetBId, targetAId])
			expect(raisedChange).toEqual(true)
			raisedChange = false

			backend.simulateHover([targetBId, targetAId])
			expect(raisedChange).toEqual(false)

			backend.simulateHover([targetAId, targetBId])
			expect(raisedChange).toEqual(true)
			raisedChange = false

			backend.simulateHover([targetAId, targetBId])
			expect(raisedChange).toEqual(false)
		})
	})

	describe('offset change subscription', () => {
		it('throws on bad listener', () => {
			expect(() => monitor.subscribeToOffsetChange(() => {/* empty */})).not.toThrow()
			expect(() => (monitor as any).subscribeToOffsetChange()).toThrow()
			expect(() => (monitor as any).subscribeToOffsetChange(42)).toThrow()
			expect(() => (monitor as any).subscribeToOffsetChange('hi')).toThrow()
			expect(() => (monitor as any).subscribeToOffsetChange({})).toThrow()
		})

		it('allows to unsubscribe', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)

			let raisedChange = false
			const unsubscribe = monitor.subscribeToOffsetChange(() => {
				raisedChange = true
			})

			unsubscribe()
			expect(unsubscribe).not.toThrow()

			backend.simulateBeginDrag([sourceId], {
				clientOffset: { x: 0, y: 0 },
				getSourceClientOffset: () => ({ x: 0, y: 0 }),
			})
			expect(raisedChange).toEqual(false)
		})

		it('throws when passing clientOffset without getSourceClientOffset', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)

			expect(() =>
				backend.simulateBeginDrag([sourceId], {
					clientOffset: { x: 0, y: 0 },
				}),
			).toThrow()

			expect(() =>
				backend.simulateBeginDrag([sourceId], {
					clientOffset: { x: 0, y: 0 },
					getSourceClientOffset: { x: 0, y: 0 },
				}),
			).toThrow()

			expect(() =>
				backend.simulateBeginDrag([sourceId], {
					clientOffset: { x: 0, y: 0 },
					getSourceClientOffset: () => ({ x: 0, y: 0 }),
				}),
			).not.toThrow()
		})

		it('sets source client offset from the innermost draggable source', () => {
			const sourceA = new NonDraggableSource()
			const sourceAId = registry.addSource(Types.FOO, sourceA)
			const sourceB = new NormalSource()
			const sourceBId = registry.addSource(Types.FOO, sourceB)
			const sourceC = new NormalSource()
			const sourceCId = registry.addSource(Types.FOO, sourceC)
			const sourceD = new NonDraggableSource()
			const sourceDId = registry.addSource(Types.FOO, sourceD)

			backend.simulateBeginDrag([sourceAId, sourceBId, sourceCId, sourceDId], {
				clientOffset: { x: 0, y: 0 },
				getSourceClientOffset: (sourceId: string) =>
					sourceId === sourceCId ? { x: 42, y: 0 } : { x: 0, y: 0 },
			})

			expect(monitor.getInitialSourceClientOffset()).toEqual({ x: 42, y: 0 })
		})

		it('keeps track of offsets', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateBeginDrag([sourceId], {
				clientOffset: { x: 50, y: 40 },
				getSourceClientOffset: () => ({ x: 20, y: 10 }),
			})
			expect(monitor.getInitialSourceClientOffset()).toEqual({ x: 20, y: 10 })
			expect(monitor.getInitialClientOffset()).toEqual({ x: 50, y: 40 })
			expect(monitor.getClientOffset()).toEqual({ x: 50, y: 40 })
			expect(monitor.getSourceClientOffset()).toEqual({ x: 20, y: 10 })
			expect(monitor.getDifferenceFromInitialOffset()).toEqual({ x: 0, y: 0 })

			backend.simulateHover([targetId], {
				clientOffset: { x: 60, y: 70 },
			})
			expect(monitor.getInitialSourceClientOffset()).toEqual({ x: 20, y: 10 })
			expect(monitor.getInitialClientOffset()).toEqual({ x: 50, y: 40 })
			expect(monitor.getClientOffset()).toEqual({ x: 60, y: 70 })
			expect(monitor.getSourceClientOffset()).toEqual({ x: 30, y: 40 })
			expect(monitor.getDifferenceFromInitialOffset()).toEqual({ x: 10, y: 30 })

			backend.simulateHover([targetId], {
				clientOffset: { x: 0, y: 0 },
			})
			expect(monitor.getInitialSourceClientOffset()).toEqual({ x: 20, y: 10 })
			expect(monitor.getInitialClientOffset()).toEqual({ x: 50, y: 40 })
			expect(monitor.getClientOffset()).toEqual({ x: 0, y: 0 })
			expect(monitor.getSourceClientOffset()).toEqual({ x: -30, y: -30 })
			expect(monitor.getDifferenceFromInitialOffset()).toEqual({
				x: -50,
				y: -40,
			})

			backend.simulateDrop()
			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateEndDrag()
			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateBeginDrag([sourceId], {
				clientOffset: { x: 50, y: 40 },
				getSourceClientOffset: () => ({ x: 20, y: 10 }),
			})
			expect(monitor.getInitialSourceClientOffset()).toEqual({ x: 20, y: 10 })
			expect(monitor.getInitialClientOffset()).toEqual({ x: 50, y: 40 })
			expect(monitor.getClientOffset()).toEqual({ x: 50, y: 40 })
			expect(monitor.getSourceClientOffset()).toEqual({ x: 20, y: 10 })
			expect(monitor.getDifferenceFromInitialOffset()).toEqual({ x: 0, y: 0 })

			backend.simulateEndDrag()
			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)
		})

		it('keeps track of offsets when initial offset is not specified', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateBeginDrag([sourceId])
			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateHover([targetId], {
				clientOffset: { x: 60, y: 70 },
			})
			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual({ x: 60, y: 70 })
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateHover([targetId])
			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateHover([targetId], {
				clientOffset: { x: 60, y: 70 },
			})
			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual({ x: 60, y: 70 })
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateDrop()
			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateEndDrag()
			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)
		})

		it('keeps track of offsets when current offset is not specified', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateBeginDrag([sourceId], {
				clientOffset: { x: 50, y: 40 },
				getSourceClientOffset: () => ({ x: 20, y: 10 }),
			})
			expect(monitor.getInitialSourceClientOffset()).toEqual({ x: 20, y: 10 })
			expect(monitor.getInitialClientOffset()).toEqual({ x: 50, y: 40 })
			expect(monitor.getClientOffset()).toEqual({ x: 50, y: 40 })
			expect(monitor.getSourceClientOffset()).toEqual({ x: 20, y: 10 })
			expect(monitor.getDifferenceFromInitialOffset()).toEqual({ x: 0, y: 0 })

			backend.simulateHover([targetId])
			expect(monitor.getInitialSourceClientOffset()).toEqual({ x: 20, y: 10 })
			expect(monitor.getInitialClientOffset()).toEqual({ x: 50, y: 40 })
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateHover([targetId], {
				clientOffset: { x: 60, y: 70 },
			})
			expect(monitor.getInitialSourceClientOffset()).toEqual({ x: 20, y: 10 })
			expect(monitor.getInitialClientOffset()).toEqual({ x: 50, y: 40 })
			expect(monitor.getClientOffset()).toEqual({ x: 60, y: 70 })
			expect(monitor.getSourceClientOffset()).toEqual({ x: 30, y: 40 })
			expect(monitor.getDifferenceFromInitialOffset()).toEqual({ x: 10, y: 30 })

			backend.simulateDrop()
			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)

			backend.simulateEndDrag()
			expect(monitor.getInitialSourceClientOffset()).toEqual(null)
			expect(monitor.getInitialClientOffset()).toEqual(null)
			expect(monitor.getClientOffset()).toEqual(null)
			expect(monitor.getSourceClientOffset()).toEqual(null)
			expect(monitor.getDifferenceFromInitialOffset()).toEqual(null)
		})

		it('raises offset change event on beginDrag()', done => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)

			monitor.subscribeToOffsetChange(done)
			backend.simulateBeginDrag([sourceId], {
				clientOffset: { x: 0, y: 0 },
				getSourceClientOffset: () => ({ x: 0, y: 0 }),
			})
		})

		it('raises offset change event on hover() if clientOffset changed', done => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			backend.simulateBeginDrag([sourceId], {
				clientOffset: { x: 10, y: 10 },
				getSourceClientOffset: () => ({ x: 0, y: 0 }),
			})

			monitor.subscribeToOffsetChange(done)
			backend.simulateHover([targetId], {
				clientOffset: { x: 20, y: 10 },
			})
		})

		it('does not raise offset change event on hover() when not tracking offset', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			backend.simulateBeginDrag([sourceId])

			let raisedChange = false
			monitor.subscribeToOffsetChange(() => {
				raisedChange = true
			})

			backend.simulateHover([targetId])
			expect(raisedChange).toEqual(false)
		})

		it('does not raise offset change event on hover() when clientOffset has not changed', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			backend.simulateBeginDrag([sourceId], {
				clientOffset: { x: 100, y: 200 },
				getSourceClientOffset: () => ({ x: 0, y: 0 }),
			})

			let raisedChange = false
			monitor.subscribeToOffsetChange(() => {
				raisedChange = true
			})

			backend.simulateHover([targetId], {
				clientOffset: { x: 100, y: 200 },
			})
			expect(raisedChange).toEqual(false)
			backend.simulateHover([], {
				clientOffset: { x: 100, y: 200 },
			})
			expect(raisedChange).toEqual(false)
			backend.simulateHover([targetId], {
				clientOffset: { x: 101, y: 200 },
			})
			expect(raisedChange).toEqual(true)
		})

		it('raises offset change event on endDrag()', done => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			registry.addTarget(Types.FOO, target)

			backend.simulateBeginDrag([sourceId])
			monitor.subscribeToOffsetChange(done)
			backend.simulateEndDrag()
		})

		it('raises offset change event on drop()', done => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			backend.simulateBeginDrag([sourceId])
			backend.simulateHover([targetId])

			monitor.subscribeToOffsetChange(done)
			backend.simulateDrop()
		})
	})

	describe('state tracking', () => {
		it('returns true from canDrag unless already dragging or drag source opts out', () => {
			const sourceA = new NormalSource()
			const sourceAId = registry.addSource(Types.FOO, sourceA)
			const sourceB = new NormalSource()
			const sourceBId = registry.addSource(Types.FOO, sourceB)
			const sourceC = new NormalSource()
			const sourceCId = registry.addSource(Types.BAR, sourceC)
			const sourceD = new NonDraggableSource()
			const sourceDId = registry.addSource(Types.FOO, sourceD)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			expect(monitor.canDragSource(sourceAId)).toEqual(true)
			expect(monitor.canDragSource(sourceBId)).toEqual(true)
			expect(monitor.canDragSource(sourceCId)).toEqual(true)
			expect(monitor.canDragSource(sourceDId)).toEqual(false)

			backend.simulateBeginDrag([sourceAId])
			expect(monitor.canDragSource(sourceAId)).toEqual(false)
			expect(monitor.canDragSource(sourceBId)).toEqual(false)
			expect(monitor.canDragSource(sourceCId)).toEqual(false)
			expect(monitor.canDragSource(sourceDId)).toEqual(false)

			backend.simulateHover([targetId])
			backend.simulateDrop()
			expect(monitor.canDragSource(sourceAId)).toEqual(false)
			expect(monitor.canDragSource(sourceBId)).toEqual(false)
			expect(monitor.canDragSource(sourceCId)).toEqual(false)
			expect(monitor.canDragSource(sourceDId)).toEqual(false)

			backend.simulateEndDrag()
			expect(monitor.canDragSource(sourceAId)).toEqual(true)
			expect(monitor.canDragSource(sourceBId)).toEqual(true)
			expect(monitor.canDragSource(sourceCId)).toEqual(true)
			expect(monitor.canDragSource(sourceDId)).toEqual(false)

			backend.simulateBeginDrag([sourceAId])
			expect(monitor.canDragSource(sourceAId)).toEqual(false)
			expect(monitor.canDragSource(sourceBId)).toEqual(false)
			expect(monitor.canDragSource(sourceCId)).toEqual(false)
			expect(monitor.canDragSource(sourceDId)).toEqual(false)
		})

		it('returns true from canDrop if dragging and type matches, unless target opts out', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const targetA = new NormalTarget()
			const targetAId = registry.addTarget(Types.FOO, targetA)
			const targetB = new NormalTarget()
			const targetBId = registry.addTarget(Types.FOO, targetB)
			const targetC = new NormalTarget()
			const targetCId = registry.addTarget(Types.BAR, targetC)
			const targetD = new NonDroppableTarget()
			const targetDId = registry.addTarget(Types.FOO, targetD)

			expect(monitor.canDropOnTarget(targetAId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetDId)).toEqual(false)

			backend.simulateBeginDrag([sourceId])
			expect(monitor.canDropOnTarget(targetAId)).toEqual(true)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(true)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetDId)).toEqual(false)

			backend.simulateHover([targetAId])
			backend.simulateDrop()
			expect(monitor.canDropOnTarget(targetAId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetDId)).toEqual(false)

			backend.simulateEndDrag()
			expect(monitor.canDropOnTarget(targetAId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetDId)).toEqual(false)

			backend.simulateBeginDrag([sourceId])
			expect(monitor.canDropOnTarget(targetAId)).toEqual(true)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(true)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetDId)).toEqual(false)
		})

		it('treats symbol types just like string types', () => {
			const FooType = Symbol('foo')
			const BarType = Symbol('bar')

			const source = new NormalSource()
			const sourceId = registry.addSource(FooType, source)
			const targetA = new NormalTarget()
			const targetAId = registry.addTarget(FooType, targetA)
			const targetB = new NormalTarget()
			const targetBId = registry.addTarget(FooType, targetB)
			const targetC = new NormalTarget()
			const targetCId = registry.addTarget(BarType, targetC)
			const targetD = new NonDroppableTarget()
			const targetDId = registry.addTarget(FooType, targetD)

			expect(monitor.canDropOnTarget(targetAId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetDId)).toEqual(false)

			backend.simulateBeginDrag([sourceId])
			expect(monitor.canDropOnTarget(targetAId)).toEqual(true)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(true)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetDId)).toEqual(false)

			backend.simulateHover([targetAId])
			backend.simulateDrop()
			expect(monitor.canDropOnTarget(targetAId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetDId)).toEqual(false)

			backend.simulateEndDrag()
			expect(monitor.canDropOnTarget(targetAId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetDId)).toEqual(false)

			backend.simulateBeginDrag([sourceId])
			expect(monitor.canDropOnTarget(targetAId)).toEqual(true)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(true)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetDId)).toEqual(false)
		})

		it('returns true from isDragging only while dragging', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const other = new NormalSource()
			const otherId = registry.addSource(Types.FOO, other)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			expect(monitor.isDragging()).toEqual(false)
			expect(monitor.isDraggingSource(sourceId)).toEqual(false)
			expect(monitor.isDraggingSource(otherId)).toEqual(false)

			backend.simulateBeginDrag([sourceId])
			expect(monitor.isDragging()).toEqual(true)
			expect(monitor.isDraggingSource(sourceId)).toEqual(true)
			expect(monitor.isDraggingSource(otherId)).toEqual(false)

			backend.simulateHover([targetId])
			backend.simulateDrop()
			expect(monitor.isDragging()).toEqual(true)
			expect(monitor.isDraggingSource(sourceId)).toEqual(true)
			expect(monitor.isDraggingSource(otherId)).toEqual(false)

			backend.simulateEndDrag()
			expect(monitor.isDragging()).toEqual(false)
			expect(monitor.isDraggingSource(sourceId)).toEqual(false)
			expect(monitor.isDraggingSource(otherId)).toEqual(false)

			backend.simulateBeginDrag([otherId])
			expect(monitor.isDragging()).toEqual(true)
			expect(monitor.isDraggingSource(sourceId)).toEqual(false)
			expect(monitor.isDraggingSource(otherId)).toEqual(true)
		})

		it('keeps track of dragged item, type and source handle', () => {
			const sourceA = new NormalSource({ a: 123 })
			const sourceAId = registry.addSource(Types.FOO, sourceA)
			const sourceB = new NormalSource({ a: 456 })
			const sourceBId = registry.addSource(Types.BAR, sourceB)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			expect(monitor.getItem()).toEqual(null)
			expect(monitor.getItemType()).toEqual(null)
			expect(monitor.getSourceId()).toEqual(null)

			backend.simulateBeginDrag([sourceAId])
			expect(monitor.getItem().a).toEqual(123)
			expect(monitor.getItemType()).toEqual(Types.FOO)
			expect(monitor.getSourceId()).toEqual(sourceAId)

			backend.simulateHover([targetId])
			backend.simulateDrop()
			expect(monitor.getItem().a).toEqual(123)
			expect(monitor.getItemType()).toEqual(Types.FOO)
			expect(monitor.getSourceId()).toEqual(sourceAId)

			backend.simulateEndDrag()
			expect(monitor.getItem()).toEqual(null)
			expect(monitor.getItemType()).toEqual(null)
			expect(monitor.getSourceId()).toEqual(null)

			backend.simulateBeginDrag([sourceBId])
			registry.removeSource(sourceBId)
			expect(monitor.getItem().a).toEqual(456)
			expect(monitor.getItemType()).toEqual(Types.BAR)
			expect(monitor.getSourceId()).toEqual(sourceBId)
		})

		it('keeps track of drop result and whether it occured', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const targetA = new NormalTarget({ a: 123 })
			const targetAId = registry.addTarget(Types.FOO, targetA)
			const targetB = new TargetWithNoDropResult()
			const targetBId = registry.addTarget(Types.FOO, targetB)

			expect(monitor.didDrop()).toEqual(false)
			expect(monitor.getDropResult()).toEqual(null)

			backend.simulateBeginDrag([sourceId])
			expect(monitor.didDrop()).toEqual(false)
			expect(monitor.getDropResult()).toEqual(null)

			backend.simulateHover([targetAId])
			backend.simulateDrop()
			expect(monitor.didDrop()).toEqual(true)
			expect(monitor.getDropResult()).toEqual({ a: 123 })

			backend.simulateEndDrag()
			expect(monitor.didDrop()).toEqual(false)
			expect(monitor.getDropResult()).toEqual(null)

			backend.simulateBeginDrag([sourceId])
			expect(monitor.didDrop()).toEqual(false)
			expect(monitor.getDropResult()).toEqual(null)

			backend.simulateHover([targetBId])
			backend.simulateDrop()
			expect(monitor.didDrop()).toEqual(true)
			expect(monitor.getDropResult()).toEqual({})

			backend.simulateEndDrag()
			expect(monitor.didDrop()).toEqual(false)
			expect(monitor.getDropResult()).toEqual(null)
		})
	})

	describe('multi-type targets', () => {
		it('takes all types into consideration', () => {
			const sourceA = new NormalSource()
			const sourceAId = registry.addSource(Types.FOO, sourceA)
			const sourceB = new NormalSource()
			const sourceBId = registry.addSource(Types.BAZ, sourceB)
			const targetA = new NormalTarget()
			const targetAId = registry.addTarget([Types.FOO, Types.BAR], targetA)
			const targetB = new NormalTarget()
			const targetBId = registry.addTarget([Types.BAR, Types.BAZ], targetB)
			const targetC = new NormalTarget()
			const targetCId = registry.addTarget(
				[Types.FOO, Types.BAR, Types.BAZ],
				targetC,
			)

			expect(monitor.canDropOnTarget(targetAId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)

			backend.simulateBeginDrag([sourceAId])
			expect(monitor.canDropOnTarget(targetAId)).toEqual(true)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(true)

			backend.simulateHover([targetAId])
			backend.simulateDrop()
			expect(monitor.canDropOnTarget(targetAId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)

			backend.simulateEndDrag()
			expect(monitor.canDropOnTarget(targetAId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(false)

			backend.simulateBeginDrag([sourceBId])
			expect(monitor.canDropOnTarget(targetAId)).toEqual(false)
			expect(monitor.canDropOnTarget(targetBId)).toEqual(true)
			expect(monitor.canDropOnTarget(targetCId)).toEqual(true)
		})

		it('returns false from isDragging(sourceId) if source is not published', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)

			expect(monitor.isDragging()).toEqual(false)
			expect(monitor.isDraggingSource(sourceId)).toEqual(false)

			backend.simulateBeginDrag([sourceId], { publishSource: false })
			expect(monitor.isDragging()).toEqual(true)
			expect(monitor.isDraggingSource(sourceId)).toEqual(false)

			backend.simulatePublishDragSource()
			expect(monitor.isDragging()).toEqual(true)
			expect(monitor.isDraggingSource(sourceId)).toEqual(true)

			backend.simulateEndDrag()
			expect(monitor.isDragging()).toEqual(false)
			expect(monitor.isDraggingSource(sourceId)).toEqual(false)
		})

		it('ignores publishDragSource() outside dragging operation', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)

			expect(monitor.isDragging()).toEqual(false)
			expect(monitor.isDraggingSource(sourceId)).toEqual(false)

			backend.simulatePublishDragSource()
			expect(monitor.isDragging()).toEqual(false)
			expect(monitor.isDraggingSource(sourceId)).toEqual(false)

			backend.simulateBeginDrag([sourceId], { publishSource: false })
			expect(monitor.isDragging()).toEqual(true)
			expect(monitor.isDraggingSource(sourceId)).toEqual(false)

			backend.simulatePublishDragSource()
			expect(monitor.isDragging()).toEqual(true)
			expect(monitor.isDraggingSource(sourceId)).toEqual(true)

			backend.simulateEndDrag()
			expect(monitor.isDragging()).toEqual(false)
			expect(monitor.isDraggingSource(sourceId)).toEqual(false)

			backend.simulatePublishDragSource()
			expect(monitor.isDragging()).toEqual(false)
			expect(monitor.isDraggingSource(sourceId)).toEqual(false)
		})
	})

	describe('target handle tracking', () => {
		it('treats removing a hovered drop target as unhovering it', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			backend.simulateBeginDrag([sourceId])
			backend.simulateHover([targetId])
			expect(monitor.getTargetIds().length).toEqual(1)
			expect(monitor.isOverTarget(targetId)).toEqual(true)
			expect(monitor.isOverTarget(targetId, { shallow: true })).toEqual(true)

			registry.removeTarget(targetId)
			expect(monitor.getTargetIds().length).toEqual(0)
			expect(monitor.isOverTarget(targetId)).toEqual(false)
			expect(monitor.isOverTarget(targetId, { shallow: true })).toEqual(false)
		})

		it('keeps track of target handles', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const targetA = new NormalTarget()
			const targetAId = registry.addTarget(Types.FOO, targetA)
			const targetB = new NormalTarget()
			const targetBId = registry.addTarget(Types.FOO, targetB)
			const targetC = new NormalTarget()
			const targetCId = registry.addTarget(Types.FOO, targetC)

			let handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)

			backend.simulateBeginDrag([sourceId])
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)
			expect(monitor.isOverTarget(targetAId)).toEqual(false)
			expect(monitor.isOverTarget(targetAId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetBId)).toEqual(false)
			expect(monitor.isOverTarget(targetBId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetCId)).toEqual(false)
			expect(monitor.isOverTarget(targetCId, { shallow: true })).toEqual(false)

			backend.simulateHover([])
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)
			expect(monitor.isOverTarget(targetAId)).toEqual(false)
			expect(monitor.isOverTarget(targetAId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetBId)).toEqual(false)
			expect(monitor.isOverTarget(targetBId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetCId)).toEqual(false)
			expect(monitor.isOverTarget(targetCId, { shallow: true })).toEqual(false)

			backend.simulateHover([targetAId, targetBId, targetCId])
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(3)
			expect(handles[0]).toEqual(targetAId)
			expect(monitor.isOverTarget(targetAId)).toEqual(true)
			expect(monitor.isOverTarget(targetAId, { shallow: true })).toEqual(false)
			expect(handles[1]).toEqual(targetBId)
			expect(monitor.isOverTarget(targetBId)).toEqual(true)
			expect(monitor.isOverTarget(targetBId, { shallow: true })).toEqual(false)
			expect(handles[2]).toEqual(targetCId)
			expect(monitor.isOverTarget(targetCId)).toEqual(true)
			expect(monitor.isOverTarget(targetCId, { shallow: true })).toEqual(true)

			backend.simulateHover([targetCId, targetBId, targetAId])
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(3)
			expect(handles[0]).toEqual(targetCId)
			expect(monitor.isOverTarget(targetCId)).toEqual(true)
			expect(monitor.isOverTarget(targetCId, { shallow: true })).toEqual(false)
			expect(handles[1]).toEqual(targetBId)
			expect(monitor.isOverTarget(targetBId)).toEqual(true)
			expect(monitor.isOverTarget(targetBId, { shallow: true })).toEqual(false)
			expect(handles[2]).toEqual(targetAId)
			expect(monitor.isOverTarget(targetAId)).toEqual(true)
			expect(monitor.isOverTarget(targetAId, { shallow: true })).toEqual(true)
		})

		it('resets target handles on drop', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			let handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)

			backend.simulateBeginDrag([sourceId])
			backend.simulateHover([targetId])
			backend.simulateDrop()
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)

			backend.simulateEndDrag()
			backend.simulateBeginDrag([sourceId])
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)
		})

		it('resets target handles on endDrag', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			let handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)

			backend.simulateBeginDrag([sourceId])
			backend.simulateHover([targetId])
			backend.simulateEndDrag()
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)

			backend.simulateBeginDrag([sourceId])
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)
		})

		it('counts non-droppable targets, but skips targets of another type', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const targetA = new NormalTarget()
			const targetAId = registry.addTarget(Types.FOO, targetA)
			const targetB = new NonDroppableTarget()
			const targetBId = registry.addTarget(Types.FOO, targetB)
			const targetC = new NormalTarget()
			const targetCId = registry.addTarget(Types.BAR, targetC)

			let handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)
			expect(monitor.isOverTarget(targetAId)).toEqual(false)
			expect(monitor.isOverTarget(targetAId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetBId)).toEqual(false)
			expect(monitor.isOverTarget(targetBId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetCId)).toEqual(false)
			expect(monitor.isOverTarget(targetCId, { shallow: true })).toEqual(false)

			backend.simulateBeginDrag([sourceId])
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)
			expect(monitor.isOverTarget(targetAId)).toEqual(false)
			expect(monitor.isOverTarget(targetAId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetBId)).toEqual(false)
			expect(monitor.isOverTarget(targetBId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetCId)).toEqual(false)
			expect(monitor.isOverTarget(targetCId, { shallow: true })).toEqual(false)

			backend.simulateHover([])
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(0)
			expect(monitor.isOverTarget(targetAId)).toEqual(false)
			expect(monitor.isOverTarget(targetAId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetBId)).toEqual(false)
			expect(monitor.isOverTarget(targetBId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetCId)).toEqual(false)
			expect(monitor.isOverTarget(targetCId, { shallow: true })).toEqual(false)

			backend.simulateHover([targetAId, targetBId, targetCId])
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(2)
			expect(handles[0]).toEqual(targetAId)
			expect(monitor.isOverTarget(targetAId)).toEqual(true)
			expect(monitor.isOverTarget(targetAId, { shallow: true })).toEqual(false)
			expect(handles[1]).toEqual(targetBId)
			expect(monitor.isOverTarget(targetBId)).toEqual(true)
			expect(monitor.isOverTarget(targetBId, { shallow: true })).toEqual(true)
			expect(monitor.isOverTarget(targetCId)).toEqual(false)
			expect(monitor.isOverTarget(targetCId, { shallow: true })).toEqual(false)

			backend.simulateHover([targetCId, targetBId, targetAId])
			handles = monitor.getTargetIds()
			expect(handles.length).toEqual(2)
			expect(monitor.isOverTarget(targetCId)).toEqual(false)
			expect(monitor.isOverTarget(targetCId, { shallow: true })).toEqual(false)
			expect(handles[0]).toEqual(targetBId)
			expect(monitor.isOverTarget(targetBId)).toEqual(true)
			expect(monitor.isOverTarget(targetBId, { shallow: true })).toEqual(false)
			expect(handles[1]).toEqual(targetAId)
			expect(monitor.isOverTarget(targetAId)).toEqual(true)
			expect(monitor.isOverTarget(targetAId, { shallow: true })).toEqual(true)

			backend.simulateHover([targetBId])
			backend.simulateDrop()
			handles = monitor.getTargetIds()
			expect(handles[0]).toEqual(targetBId)
			expect(handles.length).toEqual(1)
			expect(monitor.isOverTarget(targetAId)).toEqual(false)
			expect(monitor.isOverTarget(targetAId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetBId)).toEqual(true)
			expect(monitor.isOverTarget(targetBId, { shallow: true })).toEqual(true)
			expect(monitor.isOverTarget(targetCId)).toEqual(false)
			expect(monitor.isOverTarget(targetCId, { shallow: true })).toEqual(false)

			backend.simulateEndDrag()
			expect(handles[0]).toEqual(targetBId)
			expect(handles.length).toEqual(1)
			expect(monitor.isOverTarget(targetAId)).toEqual(false)
			expect(monitor.isOverTarget(targetAId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetBId)).toEqual(false)
			expect(monitor.isOverTarget(targetBId, { shallow: true })).toEqual(false)
			expect(monitor.isOverTarget(targetCId)).toEqual(false)
			expect(monitor.isOverTarget(targetCId, { shallow: true })).toEqual(false)
		})

		it('correctly handles isOverTarget() for multi-type targets', () => {
			const sourceA = new NormalSource()
			const sourceAId = registry.addSource(Types.FOO, sourceA)
			const sourceB = new NormalSource()
			const sourceBId = registry.addSource(Types.BAR, sourceB)
			const sourceC = new NormalSource()
			const sourceCId = registry.addSource(Types.BAZ, sourceC)
			const target = new NormalTarget()
			const targetId = registry.addTarget([Types.FOO, Types.BAR], target)

			backend.simulateBeginDrag([sourceAId])
			backend.simulateHover([targetId])
			expect(monitor.isOverTarget(targetId)).toEqual(true)
			expect(monitor.isOverTarget(targetId, { shallow: true })).toEqual(true)

			backend.simulateEndDrag()
			backend.simulateBeginDrag([sourceBId])
			backend.simulateHover([targetId])
			expect(monitor.isOverTarget(targetId)).toEqual(true)
			expect(monitor.isOverTarget(targetId, { shallow: true })).toEqual(true)

			backend.simulateEndDrag()
			backend.simulateBeginDrag([sourceCId])
			backend.simulateHover([targetId])
			expect(monitor.isOverTarget(targetId)).toEqual(false)
			expect(monitor.isOverTarget(targetId, { shallow: true })).toEqual(false)
		})

		it('does not let array mutation corrupt internal state', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)
			const handles = [targetId]

			backend.simulateBeginDrag([sourceId])
			backend.simulateHover(handles)
			expect(monitor.getTargetIds().length).toEqual(1)

			handles.push(targetId)
			expect(monitor.getTargetIds().length).toEqual(1)
		})
	})

	describe('mirror drag sources', () => {
		it('uses custom isDragging functions', () => {
			const sourceA = new NumberSource(1, true)
			const sourceAId = registry.addSource(Types.FOO, sourceA)
			const sourceB = new NumberSource(2, true)
			const sourceBId = registry.addSource(Types.FOO, sourceB)
			const sourceC = new NumberSource(3, true)
			const sourceCId = registry.addSource(Types.BAR, sourceC)
			const sourceD = new NumberSource(4, false)
			const sourceDId = registry.addSource(Types.FOO, sourceD)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			expect(monitor.isDraggingSource(sourceAId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceBId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceCId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceDId)).toEqual(false)

			backend.simulateBeginDrag([sourceAId])
			expect(monitor.isDraggingSource(sourceAId)).toEqual(true)
			expect(monitor.isDraggingSource(sourceBId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceCId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceDId)).toEqual(false)

			sourceA.number = 3
			sourceB.number = 1
			sourceC.number = 1
			sourceD.number = 1
			expect(monitor.isDraggingSource(sourceAId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceBId)).toEqual(true)
			expect(monitor.isDraggingSource(sourceCId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceDId)).toEqual(true)

			registry.removeSource(sourceDId)
			backend.simulateHover([targetId])
			backend.simulateDrop()
			expect(monitor.isDraggingSource(sourceAId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceBId)).toEqual(true)
			expect(monitor.isDraggingSource(sourceCId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceDId)).toEqual(true)

			backend.simulateEndDrag()
			expect(monitor.isDraggingSource(sourceAId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceBId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceCId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceDId)).toEqual(false)

			backend.simulateBeginDrag([sourceBId])
			expect(monitor.isDraggingSource(sourceAId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceBId)).toEqual(true)
			expect(monitor.isDraggingSource(sourceCId)).toEqual(false)
			expect(monitor.isDraggingSource(sourceDId)).toEqual(true)

			sourceA.number = 1
			expect(monitor.isDraggingSource(sourceAId)).toEqual(true)

			sourceB.number = 5
			expect(monitor.isDraggingSource(sourceBId)).toEqual(false)
		})
	})
})
