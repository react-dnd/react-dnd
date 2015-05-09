export default function checkDecoratorArguments(functionName, signature, ...args) {
  if (process.env.NODE_ENV !== 'production') {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg && arg.prototype && arg.prototype.render) {
        console.error(
          `You seem to be applying ${functionName} arguments in the wrong order. ` +
          `It should be ${functionName}(${signature})(Component), not the other way around. ` +
          `Read more: https://gist.github.com/gaearon/738da07796d2e34af5ba`
        );
        return;
      }
    }
  }
}