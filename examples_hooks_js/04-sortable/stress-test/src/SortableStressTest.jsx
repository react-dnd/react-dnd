import React, { useState, useEffect } from 'react';
import { Container } from './Container';
export const SortableStressTest = () => {
    // Avoid rendering on server because the big data list is generated
    const [shouldRender, setShouldRender] = useState(false);
    // Won't fire on server.
    useEffect(() => setShouldRender(true), []);
    return <>{shouldRender && <Container />}</>;
};
