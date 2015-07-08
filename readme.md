# gh-repos-creation-cal

> My beautiful module

[![Build Status](https://travis-ci.org/icyflame/gh-repos-creation-cal.svg?branch=master)](https://travis-ci.org/icyflame/gh-repos-creation-cal)

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)

## Install

```
$ npm install --save gh-repos-creation-cal
```


## Usage

```js
var ghReposCreationCal = require('gh-repos-creation-cal');

ghReposCreationCal('unicorns');
//=> unicorns & rainbows
```


## CLI

```
$ npm install --global gh-repos-creation-cal
```
```
$ gh-repos-creation-cal --help

  Usage
    gh-repos-creation-cal [input]

  Example
    gh-repos-creation-cal
    unicorns & rainbows

    gh-repos-creation-cal ponies
    ponies & rainbows

  Options
    --foo  Lorem ipsum. Default: false
```


## API

### ghReposCreationCal(input, [options])

#### input

*Required*  
Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [Siddharth Kannan](http://icyflame.github.io)
