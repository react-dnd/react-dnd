import * as React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';
import FileList from './FileList';
export default class Container extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { droppedFiles: [] };
        this.handleFileDrop = (item, monitor) => {
            if (monitor) {
                const droppedFiles = monitor.getItem().files;
                this.setState({ droppedFiles });
            }
        };
    }
    render() {
        const { FILE } = NativeTypes;
        const { droppedFiles } = this.state;
        return (<>
				<TargetBox accepts={[FILE]} onDrop={this.handleFileDrop}/>
				<FileList files={droppedFiles}/>
			</>);
    }
}
