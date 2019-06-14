import React from 'react'
function list(files) {
  const label = file =>
    `'${file.name}' of size '${file.size}' and type '${file.type}'`
  return files.map(file => <li key={file.name}>{label(file)}</li>)
}
const FileList = ({ files }) => {
  if (files.length === 0) {
    return <div>Nothing to display</div>
  }
  return <div>{list(files)}</div>
}
export default FileList
