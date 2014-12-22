/*global describe, it */
'use strict';
var assert = require('assert');
var run = require('../');

describe('fos-build-md5sum node module', function () {
  it('must return HEAD for a given path', function () {
    assert(run('test'), 'HEAD is defined');
  });

  it('must return HEAD when no path is specified', function () {
    assert(run(null), 'HEAD is defined');
  });
});
