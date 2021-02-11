import { useState, useCallback } from 'react';
import { TargetBox } from './TargetBox';
import { HTMLContent } from './HTMLContent';
export const Container = () => {
    const [droppedHTML, setDroppedHTML] = useState('');
    const handleHTMLDrop = useCallback((item, monitor) => {
        if (monitor) {
            const html = monitor.getItem().html;
            setDroppedHTML(html);
        }
    }, []);
    return (<>
			<iframe srcDoc={`<img src='https://react-dnd.github.io/react-dnd/favicon-32x32.png' />`}/>
			<TargetBox onDrop={handleHTMLDrop}/>
			<HTMLContent html={droppedHTML}/>
		</>);
};
