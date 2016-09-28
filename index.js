var express = require('express');
var app = express();
var request = require('request');
var jsonfile = require('jsonfile');
var config = require('./config.json');
var drizzy = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=';


app.get('/:keyword', (req, res) => {

	var keyword = req.params.keyword

	var showThemTheWay = (url) => { res.redirect(url); };

	request(drizzy + keyword, (error, response, body) => {
		var data = JSON.parse(body);
		showThemTheWay(data.data.image_original_url);
	});
});

//apps.twitter.com

app.listen(1337);
console.log('Check out 127.0.0.1:1337');