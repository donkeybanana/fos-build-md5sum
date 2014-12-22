'use strict';
var extend = require('util-extend');
var crypto = require('crypto');
var glob = require('glob');
var fs = require('fs');

var defaults = {
  encoding: 'base64',
  algorithm: 'md5'
};

var cwd = process.cwd();

module.exports = function (path, config) {
  config = extend(defaults, config);

  if (path) {
    process.chdir(path);
  }

  var create_hash = function(data) {
    var hash = crypto.createHash(config.algorithm).update(data);
    return hash.digest(config.encoding);
  };

  var hash_file = function (path) {
    var data = fs.readFileSync(path);
    return create_hash(data);
  };

  var manifest = {};
  var files = glob.sync('**/!(production).(js|css|ejs)');

  files.map(function(file){
    manifest[file] = hash_file(file);
  });

  process.chdir(cwd);

  return create_hash(JSON.stringify(manifest));

  // fs.writeFileSync('manifest', JSON.stringify(manifest));
  //
  // console.log('Hash path:', hash_file('manifest'));
  // console.log('Hash string:', create_hash(JSON.stringify(manifest)));
};
