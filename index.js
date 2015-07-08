'use strict';
module.exports = function (str) {
  var request = require('sync-request');

  var request_url = 'https://api.github.com/users/' + str + '/repos';

  var pageRegex = /page=([0-9]*)/g;
  var thisPage = 1;
  var lastPage;

  var creationDates = [];

  while (thisPage === 1 || thisPage <= lastPage) {

    if (lastPage === undefined) {
      console.log('Polling page 1 of the GitHub repostiories');
    } else {
      console.log('Polling page ' + thisPage + ' of ' + lastPage);
    }

    var req_options = { 'qs': {
                          'sort': 'created',
                          'direction': 'asc'
                        }, 'headers': {
                          'user-agent': 'https://github.com/icyflame/'
                        }
                      };

    if (thisPage !== 1) {

    }

    var res = request('GET', request_url, req_options);

    var allData = JSON.parse(res.getBody());
    allData.forEach(function (element, index, array) {
      console.log(element.created_at);

      var temp = new Date(element.created_at);

      creationDates.push([temp.getFullYear(),
                          temp.getMonth() + 1,
                          temp.getDate()
                          ]);
    });

    if (thisPage === 1) {
      if (res.headers.hasOwnProperty('link')) {
        lastPage = res.headers.link.match(pageRegex)[1];
        lastPage = parseInt(lastPage.split('=')[1]); // eslint-disable-line
      } else {
        lastPage = 1;
      }
    }

    thisPage += 1;
  }

  console.log(creationDates);

  var datesObj = {};

  creationDates.forEach(function (element, index, array) {
    var year = element[0];
    var month = element[1];
    var date = element[2];

    if (datesObj.hasOwnProperty(year)) {
      if (datesObj[year].hasOwnProperty(month)) {
        if (datesObj[year][month].hasOwnProperty(date)) {
          datesObj[year][month][date].count += 1;
        } else {
          datesObj[year][month][date] = {};
          datesObj[year][month][date].count = 1;
        }
      } else {
        datesObj[year][month] = {};
        datesObj[year][month][date] = {};
        datesObj[year][month][date].count = 1;
      }
    } else {
      datesObj[year] = {};
      datesObj[year][month] = {};
      datesObj[year][month][date] = {};
      datesObj[year][month][date].count = 1;
    }
  });
  console.log(require('util').inspect(datesObj, { depth: null }));
};
