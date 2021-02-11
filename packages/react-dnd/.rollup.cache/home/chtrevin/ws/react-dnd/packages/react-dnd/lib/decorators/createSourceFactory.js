import { invariant } from '@react-dnd/invariant';
import { isPlainObject } from '../utils/js_utils';
import { getDecoratedComponent } from './utils';
const ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag'];
const REQUIRED_SPEC_METHODS = ['beginDrag'];
class SourceImpl {
    constructor(spec, monitor, ref) {
        this.props = null;
        this.beginDrag = () => {
            if (!this.props) {
                return;
            }
            const item = this.spec.beginDrag(this.props, this.monitor, this.ref.current);
            if (process.env.NODE_ENV !== 'production') {
                invariant(isPlainObject(item), 'beginDrag() must return a plain object that represents the dragged item. ' +
                    'Instead received %s. ' +
                    'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', item);
            }
            return item;
        };
        this.spec = spec;
        this.monitor = monitor;
        this.ref = ref;
    }
    receiveProps(props) {
        this.props = props;
    }
    canDrag() {
        if (!this.props) {
            return false;
        }
        if (!this.spec.canDrag) {
            return true;
        }
        return this.spec.canDrag(this.props, this.monitor);
    }
    isDragging(globalMonitor, sourceId) {
        if (!this.props) {
            return false;
        }
        if (!this.spec.isDragging) {
            return sourceId === globalMonitor.getSourceId();
        }
        return this.spec.isDragging(this.props, this.monitor);
    }
    endDrag() {
        if (!this.props) {
            return;
        }
        if (!this.spec.endDrag) {
            return;
        }
        this.spec.endDrag(this.props, this.monitor, getDecoratedComponent(this.ref));
    }
}
export function createSourceFactory(spec) {
    Object.keys(spec).forEach((key) => {
        invariant(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drag source specification to only have ' +
            'some of the following keys: %s. ' +
            'Instead received a specification with an unexpected "%s" key. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', ALLOWED_SPEC_METHODS.join(', '), key);
        invariant(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' +
            'Instead received a specification with %s: %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', key, key, spec[key]);
    });
    REQUIRED_SPEC_METHODS.forEach((key) => {
        invariant(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' +
            'Instead received a specification with %s: %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', key, key, spec[key]);
    });
    return function createSource(monitor, ref) {
        return new SourceImpl(spec, monitor, ref);
    };
}
//# sourceMappingURL=createSourceFactory.js.map