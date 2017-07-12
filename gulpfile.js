var gulp = require('gulp');
var chug = require('gulp-chug');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var minify = require('gulp-minifier');
var stripDebug = require('gulp-strip-debug');
var mainBowerFiles = require('gulp-main-bower-files');
var gulpFilter = require('gulp-filter');
var inject = require('gulp-inject');
var CacheBuster = require('gulp-cachebust');
var mergeStream = require('merge-stream');
var rename = require("gulp-rename");
var merge = require('merge-stream');
var sass = require('gulp-sass');
var cleanCSS = require('clean-css');
var replace = require('gulp-string-replace');

var cachebust = new CacheBuster();
const zip = require('gulp-zip');

var bower_components = [
    "app/bower_components/jquery/dist/jquery.js",
    "app/bower_components/async/dist/async.min.js",
    "app/libs/semantic.min.js",
    "app/bower_components/angular/angular.js",
    "app/bower_components/lodash/lodash.js",
    "app/bower_components/x2js/index.js",
    "app/bower_components/eventbus/index.js",
    "app/bower_components/uuid/index.js",
    "app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
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
    "app/scripts/contenteditor/md5.js"
];

var bower_css = [
    "app/bower_components/font-awesome/css/font-awesome.css",
    "app/bower_components/ng-dialog/css/ngDialog.min.css",
    "app/bower_components/ng-dialog/css/ngDialog-theme-plain.min.css",
    "app/bower_components/ng-dialog/css/ngDialog-theme-default.min.css"
];

var scriptfiles = [
    "app/scripts/contenteditor/bootstrap-editor.js",
    "app/scripts/contenteditor/ce-config.js",
    "app/scripts/contenteditor/collectioneditor-config.js",
    "app/scripts/contenteditor/content-editor.js",
    "app/scripts/contenteditor/content-editor-api.js",
    "app/scripts/contenteditor/collection-editor-api.js",
    "app/scripts/contenteditor/base-plugin.js",
    "app/scripts/contenteditor/manager/header-manager.js",
    "app/scripts/contenteditor/manager/container-manager.js",
    "app/scripts/contenteditor/manager/metapage-manager.js",
    "app/scripts/contenteditor/service/collection-service.js",
    "app/scripts/contenteditor/service/popup-service.js",
    "app/scripts/contenteditor/service/telemetry-service.js",
    "app/scripts/contenteditor/dispatcher/idispatcher.js",
    "app/scripts/contenteditor/dispatcher/console-dispatcher.js",
    "app/scripts/contenteditor/dispatcher/local-dispatcher.js",
    "app/scripts/contenteditor/dispatcher/piwik-dispatcher.js",
    "app/scripts/angular/controller/main.js",
    "app/scripts/angular/controller/popup-controller.js"
];

gulp.task('setup', function() {
    gulp.src('semantic/dist', {
        read: false
    }).pipe(clean())
    gulp.src(['app/config/theme.config']).pipe(gulp.dest('semantic/src/'))
    gulp.src(['app/config/site.variables']).pipe(gulp.dest('semantic/src/site/globals/'))
    gulp.src('semantic/gulpfile.js')
        .pipe(chug({
            tasks: ['build']
        }, function() {
            gulp.src(['semantic/dist/semantic.min.css']).pipe(gulp.dest('app/styles/'));
            gulp.src(['semantic/dist/themes/**/*']).pipe(gulp.dest('app/styles/themes'));
            gulp.src(['semantic/dist/semantic.min.js']).pipe(gulp.dest('app/libs/'));
        }))
});


gulp.task('minifyCE', function() {
    return gulp.src(scriptfiles)
        .pipe(concat('collectioneditor.min.js'))
        .pipe(gulp.dest('collection-editor/scripts'));
});


