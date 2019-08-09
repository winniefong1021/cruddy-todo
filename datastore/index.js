const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
var Promise = require('bluebird');

var items = {};

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
      console.log('error');
    } else {
      fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
        if (err) {
          console.log('error'); 
        } else {
          callback(null, { id, text });
        }
      });
    }
  });
};

exports.readAll = (callback) => {
  var promiseOne = 
    new Promise((resolve, reject) => { 
      fs.readdir(exports.dataDir, (err, files) => { 
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });

  promiseOne.then((files) => {
    new Promise((resolve, reject) => {
      var arr = [];
      for (var i = 0; i < files.length; i++) {
        var id = files[i].split('.')[0];
        var data = fs.readFileSync(path.join(exports.dataDir, files[i]), 'utf-8');
        var file = {id: id, text: data};
        arr.push(file);
      }
      console.log(arr);
      resolve(callback(null, arr));
    });

    // Promise.all([promiseTwo]).then(values => {
    //   // console.log('PromiseALL: ' , values);
    //   return values;
    // });
  });
};

exports.readOne = (id, callback) => {
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), 'utf8', (err, text) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text });
    }
  });
};

exports.update = (id, text, callback) => {
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), 'utf8', (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
        if (err) {
          console.log('error'); 
        } else {
          callback(null, ({id, text}));
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), 'utf8', (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.unlink(path.join(exports.dataDir, `${id}.txt`), (err) => {
        if (err) {
          callback(new Error(`No item with id: ${id}`));
        } else {
          callback(null, undefined);
        }
      });
    }
  });
};

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
