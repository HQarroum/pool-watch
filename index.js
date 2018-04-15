const progress = require('progress-string');
const diff     = require('ansi-diff-stream');

/**
 * Refreshes the progress bars according to the
 * number of promises being executed in the pool.
 */
const refresh = (bars, size, out) => {
  let string = 'Balance of promises between executors:';
  for (let i = 0; i < size; ++i) {
    string += `\n${bars[i].progress(bars[i].count)} ${bars[i].count}`;
  }
  out.write(string);
};

/**
 * Called back when promises are enqueued or have been
 * executed on the pool.
 */
const hook = (type, bars, size, out) => (idx) => {
  bars[idx].count = type === 'after' ? bars[idx].count - 1 : bars[idx].count + 1;
  refresh(bars, size, out);
};

module.exports = (pool, opts) => {
  const bars = [];
  const out  = diff();

  opts.total = +opts.total / (pool.opts.size > 1 ? pool.opts.size - 1 : 1);
  if (typeof pool !== 'object') {
    throw new Error('An instance to a promise pool is required');
  }
  
  // Initializing the progress bars.
  for (let i = 0; i < pool.opts.size; ++i) {
    bars[i] = { count: 0 };
    bars[i].progress = progress(opts);
  }

  // Subscribing to lifecycle events on the pool.
  const before = hook('before', bars, pool.opts.size, out);
  const after  = hook('after', bars, pool.opts.size, out);
  pool.beforeEnqueueEach(before).afterEach(after);
  
  // Allowing to stop the exection.
  out.detach = () => pool.removeBeforeEnqueueEach(before).removeAfterEach(after);
  return (out);
};