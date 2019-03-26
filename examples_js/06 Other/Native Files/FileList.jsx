import React from 'react'
function list(files) {
  const label = file =>
    `'${file.name}' of size '${file.size}' and type '${file.type}'`
  return files.map(file => <li key={file.name}>{label(file)}</li>)
}
const FileList = ({ files }) => {
  return files.length === 0 ? (
    <div>Nothing to display</div>
  ) : (
    <div>{list(files)}</div>
  )
}
export default FileList
