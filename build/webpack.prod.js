const path = require('path');
const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);
module.exports = {
    target: ['browserslist'],
    entry: paths.index,
    resolve: {
        extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx']
    },
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: paths.distRoot,
        filename: 'static/js/[name].[hash:5].js',
        chunkFilename: 'static/js/[name].[hash:5].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash][ext]',
        publicPath: '/',
        clean: true, // Clean the output directory before emit.
        //devtoolModuleFilenameTemplate: (info) => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
    },
    infrastructureLogging: { level: 'none' },
    optimization: {
        minimize: true
    },
    bail: true,
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
                    MiniCssExtractPlugin.loader,
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
                                plugins: ["postcss-preset-env"]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                                plugins: ["postcss-preset-env"]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /\.module\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                                plugins: ["postcss-preset-env"]
                            },
                        },
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.module\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                                plugins: ["postcss-preset-env"]
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
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: false,
                            mozjpeg: {
                                progressive: true,
                            },
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                preset: 'default',
                                quality: 80
                            }
                        }
                    }
                ]
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './public/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name]-[hash:5].css'
        }),
        new BundleAnalyzerPlugin(),
        new ESLintPlugin({ extensions: ['.js', '.ts', '.tsx', '.jsx'] })
    ],
    stats: "errors-warnings",
    performance: false
}