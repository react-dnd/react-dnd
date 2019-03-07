import * as React from 'react';
export default class FileList extends React.Component {
    render() {
        const { files } = this.props;
        if (files.length === 0) {
            return <div>Nothing to display</div>;
        }
        return <div>{this.list(files)}</div>;
    }
    list(files) {
        const label = (file) => `'${file.name}' of size '${file.size}' and type '${file.type}'`;
        return files.map(file => <li key={file.name}>{label(file)}</li>);
    }
}
