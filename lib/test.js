var fs = require('fs');
var f = __dirname + '/count.txt';

fs.readFile(f, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});