var config = require('./config.json');
var fullPath = require('./full-path');
var Twitter = require('twitter');
var TweetMessage = require('./tweetMessage');
var DrakeGiphy = require('./giphy');

var msg, drake;

var client = new Twitter({
	consumer_key: config.consumerKey,
	consumer_secret: config.consumerSecret,
	access_token_key: config.accessTokenKey,
	access_token_secret: config.accessTokenSecret
});

var buildTweet = (callback) => {
	return (message) => {

		var data = require('fs').readFileSync(fullPath('giphy.gif'));

		client.post('media/upload', {
			media: data
		}, (error, media, response) => {

			if (!error) {

				var status = {
					status: message,
					media_ids: media.media_id_string
				};

				client.post('statuses/update', status, (error, tweet, response) => {
					if (!error) {
						console.log("success");
						callback();
					}
					console.log(error);
				});

			} else {
				// TODO:
				// - catch media upload file size error and retry w/new gif
				console.log(error.message);
				console.log(error.stack);
			}
		});
	};
};

TweetMessage((error, message, callback) => {
	if (error) {
		return console.log(error);
	}
	DrakeGiphy(message, buildTweet(callback));
});
