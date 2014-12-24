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

  it('must return a consistent hash for the same file tree', function () {
    var a1 = run.md5('test/case/a');
    var a2 = run.md5('test/case/a');
    assert(a1 === a2, 'Result is consistent');
  });

  it('must return inconsistent hashes for different file trees', function () {
    var a = run.md5('test/case/a');
    var b = run.md5('test/case/b');
    assert(a !== b, 'Result is inconsistent');
  });

  it('must respect the globbing pattern', function () {
    var c1 = run.md5('test/case/c/1', { pattern: '*.js' });
    var c2 = run.md5('test/case/c/2', { pattern: '*.js' });
    assert(c1 === c2, 'Paths match');

    var c3 = run.md5('test/case/c/1', { pattern: '*' });
    var c4 = run.md5('test/case/c/2', { pattern: '*' });
    assert(c3 !== c4, 'Paths don\'t match');
  });
});
