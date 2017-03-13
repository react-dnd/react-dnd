import React, { Component } from 'react';
import { DragDropContext, DragDropContextProvider } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';
import FileList from './FileList';

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);

    this.handleFileDrop = this.handleFileDrop.bind(this);

    this.state = { droppedFiles: [] };
  }

  handleFileDrop(item, monitor) {
    if (monitor) {
      const droppedFiles = monitor.getItem().files;
      this.setState({ droppedFiles });
    }
  }

  render() {
    const { FILE } = NativeTypes;
    const { droppedFiles } = this.state;

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <TargetBox accepts={[FILE]} onDrop={this.handleFileDrop} />
          <FileList files={droppedFiles} />
        </div>
      </DragDropContextProvider>
    );
  }
}
