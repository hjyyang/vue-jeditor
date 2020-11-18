const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

let proConfig = merge(common, {
    // mode: "production",
    // devtool: "#source-map",
    plugins: [
        new MiniCssExtractPlugin({
            filename: "src/css/[name][hash:7].css",
        }),
    ],
    module: {
        //文件处理loader
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.resolve(
                                    __dirname,
                                    "./postcss.config.js"
                                ),
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
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
});
module.exports = proConfig;
