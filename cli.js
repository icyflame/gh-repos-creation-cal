#!/usr/bin/env node
'use strict';
var meow = require('meow');
var ghReposCreationCal = require('./');

var cli = meow({
  help: [
    'Usage',
    '  $ gh-repos-creation-cal username',
    '',
    'Examples',
    '  $ gh-repos-creation-cal icyflame --monthly',
    '  //=> Outputs the screenshot',
    '',
    'Options',
    '  --monthly Show the monthly repo-creation numbers.',
    '            Default: true',
    ''
  ]
});

if (cli.input.length < 1) {
  console.log('You must enter the GitHub `username`');
  process.exit(1);
}

ghReposCreationCal(cli.input[0], cli.flags);
