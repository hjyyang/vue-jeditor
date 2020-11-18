const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

let config = {
	entry: path.resolve(__dirname, "../main.js"),
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "bundle[hash:7].js",
	},
	mode: process.env.NODE_ENV == "development" ? "development" : "production",
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.resolve(__dirname, "../index.html"),
			inject: "body",
		}),
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "../src/css/monokai-sublime.css"),
					to: path.resolve(__dirname, "../dist/src/css/monokai-sublime.css"),
					noErrorOnMissing: true,
				},
			],
		}),
	],
	module: {
		//文件处理loader
		rules: [
			{
				test: /(\.vue)$/, //正则表达式匹配规则
				exclude: /node_modules/, //排除项目依赖包目录
				use: [
					//使用vue-loader加载器
					"vue-loader",
				],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									targets: {
										node: "current",
										chrome: "52",
										ie: "9",
									},
								},
							],
						],
						plugins: ["@babel/plugin-transform-runtime"],
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(png|jpg|gif|jpeg|svg)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							esModule: false,
							name: "[path][name].[ext]",
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: "file-loader?name=src/font/[name].[ext]",
			},
			{
				test: /\.(md)$/,
				use: [
					{
						loader: "raw-loader",
					},
				],
			},
		],
	},
};

module.exports = config;
