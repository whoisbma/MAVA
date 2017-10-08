var path = require('path');

module.exports = {
	entry: './src/js/app.jsx',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'js/bundle.js',
		publicPath: 'http://localhost:8080/public'
	},
	module: {
		loaders: [
			{ 
				test: /\.jsx?$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015', 'react' ]
				}
			},
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"]
			}
		]
	}
}