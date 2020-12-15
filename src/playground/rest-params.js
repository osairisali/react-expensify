const restAPI = (error, ...args) => {
  let callback;
  let funArg = args;

  if (typeof args[args.length - 1] === "function") {
    callback = args[args.length - 1];
    funArg = args.filter((el, index) => index !== args.length - 1);
    return callback(
      `error doesn't exist, but callback is there with arguments parameters: ${funArg}`
    );
  }

  if (error.text && callback) {
    return callback(
      `error parameter exist: ${error.text} with arguments parameters: ${funArg} and callback`
    );
  }

  return `error doesn't exist with callback. But arguments parameters are: ${funArg}`;
};
