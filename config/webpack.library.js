const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

let config = {
	entry: path.resolve(__dirname, "../index.js"),
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "jeditor.js",
		library: "JEditor",
		libraryTarget: "umd",
		umdNamedDefine: true,
		globalObject: "this",
	},
	mode: "production", //development,production
	plugins: [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		// new CopyPlugin({
		// 	patterns: [
		// 		{
		// 			from: path.resolve(__dirname, "../node_modules/highlight.js/lib/languages"),
		// 			to: path.resolve(__dirname, "../dist/src/highlight/languages"),
		// 			noErrorOnMissing: true,
		// 		},
		// 		{
		// 			from: path.resolve(__dirname, "../node_modules/highlight.js/styles"),
		// 			to: path.resolve(__dirname, "../dist/src/highlight/styles"),
		// 			noErrorOnMissing: true,
		// 		},
		// 		{
		// 			from: path.resolve(__dirname, "../node_modules/highlight.js/lib/core.js"),
		// 			to: path.resolve(__dirname, "../dist/src/highlight"),
		// 			noErrorOnMissing: true,
		// 		},
		// 		{
		// 			from: path.resolve(__dirname, "../node_modules/highlight.js/lib/index.js"),
		// 			to: path.resolve(__dirname, "../dist/src/highlight"),
		// 			noErrorOnMissing: true,
		// 		},
		// 	],
		// }),
		new MiniCssExtractPlugin({
			filename: "src/css/style.css",
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
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "../../",
						},
					},
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							config: {
								path: path.resolve(__dirname, "./postcss.config.js"),
							},
						},
					},
					"sass-loader",
				],
			},
		],
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				//清除
				sourceMap: true, // 如果在生产中使用源映射，则必须设置为true
				terserOptions: {
					compress: {
						drop_console: true,
					},
				},
			}),
		],
	},
};

module.exports = config;
