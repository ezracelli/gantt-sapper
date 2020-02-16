module.exports = {
	presets: [
		[
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        exclude: [ 'babel-plugin-transform-classes' ],
      },
    ],
	],
	plugins: [
    '@babel/transform-runtime',
  ],
};
