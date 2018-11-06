const siteMetadata = {
	title: 'React DnD',
	githubUrl: 'https://github.com/react-dnd/react-dnd/',
	description: 'Drag and Drop for React',
	keywords: [
		'react',
		'reactjs',
		'file',
		'drag',
		'drop',
		'html5',
		'draggable',
		'droppable',
		'drag-and-drop',
		'dnd',
		'javascript',
		'react-component',
	],
}
module.exports = {
	siteMetadata,
	pathPrefix: '/react-dnd',
	plugins: [
		'gatsby-plugin-typescript',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-favicon',

		// Handle Markdown Content
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: ['gatsby-remark-prismjs'],
			},
		},

		// Load up typography style settings
		{
			resolve: 'gatsby-plugin-typography',
			options: {
				pathToConfigModule: 'src/configs/typography.js',
			},
		},

		// Load Markdown Content
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/docs`,
				name: 'markdown-pages',
			},
		},

		// Laod Images
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'gatsby-starter-default',
				short_name: 'starter',
				start_url: '/',
				background_color: '#663399',
				theme_color: '#663399',
				display: 'minimal-ui',
				icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		// 'gatsby-plugin-offline',
	],
}
