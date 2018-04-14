# pool-watch
> A live chart renderer of the distribution of promises across a promise pool, as a stream.

[![Build Status](https://travis-ci.org/HQarroum/pool-watch.svg?branch=master)](https://travis-ci.org/HQarroum/middleware-chain)
[![Code Climate](https://codeclimate.com/repos/55edafae69568006cf007c34/badges/cb599bae40767f430845/gpa.svg)](https://codeclimate.com/repos/55edafae69568006cf007c34/feed)

Current version: **1.0.8**

Lead Maintainer: [Halim Qarroum](mailto:hqm.post@gmail.com)

## Install

```sh
$ npm install --save pool-watch
```

## Description

The `pool-watch` module has been written to monitor the distribution of promise executions within a [promise pool](https://github.com/HQarroum/promise-pool) instance, by displaying a live chart of the state of the promise pool executors.

## Usage

To use `pool-watch`, simply require it into your application holding an existing promise pool instance.

```js
const watch = require('pool-watch');
```

The returned `watch` function takes as an input a reference to the promise pool, as well as an options object to pass to the [`progress-string`](https://github.com/watson/progress-string) module which is used to create the chart.

The options you can pass to `watch` are the following :

- `total` - (integer) The maximum amount of promises you would like to monitor (mandatory).
- `width` - (integer, default: 42) The width of the progress bar in chars
- `incomplete` - (string, default: `-`) The char used to indicate the
  incomplete part of the progress bar
- `complete` - (string, default: `=`) The char used to indicate the
  completed part of the progress bar
- `style` - (function, optional) See `options.style` below for details

> For more informations on the options object, see the [`progress-string`](https://github.com/watson/progress-string) module.

The returned value of a call to the `watch` function is a Node.js stream, meaning that you can `.pipe()` the live chart to any writable stream (e.g `process.stdout`).

## Example

```js
// Creating the promise pool with `5` executors.
const pool = new Pool(5);
// The number of inserted promises.
const total = 1000;

// Configuring `watch` to display the live chart on `stdout`.
watch(pool, { total }).pipe(process.stdout);

// Scheduling promises in the pool.
for (let i = 0; i < total; ++i) {
  pool.schedule(() => new Promise((r) => setTimeout(r, 200)));
}
```

> More examples are available in the [examples](./examples) directory.

## See also

 - The [Promise Pool module](https://github.com/HQarroum/promise-pool)
 - [A promise pool watcher command-line application example](https://github.com/HQarroum/promise-pool/tree/master/examples/pool-monitoring)
 - The [`progress-string`](https://github.com/watson/progress-string) module
