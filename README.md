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

The `pool-watch` module has been written to monitor the distribution of the promise executions within a [promise pool](https://github.com/HQarroum/promise-pool) instance, by creating a live chart of the state of the promise pool executors.

## Usage

To use `pool-watch`, simply require it into your application holding an existing promise pool instance.

