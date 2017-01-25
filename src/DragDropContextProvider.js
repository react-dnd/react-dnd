import { PropTypes, Component, Children } from 'react';
import {
  CHILD_CONTEXT_TYPES,
  createChildContext,
  unpackBackendForEs5Users,
} from './DragDropContext';

/**
 * This class is a React-Component based version of the DragDropContext.
 * This is an alternative to decorating an application component with an ES7 decorator.
 */
export default class DragDropContextProvider extends Component {
  static propTypes = {
    backend: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    children: PropTypes.element.isRequired,
    window: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    window: undefined,
  };

  static childContextTypes = CHILD_CONTEXT_TYPES;

  static displayName = 'DragDropContextProvider';

  static contextTypes = {
    window: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.backend = unpackBackendForEs5Users(props.backend);
  }

  /**
   * This property determines which window global to use for creating the DragDropManager.
   * If a window has been injected explicitly via props, that is used first. If it is available
   * as a context value, then use that, otherwise use the browser global.
   */
  get window() {
    if (this.props.window) {
      return this.props.window;
    } else if (this.context.window) {
      return this.context.window;
    }
    return window;
  }

  getChildContext() {
    return createChildContext(this.backend, { window: this.window });
  }

  render() {
    return Children.only(this.props.children);
  }
}
