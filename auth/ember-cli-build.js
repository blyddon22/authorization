'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const tailwindcss = require('tailwindcss');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        plugins: [
          tailwindcss('app/styles/tailwind.js')
        ]
      }
    }
  });

  return app.toTree();
};
