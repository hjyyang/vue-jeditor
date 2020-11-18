const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

let devConfig = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 3000,
        // open: true,
        host: "0.0.0.0",
    },
    devtool: "eval-source-map",
    module: {
        //文件处理loader
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
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
});
module.exports = devConfig;
