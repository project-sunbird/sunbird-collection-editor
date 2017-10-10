// Karma configuration
// Generated on Wed Oct 26 2016 15:56:48 GMT+0530 (IST)

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'jasmine-matchers'],


        // list of files / patterns to load in the browser
        files: [
            // bower:js                        
            "app/libs/please-wait.min.js",
            "app/bower_components/jquery/dist/jquery.js",
            "app/bower_components/async/dist/async.min.js",
            "app/bower_components/angular/angular.js",
            "app/bower_components/lodash/lodash.js",
            "app/bower_components/x2js/index.js",
            "app/bower_components/eventbus/index.js",
            "app/bower_components/uuid/index.js",
            "app/bower_components/ng-dialog/js/ngDialog.js",
            "app/bower_components/ngSafeApply/index.js",
            "app/bower_components/oclazyload/dist/modules/ocLazyLoad.core.js",
            "app/bower_components/oclazyload/dist/modules/ocLazyLoad.directive.js",
            "app/bower_components/oclazyload/dist/modules/ocLazyLoad.loaders.common.js",
            "app/bower_components/oclazyload/dist/modules/ocLazyLoad.loaders.core.js",
            "app/bower_components/oclazyload/dist/modules/ocLazyLoad.loaders.cssLoader.js",
            "app/bower_components/oclazyload/dist/modules/ocLazyLoad.loaders.jsLoader.js",
            "app/bower_components/oclazyload/dist/modules/ocLazyLoad.loaders.templatesLoader.js",
            "app/bower_components/oclazyload/dist/modules/ocLazyLoad.polyfill.ie8.js",
            "app/bower_components/oclazyload/dist/ocLazyLoad.js",
            "app/bower_components/izitoast/dist/js/iziToast.min.js",
            "app/libs/semantic.min.js",
            "app/libs/tokens.js",
            "app/scripts/dev/localhost-ce.js",
            "app/bower_components/contenteditor/index.js",
            "app/scripts/collectioneditor/bootstrap-editor.js",
            "app/scripts/collectioneditor/collectioneditor-config.js",
            "app/scripts/collectioneditor/collection-editor-api.js",
            "app/scripts/collectioneditor/collectioneditor-base-plugin.js",
            "app/scripts/collectioneditor/manager/container-manager.js",
            "app/scripts/collectioneditor/manager/metapage-manager.js",
            "app/scripts/collectioneditor/service/collection-service.js",    
            "app/scripts/collectioneditor/md5.js",
            "app/scripts/angular/controller/main.js",
            "app/scripts/angular/directive/template-compiler-directive.js",
            "test/baseSpec.js",
            'test/**/*.js',
            { pattern: 'plugins/org.ekstep.collectioneditor-1.0/**/*.json', watched: true, served: true, included: false },
            // fixtures
            //{ pattern: 'test/**/*.json', watched: true, served: true, included: false },
            //{ pattern: 'plugins/org.ekstep.stage-1.0/**/*.json', watched: true, served: true, included: false },
            //{ pattern: 'test/data/**/*.html', watched: true, served: true, included: false }
        ],

        plugins: [
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-mocha-reporter'
        ],


        // list of files to exclude
        exclude: [],

        client: {
            captureConsole: false
        },


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {             
            'app/scripts/!(directive|controller|libs)/*.js': ['coverage'],
            'app/scripts/collectioneditor/!(directive|controller|libs)/*.js': ['coverage'],
            'plugins/org.ekstep.collectioneditor-1.0/**/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //reporters: ['dots', 'coverage'],

        // reporters configuration 
        reporters: ['mocha', 'coverage'],
     
        // reporter options 
        mochaReporter: {
          colors: {
            success: 'green',
            info: 'bgYellow',
            warning: 'cyan',
            error: 'bgRed'
          },
          symbols: {
            success: '✔',
            info: '#',
            warning: '!',
            error: 'x'
            }
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            "PhantomJS"
        ],

        browserNoActivityTimeout: 100000,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        coverageReporter: {
            reporters: [
                { type: 'html', dir: 'coverage/' },
                { type: 'text-summary' },
                { type: 'cobertura' }
            ],
        }
    })
}
