let webpack = require('webpack'),
	  loaders = require('./webpack.loaders');


module.exports = function (config) {
	config.set({

		browsers: [ 'Chrome' ],

		singleRun: true,

		frameworks: [ 'mocha' ],

		files: [
			'tests.webpack.js'
		],

		preprocessors: {
			'tests.webpack.js': [ 'webpack', 'sourcemap' ]
		},

		reporters: ['mocha'],

		webpack: {
			devtool: 'inline-source-map',
			module: {
				loaders: loaders
			}
		},

		webpackServer: {
			noInfo: true
		}

	});
};
