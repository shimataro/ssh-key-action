# node-alias
Alias the long version of a command to the short version, with optional messaging.

[![npm package](https://badge.fury.io/js/node-alias.svg)](https://www.npmjs.com/package/node-alias)
[![node version](https://img.shields.io/node/v/node-alias.svg?style=flat)](http://nodejs.org/download/)
[![build status](https://travis-ci.org/justinhelmer/node-alias.svg?branch=master)](https://travis-ci.org/justinhelmer/node-alias)
[![dependency status](https://david-dm.org/justinhelmer/node-alias.svg)](https://github.com/justinhelmer/node-alias)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/justinhelmer/node-alias/issues)

A very simple module for aliasing a command; works well with [commander.js](https://github.com/tj/commander.js) and [commander.js-error](https://github.com/justinhelmer/commander.js-error).

To demonstrate, here is an example from [npm-publish-release](https://github.com/justinhelmer/npm-publish-release); in file `bin/npm-publish-release.js`:

```js
require('node-alias')('npr', __dirname);
```

Produces:

```shell
$ npm-publish-release
[INFO]: You can also use 'npr' as an alias.
... # runs command
```

## Git style sub-commands

Also works with `git(1)` style sub-commands. Here is an example from [gh-release-manager](https://github.com/justinhelmer/gh-release-manager); in file `bin/gh-release-manager.js`:

```js
require('node-alias')('grm jsdoc', __dirname);
```

Assumes a file by the same name, converted to `kebab-case`, exists in the same location (i.e. `bin/grm-jsdoc.js`). If needed, a separate location can be specified using the `path` [option](#options).

## alias(short, path, options)

- **short** _{string}_ - The short command name. must be a file in **path** by the same name (as far as `require` is concerned).
- **path** _{string}_ - The path where the `short` command file actually exists. Pass `__dirname` to use the same directory (i.e. when using
                        [Git style sub-commands](#git-style-sub-commands) to pair with [commander.js](https://github.com/tj/commander.js/).
- **options** _{object}_ - Additional [options](#options) to customize the behavior.

## Options

- **message** _{mixed}_ - Can be `true`, `false`, or a custom message. If set to `true`, displays a default message. Defaults to `true`.
- **color** _{string}_ - Specify a custom [chalk](https://github.com/chalk/chalk) color for the message. Ignored if `message` === `false`.

## Contributing

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/justinhelmer/node-alias/issues)

## License

The MIT License (MIT)

Copyright (c) 2016 Justin Helmer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
