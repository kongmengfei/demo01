const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, '..', './build'),
        filename: '[name]-bundle.js',
        assetModuleFilename: 'images/[name]-[hash][ext][query]',
        hashDigestLength: 5,
        clean: true // Clean the output directory before emit.
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './public/index.html'),
        }),        
        new ESLintPlugin({ extensions: ['.js', '.ts'] })
    ],
    stats: 'errors-only'
}