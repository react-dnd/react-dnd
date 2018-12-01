---
path: "/docs/backends/touch-backend"
title: "Touch Backend"
---
*New to React DnD? [Read the overview](/docs/overview) before jumping into the docs.*

Touch Backend (3rd party)
===================

The HTML5 backend does not support the touch events. So it will not work in tablet and mobile devices. You can use third party backend such as [react-dnd-touch-backend](https://github.com/yahoo/react-dnd-touch-backend) for touch devices. 

For latest installation and usage guidelines, please go the link above. The below installation and usage may not be up to date with the third party repo. React DnD does not maintain this repository.

### Installation
Run the following command to install the touch backend.

```
npm install --save react-dnd-touch-backend
```


### Usage

```js
import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

class YourApp {
  /* ... */
}

export default DragDropContext(TouchBackend)(YourApp);
```