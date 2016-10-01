var request = require('request');
var rp = require('request-promise');
var fs = require('fs');
var fullPath = require('./full-path');
var url = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=drake';

var getGIF = function(gifLocation, message, callback) {
	const filePath = fullPath('giphy.gif');

	request.get(gifLocation)
		.pipe(fs.createWriteStream(filePath))
		.on('finish', () => callback(message, fs.readFileSync(filePath)));
};

module.exports = function(message, callback) {
	request(url, function(error, response, body) {
		var data = JSON.parse(body);
		getGIF(data.data.image_original_url, message, callback);
	});
};