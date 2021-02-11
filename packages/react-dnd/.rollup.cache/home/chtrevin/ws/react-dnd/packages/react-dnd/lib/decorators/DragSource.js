import { invariant } from '@react-dnd/invariant';
import { isPlainObject } from '../utils/js_utils';
import { checkDecoratorArguments } from './utils';
import { decorateHandler } from './decorateHandler';
import { registerSource } from '../common/registration';
import { DragSourceMonitorImpl } from '../common/DragSourceMonitorImpl';
import { SourceConnector } from '../common/SourceConnector';
import { isValidType } from '../utils/isValidType';
import { createSourceFactory } from './createSourceFactory';
/**
 * Decorates a component as a dragsource
 * @deprecated - The decorator-based API will be removed in a future major version
 * @param type The dragsource type
 * @param spec The drag source specification
 * @param collect The props collector function
 * @param options DnD options
 */
export function DragSource(type, spec, collect, options = {}) {
    checkDecoratorArguments('DragSource', 'type, spec, collect[, options]', type, spec, collect, options);
    let getType = type;
    if (typeof type !== 'function') {
        invariant(isValidType(type), 'Expected "type" provided as the first argument to DragSource to be ' +
            'a string, or a function that returns a string given the current props. ' +
            'Instead, received %s. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', type);
        getType = () => type;
    }
    invariant(isPlainObject(spec), 'Expected "spec" provided as the second argument to DragSource to be ' +
        'a plain object. Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', spec);
    const createSource = createSourceFactory(spec);
    invariant(typeof collect === 'function', 'Expected "collect" provided as the third argument to DragSource to be ' +
        'a function that returns a plain object of props to inject. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
    invariant(isPlainObject(options), 'Expected "options" provided as the fourth argument to DragSource to be ' +
        'a plain object when specified. ' +
        'Instead, received %s. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
    return function decorateSource(DecoratedComponent) {
        return decorateHandler({
            containerDisplayName: 'DragSource',
            createHandler: createSource,
            registerHandler: registerSource,
            createConnector: (backend) => new SourceConnector(backend),
            createMonitor: (manager) => new DragSourceMonitorImpl(manager),
            DecoratedComponent,
            getType,
            collect,
            options,
        });
    };
}
//# sourceMappingURL=DragSource.js.map