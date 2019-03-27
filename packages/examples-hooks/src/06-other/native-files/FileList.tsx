import React from 'react'

export interface FileListProps {
	files: any[]
}

function list(files: any[]) {
	const label = (file: { size: string; name: string; type: string }) =>
		`'${file.name}' of size '${file.size}' and type '${file.type}'`
	return files.map(file => <li key={file.name}>{label(file)}</li>)
}

const FileList: React.FC<FileListProps> = ({ files }) => {
	if (files.length === 0) {
		return <div>Nothing to display</div>
	}
	return <div>{list(files)}</div>
}

export default FileList
