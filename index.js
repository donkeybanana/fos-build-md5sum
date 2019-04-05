'use strict';
const extend = require('util-extend');
const hasha = require('hasha');
const glob = require('glob');
const fs = require('fs');
const p = require('path');

module.exports = class BuildSumMD5 {
  get options() {
    return this.config;
  }
  set options(options = {}) {
    this.config = {
      encoding: 'base64',
      algorithm: 'md5',
      pattern: '**/*.*',
      dest: 'production.md5',
      root: './',
      ...options
    };

    return this.config;
  }

  constructor(options = {}) {
    this.config = options;
  }

  create_hash(data) {
    return hasha(data, this.config);
  }

  hash_file(path) {
    const data = fs.readFileSync(path);
    return this.create_hash(data);
  }

  create_hash(data) {
    return hasha(data, this.config);
  }

  compare(file) {
    const path = p.normalize(this.config.root + '/' + file + '/');

    // Read current version
    const newsum = this.read(file);

    // Cached path
    const pathsum = path + this.options.dest;

    // Read cached version
    var oldsum = -1;
    if (fs.existsSync(pathsum)) {
      oldsum = fs
        .readFileSync(pathsum)
        .toString('utf-8')
        .split('\n')[0];
    }

    // Compare versions
    return oldsum === newsum;
  }

  read(file) {
    const path = p.normalize(this.config.root + '/' + file + '/');
    const files = glob.sync(path + this.config.pattern);

    // Build matching files list
    var manifest = {};
    files.map(
      function(f) {
        manifest[f.replace(path, '')] = this.hash_file(f);
      }.bind(this)
    );

    // Return hash of matching files list
    return this.create_hash(JSON.stringify(manifest));
  }
};
