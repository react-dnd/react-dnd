const replace = require('replace-in-file')

replace.sync({
	files: 'react-dnd/lib/**/*.js',
	from: '/require("dnd-core")/',
	to: 'require("dnd-core-cjs")',
})

replace.sync({
	files: 'html5-backend/lib/**/*.js',
	from: '/require("dnd-core")/',
	to: 'require("dnd-core-cjs")',
})
