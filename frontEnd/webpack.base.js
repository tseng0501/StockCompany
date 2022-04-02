const path = require("path");
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('devextreme/bundles/dx.all');

module.exports = {
    entry: "./src/all.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        })
    ],
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        'presets': ['@babel/preset-env'],
                        "plugins": [
                            ["@babel/plugin-transform-runtime",       
                            {         
                              "regenerator": true       
                            }]
                        ]
                    }
                }
            },
            //用css loader來處理css檔案
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            //用sass loader來處理sass或scss檔案
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
             {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'compiled/fonts/[hash][ext][query]'
                }
            }
        ],
    },
};