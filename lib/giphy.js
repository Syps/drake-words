var request = require('request');
var rp = require('request-promise');
var fs = require('fs');
var url = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=drake';

var getGIF = function(gifLocation, message, callback) {
	request.get(gifLocation)
		.pipe(fs.createWriteStream('./giphy.gif'))
		.on('finish', () => callback(message, fs.readFileSync('./giphy.gif')));
};

module.exports = function(message, callback) {
	request(url, function(error, response, body) {
		var data = JSON.parse(body);
		getGIF(data.data.image_original_url, message, callback);
	});
};