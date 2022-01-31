/* eslint-disable */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = () => {
    const entry = './renderer/chat/entry.tsx';

    const output = {
        filename: 'chat.js',
        path: path.resolve(__dirname, '.'),
        libraryTarget: "var",
        library: "Chat",
    };

    const mode = {
            mode: 'development',
            devtool: 'inline-source-map',
            devServer: {
                contentBase: './dist'
            }
        };

    return {
        entry,
        module: {
            rules: [
                {
                    // Include ts, tsx, js, and jsx files.
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                        url: false
                        }
                    },
                    'sass-loader',
                    ],
                },
                {
                    test: /\.html$/,
                    use: 'html-loader',
                }
            ]
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js', '.css' ],
            modules: [
                path.resolve(__dirname, 'node_modules')
            ]
        },
        output,
        plugins: [
            new ForkTsCheckerWebpackPlugin()
        ],
        target: "electron-renderer",
        ...mode
    };
}