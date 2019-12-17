import React from "react";
import TargetBox from "./TargetBox";
import FileList from "./FileList";

class Container extends React.PureComponent {
  state = { droppedFiles: [] };

  handleFileDrop = (_, monitor) => {
    if (monitor) {
      const files = monitor.getItem().files;
      this.setState({ droppedFiles: files });
    }
  };

  render() {
    return (
      <>
        <TargetBox onDrop={this.handleFileDrop} />
        <FileList files={this.state.droppedFiles} />
      </>
    );
  }
}
export default Container;
