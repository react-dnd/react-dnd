import * as React from 'react';
/*
 * A utility for rendering a drag preview image
 */
const DragPreviewImage = React.memo(({ connect, src }) => {
    if (typeof Image !== 'undefined') {
        const img = new Image();
        img.src = src;
        img.onload = () => connect(img);
    }
    return null;
});
export default DragPreviewImage;
