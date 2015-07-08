'use strict';
module.exports = function (str) {
  var ghRepos = require('github-repositories');

  var creationDates = [];

  ghRepos('icyflame', function (err, data) {
    if (err) {
      throw err;
    }
    
    data.forEach(function (element, index, array) {
      console.log(element.created_at);

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
    console.log(require('util').inspect(datesObj, { depth: null }));

  });
};
