export default function checkDecoratorArguments(
	functionName,
	signature,
	...args
) {
	if (process.env.NODE_ENV !== 'production') {
		for (let i = 0; i < args.length; i += 1) {
			const arg = args[i]
			if (arg && arg.prototype && arg.prototype.render) {
				// eslint-disable-next-line no-console
				console.error(
					'You seem to be applying the arguments in the wrong order. ' +
						`It should be ${functionName}(${signature})(Component), not the other way around. ` +
						'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#you-seem-to-be-applying-the-arguments-in-the-wrong-order',
				)
				return
			}
		}
	}
}
