const webpack = require('webpack');
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            API_URL: JSON.stringify('http://163.18.43.223:8000'),
        }),
    ],
});