export default function checkDecoratorArguments(functionName, signature, ...args) {
  if (process.env.NODE_ENV !== 'production') {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg && arg.prototype && arg.prototype.render) {
        console.error( // eslint-disable-line no-console
          `You seem to be applying the arguments in the wrong order. ` +
          `It should be ${functionName}(${signature})(Component), not the other way around. ` +
          `Read more: http://gaearon.github.io/react-dnd/docs-troubleshooting.html#you-seem-to-be-applying-the-arguments-in-the-wrong-order`
        );
        return;
      }
    }
  }
}