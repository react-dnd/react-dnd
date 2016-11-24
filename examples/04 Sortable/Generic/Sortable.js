import React, {Component, PropTypes} from 'react';
import {DropTarget} from 'react-dnd';
import SortableItem from './SortableItem';

const _getLastChildKeyFromComponent = (component) => {
  const allItems = component.state.children;
  let lastChild = null;
  React.Children.forEach(allItems, (child, i) => {
    if (i === React.Children.count(allItems) - 1) lastChild = child;
  });
  return lastChild.props.eventKey;
};

const sortableTarget = {
  canDrop(props, monitor) {
    let isSibling = false;

    // Only allow re-ordering siblings
    React.Children.forEach(props.children.props.children, (child) => {
      if (isSibling) return;
      isSibling = child === monitor.getItem().children;
    });

    return isSibling;
  },

  hover(props, monitor, component) {
    // If we're dragging on top of an existing SortableItem - do nothing
    if (!component.props.isOverCurrent) return;

    // Not allowed to drop here
    if (!monitor.canDrop()) return;

    const item = monitor.getItem();
    const draggedKey = item.children.props.eventKey;
    const lastKey = _getLastChildKeyFromComponent(component);

    if (draggedKey !== lastKey) {
      item.onMove(draggedKey, lastKey);
    } else {
      item.onMoveReset();
    }
  },

  drop(props, monitor, component) {
    // Already dropped on a nested SortedItem - do nothing
    if (monitor.didDrop()) return;

    const item = monitor.getItem();

    // Dropped on the empty space in the Sortable component - put on the bottom
    const fromKey = item.children.props.eventKey;
    const lastKey = _getLastChildKeyFromComponent(component);
    item.onDrop(fromKey, lastKey);

    // Fire the onSort callback
    item.onSort(item, monitor);
  }
};

@DropTarget('SortableItem', sortableTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({shallow: true})
}))
export default class Sortable extends Component {
  static displayName: "Sortable";

  static propTypes = {
    children: PropTypes.any,
    connectDropTarget: PropTypes.func.isRequired,
    dragAxis: PropTypes.oneOf(['x', 'y']).isRequired,
    enabled: PropTypes.bool,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
    onSort: PropTypes.func
  }

  static defaultProps = {
    dragAxis: 'x',
    enabled: true,
    onSort: () => {}
  }

  constructor(props) {
    super(props);

    const parent = this.props.children ? React.Children.only(this.props.children) : null;

    this.state = {
      // A reference to the children props which will be used in the sorting calculation
      children: parent ? parent.props.children : [],

      // During draggin, at what index should the drop placeholder appear
      placeholderIndex: null
    };
  }

  componentWillUpdate(nextProps, nextState) {
    // If the children have changed, we need to update the local cache
    if (nextProps.children.props.children !== this.props.children.props.children) {
      nextState.children = nextProps.children.props.children;
    }
  }

  render() {
    // Safely handle empty elements
    if (!this.props.children) return <span/>;

    const {connectDropTarget, isOver} = this.props;
    const parent = React.Children.only(this.props.children);
    const classes = [
      'ui-sortable',
      parent.props.className
    ];

    const childCount = React.Children.count(this.state.children);

    return connectDropTarget(React.cloneElement(parent, {
      className: classes.join(' '),
      children: React.Children.map(this.state.children, (child, i) => {
        if (!child) return null;

        const result = [];
        if (isOver && i === this.state.placeholderIndex) {
          result.push(this._renderPlaceholder());
        }

        result.push(
          <SortableItem
            enabled={this.props.enabled}
            getSortOrder={this.getSortOrder}
            key={child.props.eventKey}
            onDrop={this._handleDrop}
            onMove={this._handleMove}
            onMoveReset={this._handleMoveReset}
            onSort={this.props.onSort}
            parentChildren={this.props.children.props.children}>
            {child}
          </SortableItem>
        );

        if (isOver && childCount === this.state.placeholderIndex && i === childCount - 1) {
          result.push(this._renderPlaceholder());
        }

        return result;
      })
    }));
  }

  _renderPlaceholder() {
    return (
      <div className={`ui-sortable-placeholder ui-sortable-placeholder-${this.props.dragAxis}`} style={{borderTop: '1px solid gray'}}/>
    );
  }

  getSortOrder = () => {
    const keys = [];
    React.Children.forEach(this.state.children, (c) => keys.push(c.props.eventKey));
    return keys;
  }

  _handleDrop = (fromKey, toKey) => {
    const {children} = this.state;

    let fromIndex = -1;
    let toIndex = -1;

    const childrenArray = [];

    React.Children.forEach(children, (c, i) => {
      if (c.props.eventKey === fromKey) fromIndex = i;
      if (c.props.eventKey === toKey) toIndex = i;
      childrenArray.push(c);
    });

    childrenArray.splice(toIndex, 0, childrenArray.splice(fromIndex, 1)[0]);

    this.setState({
      children: childrenArray
    });
  }

  _handleMove = (fromKey, toKey) => {
    const {children} = this.state;

    let fromIndex = null;
    let toIndex = null;

    React.Children.forEach(children, (c, i) => {
      if (c.props.eventKey === toKey) toIndex = i;
      if (c.props.eventKey === fromKey) fromIndex = i;
    });

    if (toIndex > fromIndex) toIndex++;

    this.setState({
      placeholderIndex: toIndex
    });
  }

  _handleMoveReset = () => {
    this.setState({
      placeholderIndex: null
    });
  }
}
