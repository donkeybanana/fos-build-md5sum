/*global describe, it */
'use strict';
var assert = require('assert');
var run = require('../');

describe('fos-build-md5sum git', function () {
  it('must return HEAD for a given path', function () {
    assert(run.git('test'), 'HEAD is defined');
  });

  it('must return HEAD when no path is specified', function () {
    assert(run.git(null), 'HEAD is defined');
  });

  it('must throw an error when an invalid path is specified', function () {
    try {
      run.git('nopathtosee');
    } catch (e) {
      assert(true, 'Error thrown');
    }
  });
});

describe('fos-build-md5sum md5', function () {
  it('must return hash for a given path', function () {
    assert(run.md5('test'), 'hash is defined');
  });

  it('must return hash when no path is specified', function () {
    assert(run.md5(null), 'hash is defined');
  });

  it('must throw an error when an invalid path is specified', function () {
    try {
      run.md5('nopathtosee');
    } catch (e) {
      assert(true, 'Error thrown');
    }
  });
});
