var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders'),
		defaults = require('./webpack.shared.config');

let config = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8081', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./src/app/index.jsx' // Your appʼs entry point
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: loaders
	},
	devServer: {
		contentBase: "./public",
			noInfo: true, //  --no-info option
			hot: true,
			inline: true
		},
	plugins: [
		new webpack.NoErrorsPlugin()
	]
};

module.exports = Object.assign({}, defaults, config);

