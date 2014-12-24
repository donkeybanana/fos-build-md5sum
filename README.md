#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> FrogOS Build MD5sum

Generate a unique identifier for files within a given path.

## Install

```sh
$ npm install --save fos-build-md5sum
```


## Usage

### Local

```js
var fos-build-md5sum = require('fos-build-md5sum')
  , path = '/var/www/app/' // Path to parse
  , hash;

// MD5
hash = fos-build-md5sum.md5(path);

// git
hash = fos-build-md5sum.git(path);
```

### Global

```sh
$ npm install --global fos-build-md5sum
$ fos-build-md5sum --help
```


## License

MIT © [Alan Burgoyne](https://github.com/donkeybanana)


[npm-url]: https://npmjs.org/package/fos-build-md5sum
[npm-image]: https://badge.fury.io/js/fos-build-md5sum.svg
[travis-url]: https://travis-ci.org/donkeybanana/fos-build-md5sum
[travis-image]: https://travis-ci.org/donkeybanana/fos-build-md5sum.svg?branch=master
[daviddm-url]: https://david-dm.org/donkeybanana/fos-build-md5sum.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/donkeybanana/fos-build-md5sum
