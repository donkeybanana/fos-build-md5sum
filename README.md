#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> FrogOS Build MD5sum

Generate a unique identifier for matched files within a given path.

## Install

```sh
$ npm install --save fos-build-md5sum
```

## Usage

```js
var fos-build-md5sum = new (require('fos-build-md5sum'))();
```

## Options

Configuration may be specified via the constructor or the prototype `this.options()` method:

```js
// Instantiation
var fos-build-md5sum = new (require('fos-build-md5sum'))({
  pattern: '*.js'
});

// Runtime
fos-build-md5sum.options({
  root: 'some/new/path'
});
```

### `pattern`

Default: `**.*`

The [`glob`](https://github.com/isaacs/node-glob) pattern of the files to match.

### `encoding`

Default: `base64`

From the [`hash.digest([encoding])`](http://nodejs.org/api/crypto.html#crypto_hash_digest_encoding) man page:

> Calculates the digest of all of the passed data to be hashed. The encoding can be `hex`, `binary` or `base64`. If no encoding is provided, then a buffer is returned.

### `algorithm`

Default: `md5`

From the [`crypto.createHash(algorithm)`](http://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm) man page:

> Creates and returns a hash object, a cryptographic hash with the given algorithm which can be used to generate hash digests.
>
> `algorithm` is dependent on the available algorithms supported by the version of OpenSSL on the platform. Examples are `sha1`, `md5`, `sha256`, `sha512`, etc. On recent releases, `openssl list-message-digest-algorithms` will display the available digest algorithms.

### `dest`

Default: `production.md5`

The filepath to read a saved hash from via `this.compare()`, relative to `config.root`.

### `root`

Base path to match `config.pattern`.

## License

MIT © [Alan Burgoyne](https://github.com/donkeybanana)


[npm-url]: https://npmjs.org/package/fos-build-md5sum
[npm-image]: https://badge.fury.io/js/fos-build-md5sum.svg
[travis-url]: https://travis-ci.org/donkeybanana/fos-build-md5sum
[travis-image]: https://travis-ci.org/donkeybanana/fos-build-md5sum.svg?branch=master
[daviddm-url]: https://david-dm.org/donkeybanana/fos-build-md5sum.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/donkeybanana/fos-build-md5sum
