'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _config = require('config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_http2.default.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end(_config.config.consumerKey + '\n');
}).listen(1337, '127.0.0.1');

console.log('Check out 127.0.0.1:1337');