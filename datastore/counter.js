const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

exports.getNextUniqueId = () => {
  readCounter((err, fileData) => {
    if (err) {
      console.log('no Id assigned');
    } else {
      counter = fileData + 1;
      counterString = zeroPaddedNumber(counter);
      writeCounter(counter, (err, counterString) => {
        if (err) {
          console.log('no id written');
        } else {
          callback(null, counterString);
        }
      });
    }
  });
};

exports.counterFile = path.join(__dirname, 'counter.txt');
