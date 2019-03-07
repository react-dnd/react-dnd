import * as React from 'react';
import Box from './Box';
const styles = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)',
};
const BoxDragPreview = ({ title }) => {
    const [tickTock, setTickTock] = React.useState(false);
    React.useEffect(function subscribeToIntervalTick() {
        const interval = setInterval(() => setTickTock(!tickTock), 500);
        return () => clearInterval(interval);
    });
    return (<div style={styles}>
			<Box title={title} yellow={tickTock}/>
		</div>);
};
export default BoxDragPreview;
