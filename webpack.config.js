const path = require('path')
const { DuplicatesPlugin } = require('inspectpack/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

const merge = require('webpack-merge');
const webpack = require('webpack');


const isDev = process.env.NODE_ENV === 'development'
const portENV = process.env.PORT = 3000
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
          chunks: 'all'
        }
    }
    
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
} 

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
        },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }
    
    return loaders
}

module.exports = {
    mode: 'development',
    
    entry: {main: './src/main.ts'},
    output: {
        filename: '[name].[hash:10].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.ts', '.vue'],
      alias: {
        'bootstrap-vue$': 'bootstrap-vue/src/index.js'
      }
    },
    optimization: optimization(),
    devServer: {
      port: portENV,
      open: true,
      hot: isDev,
      historyApiFallback: true
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './public/index.html',
        minify: {
            collapseWhitespace: isProd
        }
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[hash:10].bundle.css',
      }),
      new VueLoaderPlugin(),
      new DuplicatesPlugin(),
    ],
    module: {
      rules: [
        {
            test: /\.css$/,
            use: cssLoaders()
        },
        {
            test: /\.s(c|a)ss$/,
            //use: cssLoaders('sass-loader')
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                    }
                },
                'css-loader', 'sass-loader'
            ]
        },
        {
            test: /\.(png|jpg|svg|gif)$/,
            use: ['file-loader'] 
        },
        {
            test: /\.(ttf|woff|woff2)$/,
            use: ['file-loader'] 
        },

        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },  
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
            },
        },
        {
            test: /\.m?js$/,
            include: /node_modules/,
            type: "javascript/auto",
            loader: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }
        }
      ]
    },
}