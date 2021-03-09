const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SpritePlugin = require('extract-svg-sprite-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const glob = require('glob');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

function perName() {
	// loops through each component and SCSS file so split chunks can output them as separate files
	return glob.sync("./src/sass/components/*.scss")
		.reduce((obj, filename) => {
			const niceName = path.basename(filename).replace(/\.[^/.]+$/, "")
			obj[niceName] = {
				test: new RegExp(filename),
				name: niceName,
				chunks: 'all',
				enforce: true
			}
			return obj;
		}, {})
}

// main enty point for JS and main styles
let entries = {
	"main": ['./src/sass/main.scss', './src/index.js'],
	"wp-admin": './src/sass/wp-admin.scss',
};

// creates additional entry points for our components (SCSS only)
function getEntries() {
	const files = glob.sync("./src/sass/components/*.scss");
	files.forEach(file => {
		entries[path.basename(file).replace(/\.[^/.]+$/, "")] = file;
	});
	return entries;
}


module.exports = {
	context: __dirname,
	entry: getEntries(),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]-bundle.js'
	},
	mode: mode,
	devtool: (mode === 'development') ? 'inline-source-map' : false,
	module: {
		rules: [
			{
				enforce: 'pre',
				exclude: /node_modules/,
				test: /\.jsx$/,
				loader: 'eslint-loader'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			},
			{
				test: /\.svg$/,
				loader: SpritePlugin.loader,
			},
			{
				test: /\.s?css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', SpritePlugin.cssLoader, 'sass-loader']
			},
			{
				test: /\.(jpe?g|png|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'image-webpack-loader',
				enforce: 'pre'
			},
			{
				test: /\.(jpe?g|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'img/',
							name: '[name].[ext]'
						}
					},
					'img-loader'
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts/',
							name: '[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new SpritePlugin(),
		new StyleLintPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),

		new FixStyleOnlyEntriesPlugin(),
		new BrowserSyncPlugin({
			files: '**/*.php',
			proxy: 'https://assemblage.local',
			open: false
		})
	],
	optimization: {
		minimizer: [new UglifyJsPlugin(), new OptimizeCssAssetsPlugin()],
		splitChunks: {
			cacheGroups: perName()
		}
	},
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	}
};
