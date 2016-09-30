var config = require('./config.json');
var Twitter = require('twitter');
var tweetMessage = require('./tweetMessage')

var client = new Twitter({
	consumer_key: config.consumerKey,
	consumer_secret: config.consumerSecret,
	access_token_key: config.accessTokenKey,
	access_token_secret: config.accessTokenSecret
});

console.log(tweetMessage());


client.post('statuses/update', {
	status: tweetMessage()
}, function(error, tweet, response) {
	if (error) {
		console.log(error);
	} else {
		console.log("Success:");
		console.log(tweet); // Tweet body.  
	}
});