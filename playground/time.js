const moment = require('moment');


// Using VanillaJS to handle timestamping is cumbersome
// Unix epoch: Jan 1st 1970 00:00:00 am
// const date = new Date();
// console.log(date.getMonth()); // 0 for January, 11 for December


const date = moment();
// date.add(100, 'year'); // change year to 2117
date.subtract(34, 'year');
// console.log(date.format('MMM Do, YYYY')); // Jan 6th, 2017


// 6:30 pm
const date1 = moment();
console.log(date1.format('h:MM a'));
