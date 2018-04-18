const progress = require('progress-string');
const diff     = require('ansi-diff-stream');

/**
 * Called back when promises are enqueued or have been
 * executed on the pool.
 */
const hook = (type, opts, bars, pool, out) => (e) => {
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
  const bars = [];
  const out  = diff();

  opts.total = +opts.total / (pool.opts.size > 1 ? pool.opts.size - 1 : 1);
  if (typeof pool !== 'object') {
    throw new Error('An instance to a promise pool is required');
  }

  // Initializing the progress bars.
  const array = pool.promises();
  for (let i = 0; i < array.length; ++i) {
    bars.push({ count: array[i].load, progress: progress(opts), idx: array[i].idx });
  }

  // Subscribing to lifecycle events on the pool.
  const before = hook('before', opts, bars, pool, out);
  const after  = hook('after', opts, bars, pool, out);
  pool.on('before.enqueue.each', before).on('after.each', after);
  
  // Allowing to stop the exection.
  out.detach = () => pool.removeListener('before.enqueue.each', before).removeListener('after.each', after);
  return (out);
};