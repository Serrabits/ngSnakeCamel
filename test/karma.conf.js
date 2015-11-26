// Karma configuration
// Generated on Tue Nov 24 2015 00:13:56 GMT-0200 (BRST)

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'ng-snake-camel.js',
      'test/**/*.js'
    ],

    // coverage reporter generates the coverage
    reporters: [
      'progress',
      'coverage',
      'coveralls'
    ],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'ng-snake-camel.js': [
        'coverage'
      ]
    },

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {
          type: 'lcov',
          subdir: '.'
        }
      ]
    },
  
    // web server port
    port: 8080,

    // cli runner port
    runnerPort: 9100,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-coveralls',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO

  });
};
