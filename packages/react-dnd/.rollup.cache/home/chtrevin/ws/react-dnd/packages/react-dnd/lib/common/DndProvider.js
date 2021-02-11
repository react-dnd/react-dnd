import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, memo } from 'react';
import { DndContext, createDndContext } from './DndContext';
let refCount = 0;
const INSTANCE_SYM = Symbol.for('__REACT_DND_CONTEXT_INSTANCE__');
/**
 * A React component that provides the React-DnD context
 */
export const DndProvider = memo(function DndProvider({ children, ...props }) {
    const [manager, isGlobalInstance] = getDndContextValue(props); // memoized from props
    /**
     * If the global context was used to store the DND context
     * then where theres no more references to it we should
     * clean it up to avoid memory leaks
     */
    useEffect(() => {
        if (isGlobalInstance) {
            const context = getGlobalContext();
            ++refCount;
            return () => {
                if (--refCount === 0) {
                    context[INSTANCE_SYM] = null;
                }
            };
        }
    }, []);
    return _jsx(DndContext.Provider, Object.assign({ value: manager }, { children: children }), void 0);
});
function getDndContextValue(props) {
    if ('manager' in props) {
        const manager = { dragDropManager: props.manager };
        return [manager, false];
    }
    const manager = createSingletonDndContext(props.backend, props.context, props.options, props.debugMode);
    const isGlobalInstance = !props.context;
    return [manager, isGlobalInstance];
}
function createSingletonDndContext(backend, context = getGlobalContext(), options, debugMode) {
    const ctx = context;
    if (!ctx[INSTANCE_SYM]) {
        ctx[INSTANCE_SYM] = createDndContext(backend, context, options, debugMode);
    }
    return ctx[INSTANCE_SYM];
}
function getGlobalContext() {
    return typeof global !== 'undefined' ? global : window;
}
//# sourceMappingURL=DndProvider.js.map