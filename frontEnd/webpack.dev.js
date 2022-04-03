const webpack = require('webpack');
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            API_URL: JSON.stringify('http://127.0.0.1:8900'),
        }),
    ],
});