import createTestBackend, { TestBackend } from 'react-dnd-test-backend'
import isString from 'lodash/isString'
import * as Types from './types'
import { NormalSource, NonDraggableSource, BadItemSource } from './sources'
import {
	NormalTarget,
	NonDroppableTarget,
	TargetWithNoDropResult,
	BadResultTarget,
	TransformResultTarget,
} from './targets'
import DragDropManagerImpl from '../DragDropManagerImpl'
import { DragDropManager, Backend, HandlerRegistry } from '../interfaces'

describe('DragDropManager', () => {
	let manager: DragDropManager<any>
	let backend: TestBackend
	let registry: HandlerRegistry

	beforeEach(() => {
		manager = new DragDropManagerImpl(createTestBackend as any)
		backend = (manager.getBackend() as any) as TestBackend
		registry = manager.getRegistry()
	})

	describe('handler registration', () => {
		it('registers and unregisters drag sources', done => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			expect(registry.getSource(sourceId)).toEqual(source)

			registry.removeSource(sourceId)

			setImmediate(() => {
				expect(registry.getSource(sourceId)).toEqual(undefined)
				expect(() => registry.removeSource(sourceId)).toThrow()
				done()
			})
		})

		it('registers and unregisters drop targets', done => {
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)
			expect(registry.getTarget(targetId)).toEqual(target)

			registry.removeTarget(targetId)

			setImmediate(() => {
				expect(registry.getTarget(targetId)).toEqual(undefined)
				expect(() => registry.removeTarget(targetId)).toThrow()
				done()
			})
		})

		it('registers and unregisters multi-type drop targets', done => {
			const target = new NormalTarget()
			const targetId = registry.addTarget([Types.FOO, Types.BAR], target)
			expect(registry.getTarget(targetId)).toEqual(target)

			registry.removeTarget(targetId)

			setImmediate(() => {
				expect(registry.getTarget(targetId)).toEqual(undefined)
				expect(() => registry.removeTarget(targetId)).toThrow()
				done()
			})
		})

		it('knows the difference between sources and targets', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			expect(() => registry.getSource(targetId)).toThrow()
			expect(() => registry.getTarget(sourceId)).toThrow()
			expect(() => registry.removeSource(targetId)).toThrow()
			expect(() => registry.removeTarget(sourceId)).toThrow()
		})

		it('accepts symbol types', () => {
			const source = new NormalSource()
			const target = new NormalTarget()

			expect(() => registry.addSource(Symbol('a'), source)).not.toThrow()
			expect(() => registry.addTarget(Symbol('b'), target)).not.toThrow()
			expect(() =>
				registry.addTarget([Symbol('c'), Symbol('d')], target),
			).not.toThrow()
		})

		it('throws on invalid type', () => {
			const source = new NormalSource()
			const target = new NormalTarget()

			expect(() => registry.addSource(null as any, source)).toThrow()
			expect(() => registry.addSource(undefined as any, source)).toThrow()
			expect(() => registry.addSource(23 as any, source)).toThrow()
			expect(() => registry.addSource(['yo'] as any, source)).toThrow()
			expect(() => registry.addTarget(null as any, target)).toThrow()
			expect(() => registry.addTarget(undefined as any, target)).toThrow()
			expect(() => registry.addTarget(23 as any, target)).toThrow()
			expect(() => registry.addTarget([23] as any, target)).toThrow()
			expect(() => registry.addTarget(['yo', null] as any, target)).toThrow()
			expect(() => registry.addTarget([['yo']] as any, target)).toThrow()
		})

		it('calls setup() and teardown() on backend', () => {
			expect(backend.didCallSetup).toEqual(false)
			expect(backend.didCallTeardown).toEqual(false)

			const sourceId = registry.addSource(Types.FOO, new NormalSource())
			expect(backend.didCallSetup).toEqual(true)
			expect(backend.didCallTeardown).toEqual(false)
			backend.didCallSetup = false
			backend.didCallTeardown = false

			const targetId = registry.addTarget(Types.FOO, new NormalTarget())
			expect(backend.didCallSetup).toEqual(false)
			expect(backend.didCallTeardown).toEqual(false)
			backend.didCallSetup = false
			backend.didCallTeardown = false

			registry.removeSource(sourceId)
			expect(backend.didCallSetup).toEqual(false)
			expect(backend.didCallTeardown).toEqual(false)
			backend.didCallSetup = false
			backend.didCallTeardown = false

			registry.removeTarget(targetId)
			expect(backend.didCallSetup).toEqual(false)
			expect(backend.didCallTeardown).toEqual(true)
			backend.didCallSetup = false
			backend.didCallTeardown = false

			registry.addTarget(Types.BAR, new NormalTarget())
			expect(backend.didCallSetup).toEqual(true)
			expect(backend.didCallTeardown).toEqual(false)
		})

		it('returns string handles', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const targetA = new NormalTarget()
			const targetAId = registry.addTarget(Types.FOO, targetA)
			const targetB = new NormalTarget()
			const targetBId = registry.addTarget([Types.FOO, Types.BAR], targetB)

			expect(isString(sourceId)).toEqual(true)
			expect(isString(targetAId)).toEqual(true)
			expect(isString(targetBId)).toEqual(true)
		})

		it('accurately reports handler role', () => {
			const source = new NormalSource()
			const sourceId = registry.addSource(Types.FOO, source)
			const target = new NormalTarget()
			const targetId = registry.addTarget(Types.FOO, target)

			expect(registry.isSourceId(sourceId)).toEqual(true)
			expect(registry.isSourceId(targetId)).toEqual(false)
			expect(() => registry.isSourceId('something else')).toThrow()
			expect(() => registry.isSourceId(null as any)).toThrow()

			expect(registry.isTargetId(sourceId)).toEqual(false)
			expect(registry.isTargetId(targetId)).toEqual(true)
			expect(() => registry.isTargetId('something else')).toThrow()
			expect(() => registry.isTargetId(null as any)).toThrow()
		})
	})

	describe('drag source and target contract', () => {
		describe('beginDrag() and canDrag()', () => {
			it('ignores beginDrag() if canDrag() returns false', () => {
				const source = new NonDraggableSource()
				const sourceId = registry.addSource(Types.FOO, source)

				backend.simulateBeginDrag([sourceId])
				expect(source.didCallBeginDrag).toEqual(false)
			})

			it('throws if beginDrag() returns non-object', () => {
				const source = new BadItemSource()
				const sourceId = registry.addSource(Types.FOO, source)

				expect(() => backend.simulateBeginDrag([sourceId])).toThrow()
			})

			it('begins drag if canDrag() returns true', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)

				backend.simulateBeginDrag([sourceId])
				expect(source.didCallBeginDrag).toEqual(true)
			})

			it('throws in beginDrag() if it is called twice during one operation', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)

				backend.simulateBeginDrag([sourceId])
				expect(() => backend.simulateBeginDrag([sourceId])).toThrow()
			})

			it('throws in beginDrag() if it is called with an invalid handles', done => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const target = new NormalTarget()
				const targetId = registry.addTarget(Types.FOO, target)

				expect(() => (backend as any).simulateBeginDrag('yo')).toThrow()
				expect(() => (backend as any).simulateBeginDrag(null)).toThrow()
				expect(() => (backend as any).simulateBeginDrag(sourceId)).toThrow()
				expect(() => (backend as any).simulateBeginDrag([null])).toThrow()
				expect(() => backend.simulateBeginDrag(['yo'])).toThrow()
				expect(() => backend.simulateBeginDrag([targetId])).toThrow()
				expect(() =>
					(backend as any).simulateBeginDrag([null, sourceId]),
				).toThrow()
				expect(() => backend.simulateBeginDrag([targetId, sourceId])).toThrow()

				registry.removeSource(sourceId)

				setImmediate(() => {
					expect(() => backend.simulateBeginDrag([sourceId])).toThrow()
					done()
				})
			})

			it('calls beginDrag() on the innermost handler with canDrag() returning true', () => {
				const sourceA = new NonDraggableSource()
				const sourceAId = registry.addSource(Types.FOO, sourceA)
				const sourceB = new NormalSource()
				const sourceBId = registry.addSource(Types.FOO, sourceB)
				const sourceC = new NormalSource()
				const sourceCId = registry.addSource(Types.FOO, sourceC)
				const sourceD = new NonDraggableSource()
				const sourceDId = registry.addSource(Types.FOO, sourceD)

				backend.simulateBeginDrag([sourceAId, sourceBId, sourceCId, sourceDId])
				expect(sourceA.didCallBeginDrag).toEqual(false)
				expect(sourceB.didCallBeginDrag).toEqual(false)
				expect(sourceC.didCallBeginDrag).toEqual(true)
				expect(sourceD.didCallBeginDrag).toEqual(false)
			})

			it('lets beginDrag() be called again in a next operation', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)

				backend.simulateBeginDrag([sourceId])
				backend.simulateEndDrag()

				source.didCallBeginDrag = false
				expect(() => backend.simulateBeginDrag([sourceId])).not.toThrow()
				expect(source.didCallBeginDrag).toEqual(true)
			})
		})

		describe('drop(), canDrop() and endDrag()', () => {
			it('endDrag() sees drop() return value as drop result if dropped on a target', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const target = new NormalTarget()
				const targetId = registry.addTarget(Types.FOO, target)

				backend.simulateBeginDrag([sourceId])
				backend.simulateHover([targetId])
				backend.simulateDrop()
				backend.simulateEndDrag()
				expect(target.didCallDrop).toEqual(true)
				expect(source.recordedDropResult).toEqual({ foo: 'bar' })
			})

			it('endDrag() sees {} as drop result by default if dropped on a target', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const target = new TargetWithNoDropResult()
				const targetId = registry.addTarget(Types.FOO, target)

				backend.simulateBeginDrag([sourceId])
				backend.simulateHover([targetId])
				backend.simulateDrop()
				backend.simulateEndDrag()
				expect(source.recordedDropResult).toEqual({})
			})

			it('endDrag() sees null as drop result if dropped outside a target', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)

				backend.simulateBeginDrag([sourceId])
				backend.simulateEndDrag()
				expect(source.recordedDropResult).toEqual(null)
			})

			it('calls endDrag even if source was unregistered', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)

				backend.simulateBeginDrag([sourceId])
				registry.removeSource(sourceId)
				backend.simulateEndDrag()
				expect(source.recordedDropResult).toEqual(null)
			})

			it('throws in endDrag() if it is called outside a drag operation', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				expect(() => backend.simulateEndDrag()).toThrow()
			})

			it('ignores drop() if no drop targets entered', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)

				backend.simulateBeginDrag([sourceId])
				backend.simulateDrop()
				backend.simulateEndDrag()
				expect(source.recordedDropResult).toEqual(null)
			})

			it('ignores drop() if drop targets entered and left', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const targetA = new NormalTarget()
				const targetAId = registry.addTarget(Types.FOO, targetA)
				const targetB = new NormalTarget()
				const targetBId = registry.addTarget(Types.FOO, targetB)

				backend.simulateBeginDrag([sourceId])
				backend.simulateHover([targetAId])
				backend.simulateHover([targetAId, targetBId])
				backend.simulateHover([targetAId])
				backend.simulateHover([])
				backend.simulateDrop()
				backend.simulateEndDrag()
				expect(targetA.didCallDrop).toEqual(false)
				expect(targetB.didCallDrop).toEqual(false)
				expect(source.recordedDropResult).toEqual(null)
			})

			it('ignores drop() if canDrop() returns false', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const target = new NonDroppableTarget()
				const targetId = registry.addTarget(Types.FOO, target)

				backend.simulateBeginDrag([sourceId])
				backend.simulateHover([targetId])
				backend.simulateDrop()
				expect(target.didCallDrop).toEqual(false)
			})

			it('ignores drop() if target has a different type', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const target = new NormalTarget()
				const targetId = registry.addTarget(Types.BAR, target)

				backend.simulateBeginDrag([sourceId])
				backend.simulateHover([targetId])
				backend.simulateDrop()
				expect(target.didCallDrop).toEqual(false)
			})

			it('throws in drop() if it is called outside a drag operation', () => {
				expect(() => backend.simulateDrop()).toThrow()
			})

			it('throws in drop() if it returns something that is neither undefined nor an object', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const target = new BadResultTarget()
				const targetId = registry.addTarget(Types.FOO, target)

				backend.simulateBeginDrag([sourceId])
				backend.simulateHover([targetId])
				expect(() => backend.simulateDrop()).toThrow()
			})

			it('throws in drop() if called twice', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const target = new NormalTarget()
				const targetId = registry.addTarget(Types.FOO, target)

				backend.simulateBeginDrag([sourceId])
				backend.simulateHover([targetId])
				backend.simulateDrop()
				expect(() => backend.simulateDrop()).toThrow()
			})

			describe('nested drop targets', () => {
				it('uses child result if parents have no drop result', () => {
					const source = new NormalSource()
					const sourceId = registry.addSource(Types.FOO, source)
					const targetA = new TargetWithNoDropResult()
					const targetAId = registry.addTarget(Types.FOO, targetA)
					const targetB = new NormalTarget({ number: 16 })
					const targetBId = registry.addTarget(Types.FOO, targetB)
					const targetC = new NormalTarget({ number: 42 })
					const targetCId = registry.addTarget(Types.FOO, targetC)

					backend.simulateBeginDrag([sourceId])
					backend.simulateHover([targetAId, targetBId, targetCId])
					backend.simulateDrop()
					backend.simulateEndDrag()
					expect(targetA.didCallDrop).toEqual(true)
					expect(targetB.didCallDrop).toEqual(true)
					expect(targetC.didCallDrop).toEqual(true)
					expect(source.recordedDropResult).toEqual({ number: 16 })
				})

				it('excludes targets of different type when dispatching drop', () => {
					const source = new NormalSource()
					const sourceId = registry.addSource(Types.FOO, source)
					const targetA = new TargetWithNoDropResult()
					const targetAId = registry.addTarget(Types.FOO, targetA)
					const targetB = new NormalTarget({ number: 16 })
					const targetBId = registry.addTarget(Types.BAR, targetB)
					const targetC = new NormalTarget({ number: 42 })
					const targetCId = registry.addTarget(Types.FOO, targetC)

					backend.simulateBeginDrag([sourceId])
					backend.simulateHover([targetAId, targetBId, targetCId])
					backend.simulateDrop()
					backend.simulateEndDrag()
					expect(targetA.didCallDrop).toEqual(true)
					expect(targetB.didCallDrop).toEqual(false)
					expect(targetC.didCallDrop).toEqual(true)
					expect(source.recordedDropResult).toEqual({ number: 42 })
				})

				it('excludes non-droppable targets when dispatching drop', () => {
					const source = new NormalSource()
					const sourceId = registry.addSource(Types.FOO, source)
					const targetA = new TargetWithNoDropResult()
					const targetAId = registry.addTarget(Types.FOO, targetA)
					const targetB = new TargetWithNoDropResult()
					const targetBId = registry.addTarget(Types.FOO, targetB)
					const targetC = new NonDroppableTarget()
					const targetCId = registry.addTarget(Types.BAR, targetC)

					backend.simulateBeginDrag([sourceId])
					backend.simulateHover([targetAId, targetBId, targetCId])
					backend.simulateDrop()
					backend.simulateEndDrag()
					expect(targetA.didCallDrop).toEqual(true)
					expect(targetB.didCallDrop).toEqual(true)
					expect(targetC.didCallDrop).toEqual(false)
					expect(source.recordedDropResult).toEqual({})
				})

				it('lets parent drop targets transform child results', () => {
					const source = new NormalSource()
					const sourceId = registry.addSource(Types.FOO, source)
					const targetA = new TargetWithNoDropResult()
					const targetAId = registry.addTarget(Types.FOO, targetA)
					const targetB = new TransformResultTarget((dropResult: any) => ({
						number: dropResult.number * 2,
					}))
					const targetBId = registry.addTarget(Types.FOO, targetB)
					const targetC = new NonDroppableTarget()
					const targetCId = registry.addTarget(Types.FOO, targetC)
					const targetD = new TransformResultTarget((dropResult: any) => ({
						number: dropResult.number + 1,
					}))
					const targetDId = registry.addTarget(Types.FOO, targetD)
					const targetE = new NormalTarget({ number: 42 })
					const targetEId = registry.addTarget(Types.FOO, targetE)
					const targetF = new TransformResultTarget((dropResult: any) => ({
						number: dropResult.number / 2,
					}))
					const targetFId = registry.addTarget(Types.BAR, targetF)
					const targetG = new NormalTarget({ number: 100 })
					const targetGId = registry.addTarget(Types.BAR, targetG)

					backend.simulateBeginDrag([sourceId])
					backend.simulateHover([
						targetAId,
						targetBId,
						targetCId,
						targetDId,
						targetEId,
						targetFId,
						targetGId,
					])
					backend.simulateDrop()
					backend.simulateEndDrag()
					expect(targetA.didCallDrop).toEqual(true)
					expect(targetB.didCallDrop).toEqual(true)
					expect(targetC.didCallDrop).toEqual(false)
					expect(targetD.didCallDrop).toEqual(true)
					expect(targetE.didCallDrop).toEqual(true)
					expect(targetF.didCallDrop).toEqual(false)
					expect(targetG.didCallDrop).toEqual(false)
					expect(source.recordedDropResult).toEqual({ number: (42 + 1) * 2 })
				})

				it('always chooses parent drop result', () => {
					const source = new NormalSource()
					const sourceId = registry.addSource(Types.FOO, source)
					const targetA = new NormalTarget({ number: 12345 })
					const targetAId = registry.addTarget(Types.FOO, targetA)
					const targetB = new TransformResultTarget((dropResult: any) => ({
						number: dropResult.number * 2,
					}))
					const targetBId = registry.addTarget(Types.FOO, targetB)
					const targetC = new NonDroppableTarget()
					const targetCId = registry.addTarget(Types.FOO, targetC)
					const targetD = new TransformResultTarget((dropResult: any) => ({
						number: dropResult.number + 1,
					}))
					const targetDId = registry.addTarget(Types.FOO, targetD)
					const targetE = new NormalTarget({ number: 42 })
					const targetEId = registry.addTarget(Types.FOO, targetE)
					const targetF = new TransformResultTarget((dropResult: any) => ({
						number: dropResult.number / 2,
					}))
					const targetFId = registry.addTarget(Types.BAR, targetF)
					const targetG = new NormalTarget({ number: 100 })
					const targetGId = registry.addTarget(Types.BAR, targetG)

					backend.simulateBeginDrag([sourceId])
					backend.simulateHover([
						targetAId,
						targetBId,
						targetCId,
						targetDId,
						targetEId,
						targetFId,
						targetGId,
					])
					backend.simulateDrop()
					backend.simulateEndDrag()
					expect(targetA.didCallDrop).toEqual(true)
					expect(targetB.didCallDrop).toEqual(true)
					expect(targetC.didCallDrop).toEqual(false)
					expect(targetD.didCallDrop).toEqual(true)
					expect(targetE.didCallDrop).toEqual(true)
					expect(targetF.didCallDrop).toEqual(false)
					expect(targetG.didCallDrop).toEqual(false)
					expect(source.recordedDropResult).toEqual({ number: 12345 })
				})

				it('excludes removed targets when dispatching drop', () => {
					const source = new NormalSource()
					const sourceId = registry.addSource(Types.FOO, source)
					const targetA = new NormalTarget()
					const targetAId = registry.addTarget(Types.FOO, targetA)
					const targetB = new NormalTarget()
					const targetBId = registry.addTarget(Types.FOO, targetB)
					const targetC = new NormalTarget()
					const targetCId = registry.addTarget(Types.FOO, targetC)

					backend.simulateBeginDrag([sourceId])
					backend.simulateHover([targetAId, targetBId, targetCId])
					registry.removeTarget(targetBId)
					backend.simulateDrop()
					backend.simulateEndDrag()
					expect(targetA.didCallDrop).toEqual(true)
					expect(targetB.didCallDrop).toEqual(false)
					expect(targetC.didCallDrop).toEqual(true)
				})
			})
		})

		describe('hover()', () => {
			it('throws on hover after drop', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const target = new NormalTarget()
				const targetId = registry.addTarget(Types.FOO, target)

				expect(() => backend.simulateHover([targetId])).toThrow()
				backend.simulateBeginDrag([sourceId])
				backend.simulateHover([targetId])

				backend.simulateDrop()
				expect(() => backend.simulateHover([targetId])).toThrow()
			})

			it('throws on hover outside dragging operation', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const target = new NormalTarget()
				const targetId = registry.addTarget(Types.FOO, target)

				expect(() => backend.simulateHover([targetId])).toThrow()
				backend.simulateBeginDrag([sourceId])
				backend.simulateHover([targetId])

				backend.simulateEndDrag()
				expect(() => backend.simulateHover([targetId])).toThrow()
			})

			it('excludes targets of different type when dispatching hover', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const targetA = new NormalTarget()
				const targetAId = registry.addTarget(Types.FOO, targetA)
				const targetB = new NormalTarget()
				const targetBId = registry.addTarget(Types.BAR, targetB)
				const targetC = new NormalTarget()
				const targetCId = registry.addTarget(Types.FOO, targetC)
				const targetD = new NormalTarget()
				const targetDId = registry.addTarget([Types.BAZ, Types.FOO], targetD)

				backend.simulateBeginDrag([sourceId])
				backend.simulateHover([targetAId, targetBId, targetCId, targetDId])
				expect(targetA.didCallHover).toEqual(true)
				expect(targetB.didCallHover).toEqual(false)
				expect(targetC.didCallHover).toEqual(true)
				expect(targetD.didCallHover).toEqual(true)
			})

			it('includes non-droppable targets when dispatching hover', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const targetA = new TargetWithNoDropResult()
				const targetAId = registry.addTarget(Types.FOO, targetA)
				const targetB = new TargetWithNoDropResult()
				const targetBId = registry.addTarget(Types.FOO, targetB)

				backend.simulateBeginDrag([sourceId])
				backend.simulateHover([targetAId, targetBId])
				expect(targetA.didCallHover).toEqual(true)
				expect(targetB.didCallHover).toEqual(true)
			})

			it('throws in hover() if it contains the same target twice', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.BAR, source)
				const targetA = new NormalTarget()
				const targetAId = registry.addTarget(Types.BAR, targetA)
				const targetB = new NormalTarget()
				const targetBId = registry.addTarget(Types.BAR, targetB)

				backend.simulateBeginDrag([sourceId])
				expect(() =>
					backend.simulateHover([targetAId, targetBId, targetAId]),
				).toThrow()
			})

			it('throws in hover() if it contains the same target twice (even if wrong type)', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const targetA = new NormalTarget()
				const targetAId = registry.addTarget(Types.BAR, targetA)
				const targetB = new NormalTarget()
				const targetBId = registry.addTarget(Types.BAR, targetB)

				backend.simulateBeginDrag([sourceId])
				expect(() =>
					backend.simulateHover([targetAId, targetBId, targetAId]),
				).toThrow()
			})

			it('throws in hover() if it is called with a non-array', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const target = new NormalTarget()
				const targetId = registry.addTarget(Types.BAR, target)

				backend.simulateBeginDrag([sourceId])
				expect(() => (backend as any).simulateHover(null)).toThrow()
				expect(() => (backend as any).simulateHover('yo')).toThrow()
				expect(() => (backend as any).simulateHover(targetId)).toThrow()
			})

			it('throws in hover() if it contains an invalid drop target', () => {
				const source = new NormalSource()
				const sourceId = registry.addSource(Types.FOO, source)
				const target = new NormalTarget()
				const targetId = registry.addTarget(Types.BAR, target)

				backend.simulateBeginDrag([sourceId])
				expect(() => (backend as any).simulateHover([targetId, null])).toThrow()
				expect(() => backend.simulateHover([targetId, 'yo'])).toThrow()
				expect(() => backend.simulateHover([targetId, sourceId])).toThrow()
			})
		})
	})
})