gulp.task('minifyCSS', function() {
    return gulp.src([
            'app/styles/semantic.min.css',
            'app/styles/content-editor.css',
            'app/styles/MyFontsWebfontsKit.css',
            'app/styles/iconfont.css',
            'app/styles/noto.css',
            'app/styles/css/header.css',
            'app/styles/css/container.css',
            'app/styles/css/commonStyles.css'

        ])
        .pipe(concat('style.min.css'))
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: true,
            getKeptComment: function(content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(gulp.dest('collection-editor/styles'));
});

gulp.task('minifyJsBower', function() {
    return gulp.src(bower_components)
        .pipe(concat('external.min.js'))
        .pipe(gulp.dest('collection-editor/scripts/'));
});

gulp.task('minifyCssBower', function() {
    return gulp.src(bower_css)
        .pipe(concat('external.min.css'))
        .pipe(gulp.dest('collection-editor/styles'));
});


gulp.task('copyfonts', function() {
    return gulp.src(['app/styles/themes/**/*', 'app/styles/webfonts/**/*', 'app/styles/fonts/*'], {
            base: 'app/styles/'
        })
        .pipe(gulp.dest('collection-editor/styles'));
});
gulp.task('copyfontawsomefonts', function() {
    return gulp.src(['app/bower_components/font-awesome/fonts/fontawesome-webfont.ttf', 'app/bower_components/font-awesome/fonts/fontawesome-webfont.woff'], {
            base: 'app/bower_components/font-awesome/fonts/'
        })
        .pipe(gulp.dest('collection-editor/styles/fonts'));
});
gulp.task('copyFiles', function() {
    return gulp.src(['app/images/editor-frame.png', 'app/config/*.json', 'app/index.html'], {
            base: 'app/'
        })
        .pipe(gulp.dest('collection-editor'));
});

// gulp.task('copydeploydependencies', function() {
//     return gulp.src(['deploy/gulpfile.js', 'deploy/package.json'], {
//             base: ''
//         })
//         .pipe(gulp.dest('content-editor'));
// });

gulp.task('minify', ['minifyCE', 'minifyCSS', 'minifyJsBower', 'minifyCssBower', 'copyfonts', 'copyfontawsomefonts', 'copyFiles']);

gulp.task('inject', ['minify'], function() {
    var target = gulp.src('collection-editor/index.html');
    var sources = gulp.src(['collection-editor/scripts/external.min.js', 'collection-editor/scripts/collectioneditor.min.js', 'collection-editor/styles/*.css'], {
        read: false
    });
    return target
        .pipe(inject(sources, {
            ignorePath: 'collection-editor/',
            addRootSlash: false
        }))
        .pipe(gulp.dest('./collection-editor'));
});

gulp.task('zip', ['minify', 'inject'], function() {
    return gulp.src('collection-editor/**')
        .pipe(zip('collection-editor.zip'))
        .pipe(gulp.dest(''));
});

gulp.task('replacefontspath', ['minify', 'inject'], function() {
  gulp.src(["collection-editor/styles/external.min.css"]) // Every file allown. 
    .pipe(replace('../fonts', 'fonts'))
    .pipe(gulp.dest('collection-editor/styles'))
});

gulp.task('replacepluginspath', ['replacefontspath'], function() {
  gulp.src(["collection-editor/scripts/collectioneditor.min.js"])
    .pipe(replace('/plugins', '/content-plugins'))
    .pipe(gulp.dest('collection-editor/scripts/'))
});

gulp.task('replacebaseurl', ['minify'], function() {
  gulp.src(["collection-editor/scripts/collectioneditor.min.js"])
    .pipe(replace('https://dev.ekstep.in', ''))
    .pipe(gulp.dest('collection-editor/scripts/'))
});

gulp.task('build', ['minify', 'replacebaseurl','inject', 'replacefontspath', 'replacepluginspath', 'zip']);

var corePlugins = [
    "org.ekstep.lessonbrowser-1.0",
    "org.ekstep.textbookmeta-1.0",
    "org.ekstep.unitmeta-1.0",
    "org.ekstep.contentmeta-1.0",
    "org.ekstep.telemetry-1.0",
    "org.ekstep.collectionheader-1.0"
]

gulp.task('minifyCorePlugins', function() {
    var tasks = [];
    corePlugins.forEach(function(plugin) {
        tasks.push(
            gulp.src('plugins/' + plugin + '/editor/plugin.js')
            .pipe(minify({
                minify: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                minifyJS: true,
                minifyCSS: true,
                mangle: false
            }))
            .pipe(rename('plugin.min.js'))
            .pipe(gulp.dest('plugins/' + plugin + '/editor'))
        );
    });
    return mergeStream(tasks);
});

gulp.task('packageCorePluginsDev', ["minifyCorePlugins"], function() {
    var fs = require('fs');
    var _ = require('lodash');
    var jsDependencies = [];
    var cssDependencies = [];
    if (fs.existsSync('app/scripts/coreplugins.js')) {
        fs.unlinkSync('app/scripts/coreplugins.js');
    }
    corePlugins.forEach(function(plugin) {
        var manifest = JSON.parse(fs.readFileSync('plugins/' + plugin + '/manifest.json'));
        if (manifest.editor.dependencies) {
            manifest.editor.dependencies.forEach(function(dependency) {
                var resource = '/plugins/' + plugin + '/' + dependency.src;
                if (dependency.type == 'js') {
                    fs.appendFile('app/scripts/coreplugins.js', 'org.ekstep.contenteditor.jQuery("body").append($("<script type=\'text/javascript\' src=\'' + resource + '\'>"))' + '\n');
                } else if (dependency.type == 'css') {
                    fs.appendFile('app/scripts/coreplugins.js', 'org.ekstep.contenteditor.jQuery("head").append("<link rel=\'stylesheet\' type=\'text/css\' href=\'' + resource + '\'>")' + '\n');
                }
            });
        }
        var plugin = fs.readFileSync('plugins/' + plugin + '/editor/plugin.min.js', 'utf8');
        fs.appendFile('app/scripts/coreplugins.js', 'org.ekstep.pluginframework.pluginManager.registerPlugin(' + JSON.stringify(manifest) + ',eval(\'' + plugin.replace(/'/g, "\\'") + '\'))' + '\n');
    });
    return gulp.src('plugins/**/plugin.min.js', {
        read: false
    }).pipe(clean());
});

gulp.task('packageCorePlugins', ["minify", "minifyCorePlugins"], function() {
    var fs = require('fs');
    var _ = require('lodash');
    var jsDependencies = [];
    var cssDependencies = [];
    if (fs.existsSync('collection-editor/scripts/coreplugins.js')) {
        fs.unlinkSync('collection-editor/scripts/coreplugins.js');
    }
    corePlugins.forEach(function(plugin) {
        var manifest = JSON.parse(fs.readFileSync('plugins/' + plugin + '/manifest.json'));
        if (manifest.editor.dependencies) {
            manifest.editor.dependencies.forEach(function(dependency) {
                var resource = '/content-plugins/' + plugin + '/' + dependency.src;
                if (dependency.type == 'js') {
                    fs.appendFile('collection-editor/scripts/coreplugins.js', 'org.ekstep.contenteditor.jQuery("body").append($("<script type=\'text/javascript\' src=\'' + resource + '\'>"))' + '\n');
                } else if (dependency.type == 'css') {
                    fs.appendFile('collection-editor/scripts/coreplugins.js', 'org.ekstep.contenteditor.jQuery("head").append("<link rel=\'stylesheet\' type=\'text/css\' href=\'' + resource + '\'>")' + '\n');
                }
            });
        }
        var plugin = fs.readFileSync('plugins/' + plugin + '/editor/plugin.min.js', 'utf8');
        fs.appendFile('collection-editor/scripts/coreplugins.js', 'org.ekstep.pluginframework.pluginManager.registerPlugin(' + JSON.stringify(manifest) + ',eval(\'' + plugin.replace(/'/g, "\\'") + '\'))' + '\n');
    });
    return gulp.src('plugins/**/plugin.min.js', {
        read: false
    }).pipe(clean());
});
//Minification for dev End

//edited by Anshu <anshu.mishra@goodworklabs.com>
gulp.task('sassToCSS', function() {
    return gulp.src('app/styles/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        // .pipe(cleanCSS())
        .pipe(gulp.dest('app/styles/css'))

});

gulp.task('watch', function() {
    gulp.watch('app/styles/sass/**/*.sass', ['sassToCSS']);

});
