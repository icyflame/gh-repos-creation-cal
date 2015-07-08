'use strict';
module.exports = function (str, opts) {
  var ghRepos = require('github-repositories');
  var barHorizontal = require('bar-horizontal');
  var isEmpty = require('is-empty');

  var creationDates = [];

  ghRepos(str, function (err, data) {
    if (err) {
      throw err;
    }

    data.forEach(function (element, index, array) {
      // console.log(element.created_at);

      var temp = new Date(element.created_at);

      creationDates.push([temp.getFullYear(),
        temp.getMonth() + 1,
        temp.getDate()
      ]);
    });

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
    // console.log(require('util').inspect(datesObj, { depth: null }));

    var this_month;

    var barObj = {};

    if (isEmpty(opts) || opts.monthly) {
      for (var year in datesObj) {
        for (var month in datesObj[year]) {
          this_month = 0;
          for (var date in datesObj[year][month]) {
            this_month += datesObj[year][month][date].count;
          }
          barObj[year + '-' + month + ' (' + this_month + ')'] = this_month;
        }
      }
      console.log('');
      barHorizontal(barObj, {labels: true});
      console.log('');
    } else {
      console.log('That option has not been implemented yet!');
    }
  });
};
