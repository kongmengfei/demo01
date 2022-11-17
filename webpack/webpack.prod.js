const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                include: /src/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS                    
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                // 添加 autoprefixer 插件
                                plugins: [require("autoprefixer")],
                            },
                        },
                    },
                    // Compiles Sass to CSS
                    "sass-loader",
                ]
            },
            {
                test: /\.css$/,
                include: /src/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                // 添加 autoprefixer 插件
                                plugins: [require("autoprefixer")],
                            },
                        },
                    }
                ]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ],
}