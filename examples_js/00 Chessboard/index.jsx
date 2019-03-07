// tslint:disable member-ordering
import * as React from 'react';
import Board from './Board';
import { observe } from './Game';
/**
 * Unlike the tutorial, export a component so it can be used on the website.
 */
const ChessboardTutorialApp = () => {
    const [knightPos, setKnightPos] = React.useState([1, 7]);
    React.useEffect(() => observe((newPos) => setKnightPos(newPos)));
    return (<div style={{
        width: 500,
        height: 500,
        border: '1px solid gray',
    }}>
			<Board knightPosition={knightPos}/>
		</div>);
};
export default ChessboardTutorialApp;
