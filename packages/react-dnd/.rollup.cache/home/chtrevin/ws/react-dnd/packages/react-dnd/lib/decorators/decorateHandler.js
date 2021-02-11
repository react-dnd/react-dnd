import { jsx as _jsx } from "react/jsx-runtime";
import { createRef, Component } from 'react';
import { shallowEqual } from '@react-dnd/shallowequal';
import { invariant } from '@react-dnd/invariant';
import { DndContext } from '../common/DndContext';
import { isPlainObject } from '../utils/js_utils';
import { Disposable, CompositeDisposable, SerialDisposable, } from './disposables';
import { isRefable } from './utils';
import hoistStatics from 'hoist-non-react-statics';
export function decorateHandler({ DecoratedComponent, createHandler, createMonitor, createConnector, registerHandler, containerDisplayName, getType, collect, options, }) {
    const { arePropsEqual = shallowEqual } = options;
    const Decorated = DecoratedComponent;
    const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';
    class DragDropContainer extends Component {
        constructor(props) {
            super(props);
            this.decoratedRef = createRef();
            this.handleChange = () => {
                const nextState = this.getCurrentState();
                if (!shallowEqual(nextState, this.state)) {
                    this.setState(nextState);
                }
            };
            this.disposable = new SerialDisposable();
            this.receiveProps(props);
            this.dispose();
        }
        getHandlerId() {
            return this.handlerId;
        }
        getDecoratedComponentInstance() {
            invariant(this.decoratedRef.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');
            return this.decoratedRef.current;
        }
        shouldComponentUpdate(nextProps, nextState) {
            return (!arePropsEqual(nextProps, this.props) ||
                !shallowEqual(nextState, this.state));
        }
        componentDidMount() {
            this.disposable = new SerialDisposable();
            this.currentType = undefined;
            this.receiveProps(this.props);
            this.handleChange();
        }
        componentDidUpdate(prevProps) {
            if (!arePropsEqual(this.props, prevProps)) {
                this.receiveProps(this.props);
                this.handleChange();
            }
        }
        componentWillUnmount() {
            this.dispose();
        }
        receiveProps(props) {
            if (!this.handler) {
                return;
            }
            this.handler.receiveProps(props);
            this.receiveType(getType(props));
        }
        receiveType(type) {
            if (!this.handlerMonitor || !this.manager || !this.handlerConnector) {
                return;
            }
            if (type === this.currentType) {
                return;
            }
            this.currentType = type;
            const [handlerId, unregister] = registerHandler(type, this.handler, this.manager);
            this.handlerId = handlerId;
            this.handlerMonitor.receiveHandlerId(handlerId);
            this.handlerConnector.receiveHandlerId(handlerId);
            const globalMonitor = this.manager.getMonitor();
            const unsubscribe = globalMonitor.subscribeToStateChange(this.handleChange, { handlerIds: [handlerId] });
            this.disposable.setDisposable(new CompositeDisposable(new Disposable(unsubscribe), new Disposable(unregister)));
        }
        dispose() {
            this.disposable.dispose();
            if (this.handlerConnector) {
                this.handlerConnector.receiveHandlerId(null);
            }
        }
        getCurrentState() {
            if (!this.handlerConnector) {
                return {};
            }
            const nextState = collect(this.handlerConnector.hooks, this.handlerMonitor, this.props);
            if (process.env.NODE_ENV !== 'production') {
                invariant(isPlainObject(nextState), 'Expected `collect` specified as the second argument to ' +
                    '%s for %s to return a plain object of props to inject. ' +
                    'Instead, received %s.', containerDisplayName, displayName, nextState);
            }
            return nextState;
        }
        render() {
            return (_jsx(DndContext.Consumer, { children: ({ dragDropManager }) => {
                    this.receiveDragDropManager(dragDropManager);
                    if (typeof requestAnimationFrame !== 'undefined') {
                        requestAnimationFrame(() => this.handlerConnector?.reconnect());
                    }
                    return (_jsx(Decorated, Object.assign({}, this.props, this.getCurrentState(), { 
                        // NOTE: if Decorated is a Function Component, decoratedRef will not be populated unless it's a refforwarding component.
                        ref: isRefable(Decorated) ? this.decoratedRef : null }), void 0));
                } }, void 0));
        }
        receiveDragDropManager(dragDropManager) {
            if (this.manager !== undefined) {
                return;
            }
            invariant(dragDropManager !== undefined, 'Could not find the drag and drop manager in the context of %s. ' +
                'Make sure to render a DndProvider component in your top-level component. ' +
                'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);
            if (dragDropManager === undefined) {
                return;
            }
            this.manager = dragDropManager;
            this.handlerMonitor = createMonitor(dragDropManager);
            this.handlerConnector = createConnector(dragDropManager.getBackend());
            this.handler = createHandler(this.handlerMonitor, this.decoratedRef);
        }
    }
    DragDropContainer.DecoratedComponent = DecoratedComponent;
    DragDropContainer.displayName = `${containerDisplayName}(${displayName})`;
    return hoistStatics(DragDropContainer, DecoratedComponent);
}
//# sourceMappingURL=decorateHandler.js.map