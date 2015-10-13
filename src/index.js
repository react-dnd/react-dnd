export { default as DragDropContext } from './DragDropContext';
export { default as DragLayer } from './DragLayer';
export { default as DragSource } from './DragSource';
export { default as DropTarget } from './DropTarget';

if (process.env.NODE_ENV !== 'production') {
  Object.defineProperty(exports, 'default', {
    get() {
      console.error( // eslint-disable-line no-console
        'React DnD does not provide a default export. ' +
        'You are probably missing the curly braces in the import statement. ' +
        'Read more: http://gaearon.github.io/react-dnd/docs-troubleshooting.html#react-dnd-does-not-provide-a-default-export'
      );
    }
  });
}