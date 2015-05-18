var context = require.context('./examples', true, /-test\.js$/);
context.keys().forEach(context);