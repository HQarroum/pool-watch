const progress = require('progress-string');
const diff     = require('ansi-diff-stream');

/**
 * Called back when promises are enqueued or have been
 * executed on the pool.
 */
const hook = (opts, pool, out) => () => {
  let string = 'Balance of promises between executors:';
  const array = pool.promises();
  for (let i = 0; i < array.length; ++i) {
    if (!array[i].progress) {
      array[i].progress = progress(opts);
    }
    string += `\n${array[i].progress(array[i].load)} ${array[i].load}`;
  }
  out.write(string);
};

module.exports = (pool, opts) => {
  const out = diff();

  opts.total = +opts.total / (pool.opts.size > 1 ? pool.opts.size - 1 : 1);
  if (typeof pool !== 'object') {
    throw new Error('An instance to a promise pool is required');
  }

  // Subscribing to lifecycle events on the pool.
  const h = hook(opts, pool, out);
  pool.on('before.enqueue.each', h).on('after.each', h);
  
  // Allowing to stop the exection.
  out.detach = () => pool.removeListener('before.enqueue.each', h).removeListener('after.each', h);
  return (out);
};