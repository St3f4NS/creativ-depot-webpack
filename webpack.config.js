const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// change this var for every theme
const themeName = 'unitedroofing';
const localDomain = 'unitedroofing.loc';

const extractSass = new ExtractTextPlugin({
    filename: `/wp-content/themes/${themeName}/dist/[name].min.css`,
});

module.exports = {
    mode: 'development',
    entry: `./wp-content/themes/${themeName}/src/index.js`,
    plugins: [
        new UglifyJSPlugin(),
        extractSass,
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: localDomain,
            reload: true,
            injectChanges: true,
            injectCss: true
        })
    ],

    output: {
        filename: `./wp-content/themes/${themeName}/dist/bundle.js`,
        path: path.resolve(__dirname, '')
    },

    module: {
        rules: [
            // js loader
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            // scss loader
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'sass-loader'
                    }],
                    // use style-loader in development
                    fallback: 'style-loader'
                })
            },
            // css loeader
            {
                test: /\.css$/,
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            }

        ],
    },
};
