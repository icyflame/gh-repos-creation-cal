'use strict';
module.exports = function (str) {

  var pageRegex = /page=([0-9]*)/g;

  var request_url = 'https://api.github.com/' +
                    'users/' +
                    str +
                    '/repos?sort=created&direction=asc';

  var request = require('sync-request');

  var thisPage = 1;
  var lastPage = undefined;

  while (thisPage === 1 || thisPage <= lastPage) {

    console.log('Polling page ' + thisPage + ' of ' + lastPage);

    var res = request('GET', request_url + (thisPage !== 1 ?
                                          ('&page=' + thisPage) :
                                          '') , {
      'headers': {
        'user-agent': 'https://github.com/icyflame/'
      }
    });

    var allData = JSON.parse(res.getBody());
    allData.forEach(function (element, index, array) {
      console.log(element.created_at);
    });

    if (thisPage === 1) {
      if (res.headers.hasOwnProperty('link')) {
        lastPage = res.headers.link.match(pageRegex)[1];
        lastPage = parseInt(lastPage.split('=')[1]);
      } else {
        lastPage = 1;
      }
    }

    thisPage += 1;
  }
};
