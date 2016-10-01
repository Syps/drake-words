var fs = require('fs');
var jsonfile = require('jsonfile');
var words = require('./wordList.json');

var capitalizeFirstLetter = (s) => {
	const firstLetter = s[0].toUpperCase();
	const rest = s.slice(1);
	return `${firstLetter}${rest}`; 
};

module.exports = (callback) => {
	fs.readFile(__dirname + '/count.txt', 'utf8', (err, data) => {
		if (err) {
			return callback(err);
		}
		const index = data.replace(/\s/g, "");
		var item = words.words[index];

		// o goodness yikes
		const word = Object.keys(item)[0];
		const definition = item[word];
		const message = `${capitalizeFirstLetter(word)} - ${capitalizeFirstLetter(definition)}`

		return callback(null, message, () => {
			fs.writeFile('./count.txt', parseInt(index, 10) + 1, (err) => {
				if (err) {
					return console.log(`Unable to increment word index:\n${err}`);
				}
			});
		});
	});
};