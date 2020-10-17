import React from 'react';
export const Overlay = ({ color }) => {
    return (<div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
    }}/>);
};
