const {
    configureWebpack,
    graphQL: { getMediaURL, getStoreConfigData, getPossibleTypes }
} = require('@magento/pwa-buildpack');
const { DefinePlugin } = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = async env => {
    const mediaUrl = await getMediaURL();
    const storeConfigData = await getStoreConfigData();

    global.MAGENTO_MEDIA_BACKEND_URL = mediaUrl;
    global.LOCALE = storeConfigData.locale.replace('_', '-');

    const possibleTypes = await getPossibleTypes();

    const config = await configureWebpack({
        context: __dirname,
        vendor: [
            '@apollo/client',
            'apollo-cache-persist',
            'informed',
            'react',
            'react-dom',
            'react-feather',
            'react-redux',
            'react-router-dom',
            'redux',
            'redux-actions',
            'redux-thunk'
        ],
        special: {
            'react-feather': {
                esModules: true
            }
        },
        env
    });

    /**
     * configureWebpack() returns a regular Webpack configuration object.
     * You can customize the build by mutating the object here, as in
     * this example. Since it's a regular Webpack configuration, the object
     * supports the `module.noParse` option in Webpack, documented here:
     * https://webpack.js.org/configuration/module/#modulenoparse
     */
    config.module.noParse = [/braintree\-web\-drop\-in/];
    config.plugins = [
        ...config.plugins,
        new DefinePlugin({
            /**
             * Make sure to add the same constants to
             * the globals object in jest.config.js.
             */
            POSSIBLE_TYPES: JSON.stringify(possibleTypes),
            STORE_NAME: JSON.stringify('Venia'),
            STORE_VIEW_LOCALE: JSON.stringify(global.LOCALE),
            STORE_VIEW_CODE: process.env.STORE_VIEW_CODE
                ? JSON.stringify(process.env.STORE_VIEW_CODE)
                : JSON.stringify(storeConfigData.code)
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './template.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ];

    config.module.rules.push({
        test: /\.s[ca]ss$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    localIdentName: '[name]-[local]-[hash:base64:3]',
                    modules: true
                }
            },
            'sass-loader'
        ]
    });

    config.resolve.alias = {
        '@zamosa/theme': path.resolve(__dirname, 'src/@zamosa/theme')
    };

    return config;
};
