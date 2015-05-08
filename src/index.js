export { default as DragDropContext } from './decorateContext';
export { default as DragLayer } from './decorateLayer';
export { default as DragSource } from './decorateSource';
export { default as DropTarget } from './decorateTarget';

if (process.env.NODE_ENV !== 'production') {
  Object.defineProperty(exports, 'default', {
    get() {
      console.error(
        'React DnD does not provide a default export. ' +
        'You are probably missing the curly braces in the import statement. ' +
        'Read more: https://gist.github.com/gaearon/cf692e795a0e960b880e'
      );
    }
  });
}