let fs = require('fs');
const { readFile, writeFile } = require('fs');
const { parse } = require('path');

let path = "./";

let outputVoltage = 12
let refVoltageFeedBack = 0.6

let coefficient = outputVoltage / refVoltageFeedBack - 1


fs.readdir(path, function (err, items) {
  let file = './db_resistors.txt';
  console.log("have DB: " + file);
  readFile(file, 'utf-8', function (err, contents) {
    if (err) {
      console.log(err);
      return;
    }
    let stringValues = contents.split('\n');
    let arrValues = [];
    stringValues.forEach(function (item, i, arr) {
      arrValues.push(parseFloat(item, 10));
    })
    arrValues.forEach(function (item, i, arr) {
      let r1 = item
      let r2 = item * coefficient
      arrValues.forEach(function (item, i, arr) {
        if (r2 === item) {
          console.log("r1: " + r1 + " r2: " + r2 + '\n')
        }
      })
    })
  })
});
