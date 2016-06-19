var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders'),
	  defaults = require('./webpack.shared.config');

let config = {
	entry: [
		'./src/app/index.jsx' // Your appʼs entry point
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: loaders
	}
};

module.exports = Object.assign({}, defaults, config);
