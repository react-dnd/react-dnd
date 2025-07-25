---
path: '/examples/customize/drop-effects'
title: 'Drop Effects'
---

Some browsers let you specify the “drop effects” for the draggable
items. Drop effects can be set on the drag source, the drop target
or if the user presses the alt key. The logic for setting the drop
effect is as follows:

1. If the drag source specifies a drop effect, use that.
2. Else if the drop target specifies a drop effect, use that.
3. Else if the user is pressing the alt key, then use the copy effect

<view-source name="05-customize/drop-effects" component="customize-drop-effects">
</view-source>
