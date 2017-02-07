import isString from 'lodash/isString';
import expect from 'expect.js';
import * as Types from './types';
import {
  NormalSource,
  NonDraggableSource,
  BadItemSource,
} from './sources';
import {
  NormalTarget,
  NonDroppableTarget,
  TargetWithNoDropResult,
  BadResultTarget,
  TransformResultTarget,
} from './targets';
import { DragDropManager, createTestBackend } from '../src';

describe('DragDropManager', () => {
  let manager;
  let backend;
  let registry;

  beforeEach(() => {
    manager = new DragDropManager(createTestBackend);
    backend = manager.getBackend();
    registry = manager.getRegistry();
  });

  describe('handler registration', () => {
    it('registers and unregisters drag sources', (done) => {
      const source = new NormalSource();
      const sourceId = registry.addSource(Types.FOO, source);
      expect(registry.getSource(sourceId)).to.equal(source);

      registry.removeSource(sourceId);

      setImmediate(() => {
        expect(registry.getSource(sourceId)).to.equal(undefined);
        expect(() => registry.removeSource(sourceId)).to.throwError();
        done();
      });
    });

    it('registers and unregisters drop targets', (done) => {
      const target = new NormalTarget();
      const targetId = registry.addTarget(Types.FOO, target);
      expect(registry.getTarget(targetId)).to.equal(target);

      registry.removeTarget(targetId);

      setImmediate(() => {
        expect(registry.getTarget(targetId)).to.equal(undefined);
        expect(() => registry.removeTarget(targetId)).to.throwError();
        done();
      });
    });

    it('registers and unregisters multi-type drop targets', (done) => {
      const target = new NormalTarget();
      const targetId = registry.addTarget([Types.FOO, Types.BAR], target);
      expect(registry.getTarget(targetId)).to.equal(target);

      registry.removeTarget(targetId);

      setImmediate(() => {
        expect(registry.getTarget(targetId)).to.equal(undefined);
        expect(() => registry.removeTarget(targetId)).to.throwError();
        done();
      });
    });

    it('knows the difference between sources and targets', () => {
      const source = new NormalSource();
      const sourceId = registry.addSource(Types.FOO, source);
      const target = new NormalTarget();
      const targetId = registry.addTarget(Types.FOO, target);

      expect(() => registry.getSource(targetId)).to.throwError();
      expect(() => registry.getTarget(sourceId)).to.throwError();
      expect(() => registry.removeSource(targetId)).to.throwError();
      expect(() => registry.removeTarget(sourceId)).to.throwError();
    });

    it('accepts symbol types', () => {
      const source = new NormalSource();
      const target = new NormalTarget();

      expect(() => registry.addSource(Symbol('a'), source)).to.not.throwError();
      expect(() => registry.addTarget(Symbol('b'), target)).to.not.throwError();
      expect(() => registry.addTarget([Symbol('c'), Symbol('d')], target)).to.not.throwError();
    });

    it('throws on invalid type', () => {
      const source = new NormalSource();
      const target = new NormalTarget();

      expect(() => registry.addSource(null, source)).to.throwError();
      expect(() => registry.addSource(undefined, source)).to.throwError();
      expect(() => registry.addSource(23, source)).to.throwError();
      expect(() => registry.addSource(['yo'], source)).to.throwError();
      expect(() => registry.addTarget(null, target)).to.throwError();
      expect(() => registry.addTarget(undefined, target)).to.throwError();
      expect(() => registry.addTarget(23, target)).to.throwError();
      expect(() => registry.addTarget([23], target)).to.throwError();
      expect(() => registry.addTarget(['yo', null], target)).to.throwError();
      expect(() => registry.addTarget([['yo']], target)).to.throwError();
    });

    it('calls setup() and teardown() on backend', () => {
      expect(backend.didCallSetup).to.equal(undefined);
      expect(backend.didCallTeardown).to.equal(undefined);

      const sourceId = registry.addSource(Types.FOO, new NormalSource());
      expect(backend.didCallSetup).to.equal(true);
      expect(backend.didCallTeardown).to.equal(undefined);
      backend.didCallSetup = undefined;
      backend.didCallTeardown = undefined;

      const targetId = registry.addTarget(Types.FOO, new NormalTarget());
      expect(backend.didCallSetup).to.equal(undefined);
      expect(backend.didCallTeardown).to.equal(undefined);
      backend.didCallSetup = undefined;
      backend.didCallTeardown = undefined;

      registry.removeSource(sourceId);
      expect(backend.didCallSetup).to.equal(undefined);
      expect(backend.didCallTeardown).to.equal(undefined);
      backend.didCallSetup = undefined;
      backend.didCallTeardown = undefined;

      registry.removeTarget(targetId);
      expect(backend.didCallSetup).to.equal(undefined);
      expect(backend.didCallTeardown).to.equal(true);
      backend.didCallSetup = undefined;
      backend.didCallTeardown = undefined;

      registry.addTarget(Types.BAR, new NormalTarget());
      expect(backend.didCallSetup).to.equal(true);
      expect(backend.didCallTeardown).to.equal(undefined);
    });

    it('returns string handles', () => {
      const source = new NormalSource();
      const sourceId = registry.addSource(Types.FOO, source);
      const targetA = new NormalTarget();
      const targetAId = registry.addTarget(Types.FOO, targetA);
      const targetB = new NormalTarget();
      const targetBId = registry.addTarget([Types.FOO, Types.BAR], targetB);

      expect(isString(sourceId)).to.equal(true);
      expect(isString(targetAId)).to.equal(true);
      expect(isString(targetBId)).to.equal(true);
    });

    it('accurately reports handler role', () => {
      const source = new NormalSource();
      const sourceId = registry.addSource(Types.FOO, source);
      const target = new NormalTarget();
      const targetId = registry.addTarget(Types.FOO, target);

      expect(registry.isSourceId(sourceId)).to.equal(true);
      expect(registry.isSourceId(targetId)).to.equal(false);
      expect(() => registry.isSourceId('something else')).to.throwError();
      expect(() => registry.isSourceId(null)).to.throwError();

      expect(registry.isTargetId(sourceId)).to.equal(false);
      expect(registry.isTargetId(targetId)).to.equal(true);
      expect(() => registry.isTargetId('something else')).to.throwError();
      expect(() => registry.isTargetId(null)).to.throwError();
    });
  });

  describe('drag source and target contract', () => {
    describe('beginDrag() and canDrag()', () => {
      it('ignores beginDrag() if canDrag() returns false', () => {
        const source = new NonDraggableSource();
        const sourceId = registry.addSource(Types.FOO, source);

        backend.simulateBeginDrag([sourceId]);
        expect(source.didCallBeginDrag).to.equal(false);
      });

      it('throws if beginDrag() returns non-object', () => {
        const source = new BadItemSource();
        const sourceId = registry.addSource(Types.FOO, source);

        expect(() => backend.simulateBeginDrag([sourceId])).to.throwError();
      });

      it('begins drag if canDrag() returns true', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);

        backend.simulateBeginDrag([sourceId]);
        expect(source.didCallBeginDrag).to.equal(true);
      });

      it('throws in beginDrag() if it is called twice during one operation', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);

        backend.simulateBeginDrag([sourceId]);
        expect(() => backend.simulateBeginDrag([sourceId])).to.throwError();
      });

      it('throws in beginDrag() if it is called with an invalid handles', (done) => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const target = new NormalTarget();
        const targetId = registry.addTarget(Types.FOO, target);

        expect(() => backend.simulateBeginDrag('yo')).to.throwError();
        expect(() => backend.simulateBeginDrag(null)).to.throwError();
        expect(() => backend.simulateBeginDrag(sourceId)).to.throwError();
        expect(() => backend.simulateBeginDrag([null])).to.throwError();
        expect(() => backend.simulateBeginDrag(['yo'])).to.throwError();
        expect(() => backend.simulateBeginDrag([targetId])).to.throwError();
        expect(() => backend.simulateBeginDrag([null, sourceId])).to.throwError();
        expect(() => backend.simulateBeginDrag([targetId, sourceId])).to.throwError();

        registry.removeSource(sourceId);

        setImmediate(() => {
          expect(() => backend.simulateBeginDrag([sourceId])).to.throwError();
          done();
        });
      });

      it('calls beginDrag() on the innermost handler with canDrag() returning true', () => {
        const sourceA = new NonDraggableSource();
        const sourceAId = registry.addSource(Types.FOO, sourceA);
        const sourceB = new NormalSource();
        const sourceBId = registry.addSource(Types.FOO, sourceB);
        const sourceC = new NormalSource();
        const sourceCId = registry.addSource(Types.FOO, sourceC);
        const sourceD = new NonDraggableSource();
        const sourceDId = registry.addSource(Types.FOO, sourceD);

        backend.simulateBeginDrag([sourceAId, sourceBId, sourceCId, sourceDId]);
        expect(sourceA.didCallBeginDrag).to.equal(false);
        expect(sourceB.didCallBeginDrag).to.equal(false);
        expect(sourceC.didCallBeginDrag).to.equal(true);
        expect(sourceD.didCallBeginDrag).to.equal(false);
      });

      it('lets beginDrag() be called again in a next operation', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateEndDrag(sourceId);

        source.didCallBeginDrag = false;
        expect(() => backend.simulateBeginDrag([sourceId])).to.not.throwError();
        expect(source.didCallBeginDrag).to.equal(true);
      });
    });

    describe('drop(), canDrop() and endDrag()', () => {
      it('endDrag() sees drop() return value as drop result if dropped on a target', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const target = new NormalTarget();
        const targetId = registry.addTarget(Types.FOO, target);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateHover([targetId]);
        backend.simulateDrop();
        backend.simulateEndDrag();
        expect(target.didCallDrop).to.equal(true);
        expect(source.recordedDropResult).to.eql({ foo: 'bar' });
      });

      it('endDrag() sees {} as drop result by default if dropped on a target', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const target = new TargetWithNoDropResult();
        const targetId = registry.addTarget(Types.FOO, target);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateHover([targetId]);
        backend.simulateDrop();
        backend.simulateEndDrag();
        expect(source.recordedDropResult).to.eql({});
      });

      it('endDrag() sees null as drop result if dropped outside a target', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateEndDrag();
        expect(source.recordedDropResult).to.equal(null);
      });

      it('calls endDrag even if source was unregistered', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);

        backend.simulateBeginDrag([sourceId]);
        registry.removeSource(sourceId);
        backend.simulateEndDrag();
        expect(source.recordedDropResult).to.equal(null);
      });

      it('throws in endDrag() if it is called outside a drag operation', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        expect(() => backend.simulateEndDrag(sourceId)).to.throwError();
      });

      it('ignores drop() if no drop targets entered', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateDrop();
        backend.simulateEndDrag();
        expect(source.recordedDropResult).to.equal(null);
      });

      it('ignores drop() if drop targets entered and left', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const targetA = new NormalTarget();
        const targetAId = registry.addTarget(Types.FOO, targetA);
        const targetB = new NormalTarget();
        const targetBId = registry.addTarget(Types.FOO, targetB);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateHover([targetAId]);
        backend.simulateHover([targetAId, targetBId]);
        backend.simulateHover([targetAId]);
        backend.simulateHover([]);
        backend.simulateDrop();
        backend.simulateEndDrag();
        expect(targetA.didCallDrop).to.equal(false);
        expect(targetB.didCallDrop).to.equal(false);
        expect(source.recordedDropResult).to.equal(null);
      });

      it('ignores drop() if canDrop() returns false', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const target = new NonDroppableTarget();
        const targetId = registry.addTarget(Types.FOO, target);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateHover([targetId]);
        backend.simulateDrop();
        expect(target.didCallDrop).to.equal(false);
      });

      it('ignores drop() if target has a different type', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const target = new NormalTarget();
        const targetId = registry.addTarget(Types.BAR, target);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateHover([targetId]);
        backend.simulateDrop();
        expect(target.didCallDrop).to.equal(false);
      });

      it('throws in drop() if it is called outside a drag operation', () => {
        expect(() => backend.simulateDrop()).to.throwError();
      });

      it('throws in drop() if it returns something that is neither undefined nor an object', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const target = new BadResultTarget();
        const targetId = registry.addTarget(Types.FOO, target);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateHover([targetId]);
        expect(() => backend.simulateDrop()).to.throwError();
      });

      it('throws in drop() if called twice', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const target = new NormalTarget();
        const targetId = registry.addTarget(Types.FOO, target);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateHover([targetId]);
        backend.simulateDrop();
        expect(() => backend.simulateDrop()).to.throwError();
      });

      describe('nested drop targets', () => {
        it('uses child result if parents have no drop result', () => {
          const source = new NormalSource();
          const sourceId = registry.addSource(Types.FOO, source);
          const targetA = new TargetWithNoDropResult();
          const targetAId = registry.addTarget(Types.FOO, targetA);
          const targetB = new NormalTarget({ number: 16 });
          const targetBId = registry.addTarget(Types.FOO, targetB);
          const targetC = new NormalTarget({ number: 42 });
          const targetCId = registry.addTarget(Types.FOO, targetC);

          backend.simulateBeginDrag([sourceId]);
          backend.simulateHover([targetAId, targetBId, targetCId]);
          backend.simulateDrop();
          backend.simulateEndDrag();
          expect(targetA.didCallDrop).to.equal(true);
          expect(targetB.didCallDrop).to.equal(true);
          expect(targetC.didCallDrop).to.equal(true);
          expect(source.recordedDropResult).to.eql({ number: 16 });
        });

        it('excludes targets of different type when dispatching drop', () => {
          const source = new NormalSource();
          const sourceId = registry.addSource(Types.FOO, source);
          const targetA = new TargetWithNoDropResult();
          const targetAId = registry.addTarget(Types.FOO, targetA);
          const targetB = new NormalTarget({ number: 16 });
          const targetBId = registry.addTarget(Types.BAR, targetB);
          const targetC = new NormalTarget({ number: 42 });
          const targetCId = registry.addTarget(Types.FOO, targetC);

          backend.simulateBeginDrag([sourceId]);
          backend.simulateHover([targetAId, targetBId, targetCId]);
          backend.simulateDrop();
          backend.simulateEndDrag();
          expect(targetA.didCallDrop).to.equal(true);
          expect(targetB.didCallDrop).to.equal(false);
          expect(targetC.didCallDrop).to.equal(true);
          expect(source.recordedDropResult).to.eql({ number: 42 });
        });

        it('excludes non-droppable targets when dispatching drop', () => {
          const source = new NormalSource();
          const sourceId = registry.addSource(Types.FOO, source);
          const targetA = new TargetWithNoDropResult();
          const targetAId = registry.addTarget(Types.FOO, targetA);
          const targetB = new TargetWithNoDropResult();
          const targetBId = registry.addTarget(Types.FOO, targetB);
          const targetC = new NonDroppableTarget({ number: 16 });
          const targetCId = registry.addTarget(Types.BAR, targetC);

          backend.simulateBeginDrag([sourceId]);
          backend.simulateHover([targetAId, targetBId, targetCId]);
          backend.simulateDrop();
          backend.simulateEndDrag();
          expect(targetA.didCallDrop).to.equal(true);
          expect(targetB.didCallDrop).to.equal(true);
          expect(targetC.didCallDrop).to.equal(false);
          expect(source.recordedDropResult).to.eql({});
        });

        it('lets parent drop targets transform child results', () => {
          const source = new NormalSource();
          const sourceId = registry.addSource(Types.FOO, source);
          const targetA = new TargetWithNoDropResult();
          const targetAId = registry.addTarget(Types.FOO, targetA);
          const targetB = new TransformResultTarget(dropResult => ({ number: dropResult.number * 2 }));
          const targetBId = registry.addTarget(Types.FOO, targetB);
          const targetC = new NonDroppableTarget();
          const targetCId = registry.addTarget(Types.FOO, targetC);
          const targetD = new TransformResultTarget(dropResult => ({ number: dropResult.number + 1 }));
          const targetDId = registry.addTarget(Types.FOO, targetD);
          const targetE = new NormalTarget({ number: 42 });
          const targetEId = registry.addTarget(Types.FOO, targetE);
          const targetF = new TransformResultTarget(dropResult => ({ number: dropResult.number / 2 }));
          const targetFId = registry.addTarget(Types.BAR, targetF);
          const targetG = new NormalTarget({ number: 100 });
          const targetGId = registry.addTarget(Types.BAR, targetG);

          backend.simulateBeginDrag([sourceId]);
          backend.simulateHover([
            targetAId, targetBId, targetCId, targetDId,
            targetEId, targetFId, targetGId,
          ]);
          backend.simulateDrop();
          backend.simulateEndDrag();
          expect(targetA.didCallDrop).to.equal(true);
          expect(targetB.didCallDrop).to.equal(true);
          expect(targetC.didCallDrop).to.equal(false);
          expect(targetD.didCallDrop).to.equal(true);
          expect(targetE.didCallDrop).to.equal(true);
          expect(targetF.didCallDrop).to.equal(false);
          expect(targetG.didCallDrop).to.equal(false);
          expect(source.recordedDropResult).to.eql({ number: (42 + 1) * 2 });
        });

        it('always chooses parent drop result', () => {
          const source = new NormalSource();
          const sourceId = registry.addSource(Types.FOO, source);
          const targetA = new NormalTarget({ number: 12345 });
          const targetAId = registry.addTarget(Types.FOO, targetA);
          const targetB = new TransformResultTarget(dropResult => ({ number: dropResult.number * 2 }));
          const targetBId = registry.addTarget(Types.FOO, targetB);
          const targetC = new NonDroppableTarget();
          const targetCId = registry.addTarget(Types.FOO, targetC);
          const targetD = new TransformResultTarget(dropResult => ({ number: dropResult.number + 1 }));
          const targetDId = registry.addTarget(Types.FOO, targetD);
          const targetE = new NormalTarget({ number: 42 });
          const targetEId = registry.addTarget(Types.FOO, targetE);
          const targetF = new TransformResultTarget(dropResult => ({ number: dropResult.number / 2 }));
          const targetFId = registry.addTarget(Types.BAR, targetF);
          const targetG = new NormalTarget({ number: 100 });
          const targetGId = registry.addTarget(Types.BAR, targetG);

          backend.simulateBeginDrag([sourceId]);
          backend.simulateHover([
            targetAId, targetBId, targetCId, targetDId,
            targetEId, targetFId, targetGId,
          ]);
          backend.simulateDrop();
          backend.simulateEndDrag();
          expect(targetA.didCallDrop).to.equal(true);
          expect(targetB.didCallDrop).to.equal(true);
          expect(targetC.didCallDrop).to.equal(false);
          expect(targetD.didCallDrop).to.equal(true);
          expect(targetE.didCallDrop).to.equal(true);
          expect(targetF.didCallDrop).to.equal(false);
          expect(targetG.didCallDrop).to.equal(false);
          expect(source.recordedDropResult).to.eql({ number: 12345 });
        });

        it('excludes removed targets when dispatching drop', () => {
          const source = new NormalSource();
          const sourceId = registry.addSource(Types.FOO, source);
          const targetA = new NormalTarget();
          const targetAId = registry.addTarget(Types.FOO, targetA);
          const targetB = new NormalTarget();
          const targetBId = registry.addTarget(Types.FOO, targetB);
          const targetC = new NormalTarget();
          const targetCId = registry.addTarget(Types.FOO, targetC);

          backend.simulateBeginDrag([sourceId]);
          backend.simulateHover([targetAId, targetBId, targetCId]);
          registry.removeTarget(targetBId);
          backend.simulateDrop();
          backend.simulateEndDrag();
          expect(targetA.didCallDrop).to.equal(true);
          expect(targetB.didCallDrop).to.equal(false);
          expect(targetC.didCallDrop).to.equal(true);
        });
      });
    });

    describe('hover()', () => {
      it('throws on hover after drop', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const target = new NormalTarget();
        const targetId = registry.addTarget(Types.FOO, target);

        expect(() => backend.simulateHover([targetId])).to.throwError();
        backend.simulateBeginDrag([sourceId]);
        backend.simulateHover([targetId]);

        backend.simulateDrop();
        expect(() => backend.simulateHover([targetId])).to.throwError();
      });

      it('throws on hover outside dragging operation', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const target = new NormalTarget();
        const targetId = registry.addTarget(Types.FOO, target);

        expect(() => backend.simulateHover([targetId])).to.throwError();
        backend.simulateBeginDrag([sourceId]);
        backend.simulateHover([targetId]);

        backend.simulateEndDrag();
        expect(() => backend.simulateHover([targetId])).to.throwError();
      });

      it('excludes targets of different type when dispatching hover', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const targetA = new NormalTarget();
        const targetAId = registry.addTarget(Types.FOO, targetA);
        const targetB = new NormalTarget();
        const targetBId = registry.addTarget(Types.BAR, targetB);
        const targetC = new NormalTarget();
        const targetCId = registry.addTarget(Types.FOO, targetC);
        const targetD = new NormalTarget();
        const targetDId = registry.addTarget([Types.BAZ, Types.FOO], targetD);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateHover([targetAId, targetBId, targetCId, targetDId]);
        expect(targetA.didCallHover).to.equal(true);
        expect(targetB.didCallHover).to.equal(false);
        expect(targetC.didCallHover).to.equal(true);
        expect(targetD.didCallHover).to.equal(true);
      });

      it('includes non-droppable targets when dispatching hover', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const targetA = new TargetWithNoDropResult();
        const targetAId = registry.addTarget(Types.FOO, targetA);
        const targetB = new TargetWithNoDropResult();
        const targetBId = registry.addTarget(Types.FOO, targetB);

        backend.simulateBeginDrag([sourceId]);
        backend.simulateHover([targetAId, targetBId]);
        expect(targetA.didCallHover).to.equal(true);
        expect(targetB.didCallHover).to.equal(true);
      });

      it('throws in hover() if it contains the same target twice', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.BAR, source);
        const targetA = new NormalTarget();
        const targetAId = registry.addTarget(Types.BAR, targetA);
        const targetB = new NormalTarget();
        const targetBId = registry.addTarget(Types.BAR, targetB);

        backend.simulateBeginDrag([sourceId]);
        expect(() => backend.simulateHover([targetAId, targetBId, targetAId])).to.throwError();
      });

      it('throws in hover() if it contains the same target twice (even if wrong type)', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const targetA = new NormalTarget();
        const targetAId = registry.addTarget(Types.BAR, targetA);
        const targetB = new NormalTarget();
        const targetBId = registry.addTarget(Types.BAR, targetB);

        backend.simulateBeginDrag([sourceId]);
        expect(() => backend.simulateHover([targetAId, targetBId, targetAId])).to.throwError();
      });

      it('throws in hover() if it is called with a non-array', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const target = new NormalTarget();
        const targetId = registry.addTarget(Types.BAR, target);

        backend.simulateBeginDrag([sourceId]);
        expect(() => backend.simulateHover(null)).to.throwError();
        expect(() => backend.simulateHover('yo')).to.throwError();
        expect(() => backend.simulateHover(targetId)).to.throwError();
      });

      it('throws in hover() if it contains an invalid drop target', () => {
        const source = new NormalSource();
        const sourceId = registry.addSource(Types.FOO, source);
        const target = new NormalTarget();
        const targetId = registry.addTarget(Types.BAR, target);

        backend.simulateBeginDrag([sourceId]);
        expect(() => backend.simulateHover([targetId, null])).to.throwError();
        expect(() => backend.simulateHover([targetId, 'yo'])).to.throwError();
        expect(() => backend.simulateHover([targetId, sourceId])).to.throwError();
      });
    });
  });
});
