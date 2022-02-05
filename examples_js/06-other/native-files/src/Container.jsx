import { useState, useCallback } from 'react';
import { TargetBox } from './TargetBox.js';
import { FileList } from './FileList.js';
export const Container = () => {
    const [droppedFiles, setDroppedFiles] = useState([]);
    const handleFileDrop = useCallback((item) => {
        if (item) {
            const files = item.files;
            setDroppedFiles(files);
        }
    }, [setDroppedFiles]);
    return (<>
			<TargetBox onDrop={handleFileDrop}/>
			<FileList files={droppedFiles}/>
		</>);
};
