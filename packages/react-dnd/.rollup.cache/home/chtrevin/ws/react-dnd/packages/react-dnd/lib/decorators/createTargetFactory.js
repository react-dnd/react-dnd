import { invariant } from '@react-dnd/invariant';
import { isPlainObject } from '../utils/js_utils';
import { getDecoratedComponent } from './utils';
const ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop'];
class TargetImpl {
    constructor(spec, monitor, ref) {
        this.props = null;
        this.spec = spec;
        this.monitor = monitor;
        this.ref = ref;
    }
    receiveProps(props) {
        this.props = props;
    }
    receiveMonitor(monitor) {
        this.monitor = monitor;
    }
    canDrop() {
        if (!this.spec.canDrop) {
            return true;
        }
        return this.spec.canDrop(this.props, this.monitor);
    }
    hover() {
        if (!this.spec.hover || !this.props) {
            return;
        }
        this.spec.hover(this.props, this.monitor, getDecoratedComponent(this.ref));
    }
    drop() {
        if (!this.spec.drop) {
            return undefined;
        }
        const dropResult = this.spec.drop(this.props, this.monitor, this.ref.current);
        if (process.env.NODE_ENV !== 'production') {
            invariant(typeof dropResult === 'undefined' || isPlainObject(dropResult), 'drop() must either return undefined, or an object that represents the drop result. ' +
                'Instead received %s. ' +
                'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', dropResult);
        }
        return dropResult;
    }
}
export function createTargetFactory(spec) {
    Object.keys(spec).forEach((key) => {
        invariant(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drop target specification to only have ' +
            'some of the following keys: %s. ' +
            'Instead received a specification with an unexpected "%s" key. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', ALLOWED_SPEC_METHODS.join(', '), key);
        invariant(typeof spec[key] === 'function', 'Expected %s in the drop target specification to be a function. ' +
            'Instead received a specification with %s: %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', key, key, spec[key]);
    });
    return function createTarget(monitor, ref) {
        return new TargetImpl(spec, monitor, ref);
    };
}
//# sourceMappingURL=createTargetFactory.js.map