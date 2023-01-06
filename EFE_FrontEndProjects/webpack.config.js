const path = require('path');

const {DefinePlugin} = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;

module.exports = {
    mode: "development",
    entry: "./src/script/index.ts",
    resolve: {
        extensions: [".js", ".ts", ".vue"],
        alias: {
            "#": "/src/"
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader",
            },
            {
                test: /\.(ts|js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
            },
            {
                test: /.(png|svg|jpg|jpeg|gif)$/,
                type: "asset/resource",
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./public/index.html",
            favicon: "./src/images/logo.png",
            inject: true,
        }),
        /** 关掉Vue3的警告
         * runtime-core.esm-bundler.js:5141 Feature flags __VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__ are not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.
         */
        new DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
    devServer: {
        port: 8080,
    },
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: "[name].[contenthash].chunk.js",
        path: path.resolve(__dirname, 'dist'),
    },
}