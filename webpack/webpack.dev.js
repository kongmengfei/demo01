const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);
const paths = require('./paths');

module.exports = {
    target: ['browserslist'],
    entry: paths.index,
    resolve: {
        extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx']
    },
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        path: paths.distRoot,
        filename: 'static/js/[name].[contenthash:5].js',
        chunkFilename: 'static/js/[name].[contenthash:5].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash][ext]',
        publicPath: '/',
        clean: true, // Clean the output directory before emit.
        //devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    infrastructureLogging: {
        appendOnly: true,
        level: 'verbose',
    },
    devServer: {
        hot: true,
        open: true,
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        },
        compress: true,
        static: {
            directory: paths.public,
            publicPath: ['/']
        },
        historyApiFallback: { disableDotRule: true, index: '/' },
        port: 3456
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: paths.srcRoot,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: "icss",
                            }
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                // 添加 autoprefixer 插件
                                plugins: [require("autoprefixer")],
                            }
                        }
                    }
                ]
            },
            {
                test: /\.module\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: "local",
                            }
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                // 添加 autoprefixer 插件
                                plugins: [require("autoprefixer")],
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /\.module\.(scss|sass)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            modules: {
                                mode: "icss"
                            }
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
                    "sass-loader"
                ]
            },
            {
                test: /\.module\.(scss|sass)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            modules: {
                                mode: "local"
                            }
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require("autoprefixer")]
                            },
                        },
                    },
                    "sass-loader"
                ]
            },
            // .bmp, .gif, .jpe?g, .png
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: imageInlineSizeLimit,
                    }
                }
            },
            {
                test: [/\.avif$/],
                type: 'asset',
                mimetype: 'image/avif',
                parser: {
                    dataUrlCondition: {
                        maxSize: imageInlineSizeLimit
                    }
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            prettier: false,
                            svgo: false,
                            svgoConfig: {
                                plugins: [{ removeViewBox: false }],
                            },
                            titleProp: true,
                            ref: true,
                        },
                    }
                ],
                issuer: {
                    and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: 'asset/inline',
            },
            {
                test:/\.ico$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './public/index.html'),
        }),
        new BundleAnalyzerPlugin(),
        new ESLintPlugin({ extensions: ['.js', '.ts', '.tsx', '.jsx'] })
    ],
    stats: "detailed",
    performance: {
        hints: 'warning'
    }
}