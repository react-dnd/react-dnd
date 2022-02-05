import { BoxWithImage } from './BoxWithImage.js';
import { BoxWithHandle } from './BoxWithHandle.js';
export const Container = () => {
    return (<div>
			<div style={{ marginTop: '1.5rem' }}>
				<BoxWithHandle />
				<BoxWithImage />
			</div>
		</div>);
};
