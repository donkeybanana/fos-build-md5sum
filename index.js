'use strict';
var exec = require('child_process').exec;
module.exports = function (path, next) {
  var command = 'git log -n1 --pretty=oneline';

  if (path) {
    command += ' -- ' + path;
  }

  exec(command, function(err, stdout, stderr) {
    var HEAD = stdout.split('\n')[0];
    next(stderr || err, HEAD);
  });
};
