const babelConfig = require('./babel.config');
const config = require('sapper/config/webpack');
const path = require('path');
const pkg = require('./package.json');
const { preprocess } = require('./svelte.config');
const webpack = require('webpack');

const mode = process.env.NODE_ENV;
const dev = mode !== 'production';

const alias = {
  '@': path.resolve('src'),
  svelte: path.resolve('node_modules', 'svelte'),
};
const extensions = [ '.mjs', '.js', '.json', '.svelte', '.html' ];
const mainFields = [ 'svelte', 'module', 'browser', 'main' ];

module.exports = {
	client: {
		entry: config.client.entry(),
		output: config.client.output(),
		resolve: { alias, extensions, mainFields },
		module: {
			rules: [
        {
          test: /\.(js|svelte)$/,
          exclude: /node_modules\/(?!svelte)/,
          use: {
            loader: 'babel-loader',
            options: babelConfig,
          },
        },
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							dev,
							hydratable: true,
              hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
              preprocess,
						},
					},
        },
			],
		},
		mode,
		plugins: [
			// pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
		].filter(Boolean),
		devtool: dev && 'inline-source-map',
	},

	server: {
		entry: config.server.entry(),
		output: config.server.output(),
		target: 'node',
		resolve: { alias, extensions, mainFields },
		externals: Object.keys(pkg.dependencies).concat('encoding'),
		module: {
			rules: [
        {
          test: /\.(js|svelte)$/,
          exclude: /node_modules\/(?!svelte)/,
          use: {
            loader: 'babel-loader',
            options: babelConfig,
          },
        },
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							css: false,
							generate: 'ssr',
              dev,
              preprocess,
						}
					}
				}
			]
    },
		mode: process.env.NODE_ENV,
		performance: {
			hints: false // it doesn't matter if server.js is large
		}
	},

	serviceworker: {
		entry: config.serviceworker.entry(),
		output: config.serviceworker.output(),
		mode: process.env.NODE_ENV
	}
};
