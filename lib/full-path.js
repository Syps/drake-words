module.exports = (fileName) => {
	return __dirname + (__dirname.slice(__dirname.length - 3) === 'lib' 
	? `/${fileName}`
	: `/lib/${fileName}`);
};