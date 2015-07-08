#!/usr/bin/env node
'use strict';
var meow = require('meow');
var ghReposCreationCal = require('./');

var cli = meow({
  help: [
    'Usage',
    '  $ gh-repos-creation-cal [input]',
    '',
    'Examples',
    '  $ gh-repos-creation-cal',
    '  unicorns & rainbows',
    '',
    '  $ gh-repos-creation-cal ponies',
    '  ponies & rainbows',
    '',
    'Options',
    '  --foo  Lorem ipsum. Default: false'
  ]
});

ghReposCreationCal(cli.input[0]);
