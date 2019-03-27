// declare var require: any
// const shallowEqual = require('shallowequal')
import { useState } from 'react';
/**
 *
 * @param monitor The monitor to colelct state from
 * @param collect The collecting function
 * @param onUpdate A method to invoke when updates occur
 */
export function useCollector(monitor, collect, onUpdate) {
    const [collected, setCollected] = useState(() => collect(monitor));
    const updateCollected = () => {
        const nextValue = collect(monitor);
        // TODO: we need this shallowequal check to work
        // so that we can operate performantly, but the examples
        // are broken with it in currently
        // if (!shallowEqual(collected, nextValue)) {
        setCollected(nextValue);
        if (onUpdate) {
            onUpdate();
        }
        // }
    };
    return [collected, updateCollected];
}
