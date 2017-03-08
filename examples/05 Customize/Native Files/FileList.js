import React, {PropTypes, Component} from 'react'

export default class FileList extends Component {
    static propTypes = {
        files: PropTypes.arrayOf(PropTypes.object)
    };

    render() {
        const {files} = this.props

        return (
            <div>
                <ul>
                    {
                        files.length
                        ?
                        files.map(file =>
                            <li key={file.name}>{`'${file.name}'' of size '${file.size}' and type '${file.type}'`}</li>
                        )
                        :
                        'Nothing to display'
                    }
                </ul>
            </div>
        )
    }
}
