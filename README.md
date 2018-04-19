# pool-watch
> A live chart renderer of the distribution of promises across a promise pool.

[![CodeFactor](https://www.codefactor.io/repository/github/hqarroum/pool-watch/badge)](https://www.codefactor.io/repository/github/hqarroum/pool-watch)

Current version: **1.0.0**

Lead Maintainer: [Halim Qarroum](mailto:hqm.post@gmail.com)

<p align="center">
	<br>
<a href="https://asciinema.org/a/YrNLcfAkFueFr0TLqhGXHgAFJ" target="_blank"><img src="https://asciinema.org/a/YrNLcfAkFueFr0TLqhGXHgAFJ.png" /></a>
	<br>
</p>

## Install

```sh
$ npm install --save pool-watch
```

## Description

The `pool-watch` module has been written to monitor the distribution of promise executions within a [promise pool](https://github.com/HQarroum/promise-pool) instance, by displaying a live chart of the state of the promise pool executors.

> This module is only compatible with a [`promise-pool`](https://github.com/HQarroum/promise-pool), and will not work for other pool implementations.

## Usage

To use `pool-watch`, simply require it into your application.

```js
const watch = require('pool-watch');
```

The returned `watch` function takes as an input a reference to the promise pool, as well as an `options` object which will be forwarded to [`progress-string`](https://github.com/watson/progress-string) which is used to create the chart.

The options you can pass as a second argument to `watch` are the following :

- `total` - (integer) The maximum amount of promises you would like to monitor (mandatory).
- `width` - (integer, default: 42) The width of the progress bar in chars
- `incomplete` - (string, default: `-`) The char used to indicate the
  incomplete part of the progress bar
- `complete` - (string, default: `=`) The char used to indicate the
  completed part of the progress bar
- `style` - (function, optional) See `options.style` below for details

> For more informations on the `options object`, see the [`progress-string`](https://github.com/watson/progress-string) module.

### Return value

The returned value of a call to the `watch` function is a Node.js [Stream](https://nodejs.org/api/stream.html), allowing you to `.pipe()` the live chart to any writable stream (e.g `process.stdout`, or a `net.Socket` for remote monitoring with `netcat`).

## Example

```js
// Creating the promise pool with `5` executors.
const pool = new Pool(5);
// The number of promises we'll insert.
const total = 1000;

// Configuring `watch` to display the live chart on `stdout`.
watch(pool, { total }).pipe(process.stdout);

// Scheduling promises in the pool.
for (let i = 0; i < total; ++i) {
  pool.schedule(() => new Promise((r) => setTimeout(r, 200)));
}
```

## See also

 - The [Promise Pool module](https://github.com/HQarroum/promise-pool)
 - [A promise pool watcher command-line application example](https://github.com/HQarroum/promise-pool/tree/master/examples/pool-monitoring)
 - The [`progress-string`](https://github.com/watson/progress-string) module
