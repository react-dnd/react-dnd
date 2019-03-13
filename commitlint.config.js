module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// 72 is too constricting, especially with a required subject
		'header-max-length': [2, 'always', '120'],
	},
}

// config-conventional defines the following subjects:
// 'build',
// 'chore',
// 'ci',
// 'docs',
// 'feat',
// 'fix',
// 'perf',
// 'refactor',
// 'revert',
// 'style',
// 'test'
