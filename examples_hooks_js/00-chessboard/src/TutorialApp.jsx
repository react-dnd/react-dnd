import React, { useState, useEffect } from 'react';
import { Board } from './Board';
import { observe } from './Game';
const containerStyle = {
    width: 500,
    height: 500,
    border: '1px solid gray',
};
/**
 * The Chessboard Tutorial Application
 */
export const TutorialApp = () => {
    const [knightPos, setKnightPos] = useState([1, 7]);
    // the observe function will return an unsubscribe callback
    useEffect(() => observe((newPos) => setKnightPos(newPos)));
    return (<div>
			<div style={containerStyle}>
				<Board knightPosition={knightPos}/>
			</div>
		</div>);
};
