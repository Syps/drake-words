var config = require('./config.json');
var Twitter = require('twitter');
var TweetMessage = require('./tweetMessage');
var DrakeGiphy = require('./giphy');
var fs = require('fs');

var msg, drake;

var client = new Twitter({
	consumer_key: config.consumerKey,
	consumer_secret: config.consumerSecret,
	access_token_key: config.accessTokenKey,
	access_token_secret: config.accessTokenSecret
});

var buildTweet = (message) => {

	var data = require('fs').readFileSync('./drake.jpg');

	client.post('media/upload', {
		media: data
	}, (error, media, response) => {

		if (!error) {

			// If successful, a media object will be returned.
			console.log(media);

			// Lets tweet it
			var status = {
				status: message,
				media_ids: media.media_id_string
			};

			client.post('statuses/update', status, (error, tweet, response) => {
				if (!error) {
					console.log(tweet);
				}
			});

		} else {
			console.log(error.message);
			console.log(error.stack);
		}
	});

};

TweetMessage((error, message) => {
	if (error) {
		return console.log(error);
	}
	DrakeGiphy(message, buildTweet);
});