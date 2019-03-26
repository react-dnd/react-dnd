import React from 'react'

function list(files: any[]) {
	const label = (file: { size: string; name: string; type: string }) =>
		`'${file.name}' of size '${file.size}' and type '${file.type}'`
	return files.map(file => <li key={file.name}>{label(file)}</li>)
}

export interface FileListProps {
	files: any[]
}

const FileList: React.FC<FileListProps> = ({ files }) => {
	return files.length === 0 ? (
		<div>Nothing to display</div>
	) : (
		<div>{list(files)}</div>
	)
}

export default FileList
