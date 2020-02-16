const preprocess = require('svelte-preprocess');

module.exports = {
  preprocess: preprocess({
    markupTagName: 'template',
    postcss: {
      plugins: [
        require('postcss-import'),
        require('autoprefixer')
      ],
    },
    sass: {
      includePaths: [ 'src' ],
    },
  }),
};
