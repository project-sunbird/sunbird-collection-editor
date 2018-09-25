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
var replace = require('gulp-string-replace');
var uglify = require('gulp-uglify');
const zip = require('gulp-zip');
var versionNumber = process.env.version_number || 1;
var buildNumber = process.env.build_number || 1;

if (!versionNumber && !versionNumber) {
    console.error('Error!!! Cannot find verion_number and build_number env variables');
    return process.exit(1);
}
var versionPrefix = '.' + versionNumber + '.' + buildNumber;
var cachebust = function(path) {
    path.basename += versionPrefix
}

var bower_components = [
    "app/libs/please-wait.min.js",
    "app/bower_components/jquery/dist/jquery.min.js",
    "app/libs/jquery-ui.min.js",
    "app/libs/contextmenu.min.js",
    "app/bower_components/async/dist/async.min.js",
    "app/libs/semantic.min.js",
    "app/bower_components/angular/angular.min.js",
    "app/bower_components/lodash/dist/lodash.min.js",
    "app/bower_components/x2js/index.js",
    "app/bower_components/eventbus/index.js",
    "app/bower_components/uuid/index.js",
    "app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
    "app/bower_components/ng-dialog/js/ngDialog.min.js",
    "app/bower_components/ngSafeApply/index.js",
    "app/bower_components/oclazyload/dist/ocLazyLoad.min.js",
    "app/scripts/collectioneditor/md5.js",
    "app/libs/tokens.js",
    "app/libs/ng-tags-input.js"
];

var bower_css = [
    "app/bower_components/font-awesome/css/font-awesome.min.css",
    "app/bower_components/ng-dialog/css/ngDialog.min.css",
    "app/bower_components/ng-dialog/css/ngDialog-theme-plain.min.css",
    "app/bower_components/ng-dialog/css/ngDialog-theme-default.min.css",
    "app/libs/spinkit.css",
    "app/libs/please-wait.css",
    "app/libs/tokens.css",
    "app/libs/ng-tags-input.css",
    "app/libs/prism.css",
    "app/styles/jquery-ui.css"
];

var scriptfiles = [
    "app/bower_components/contenteditor/index.js",
    "app/scripts/collectioneditor/bootstrap-editor.js",
    "app/scripts/collectioneditor/collectioneditor-config.js",
    "app/scripts/collectioneditor/collection-editor-api.js",
    "app/scripts/collectioneditor/collectioneditor-base-plugin.js",
    "app/scripts/collectioneditor/manager/container-manager.js",
    "app/scripts/collectioneditor/manager/metapage-manager.js",
    "app/scripts/collectioneditor/service/collection-service.js",
    "app/scripts/collectioneditor/service/state-service.js",
    "app/scripts/angular/controller/main.js",
    "app/scripts/angular/directive/template-compiler-directive.js",
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
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true
        }))
        .pipe(uglify())
        .pipe(rename(cachebust))
        .pipe(gulp.dest('collection-editor/scripts'));
});


gulp.task('minifyCSS', function() {
    return gulp.src([
            'app/styles/semantic.min.css',
            'app/styles/content-editor.css',
            'app/styles/metaform.css',
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
        .pipe(rename(cachebust))
        .pipe(gulp.dest('collection-editor/styles'));
});

gulp.task('minifyJsBower', function() {
    return gulp.src(bower_components)
        .pipe(concat('external.min.js'))
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true
        }))
        .pipe(uglify())
        .pipe(rename(cachebust))
        .pipe(gulp.dest('collection-editor/scripts/'));
});

gulp.task('minifyCssBower', function() {
    return gulp.src(bower_css)
        .pipe(concat('external.min.css'))
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
        .pipe(rename(cachebust))
        .pipe(gulp.dest('collection-editor/styles'));
});


gulp.task('copycommonfonts', function() {
    return gulp.src(['app/styles/themes/**/*', 'app/styles/webfonts/**/*', 'app/styles/fonts/*', 'app/styles/images/*'], {
            base: 'app/styles/'
        })
        .pipe(gulp.dest('collection-editor/styles'));
});
gulp.task('copyfontawesomefonts', function() {
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

gulp.task('copydeploydependencies', function() {
    return gulp.src(['deploy/gulpfile.js', 'deploy/package.json'], {
            base: ''
        })
        .pipe(gulp.dest('collection-editor'));
});

gulp.task('copyPluginFramework', function() {
    return gulp.src(['app/scripts/plugin-framework.min.js'], {
            base: 'app/scripts'
        })
        .pipe(gulp.dest('collection-editor/scripts'));
});

gulp.task('minify', ['minifyCE', 'minifyCSS', 'minifyJsBower', 'minifyCssBower', 'copycommonfonts', 'copyfontawesomefonts', 'copyFiles', 'copydeploydependencies']);

gulp.task('inject', ['minify'], function() {
    var target = gulp.src('collection-editor/index.html');
    var sources = gulp.src(['collection-editor/scripts/external.*.js', 'collection-editor/scripts/collectioneditor.*.js', 'collection-editor/styles/*.css'], {
        read: false
    });
    return target
        .pipe(inject(sources, {
            ignorePath: 'collection-editor/',
            addRootSlash: false
        }))
        .pipe(gulp.dest('./collection-editor'));
});

gulp.task('replace', ['inject'], function() {
    return mergeStream([
        gulp.src(["collection-editor/styles/external.*.css"]).pipe(replace('../fonts', 'fonts')).pipe(gulp.dest('collection-editor/styles')),
        gulp.src(["collection-editor/scripts/collectioneditor.*.js"]).pipe(replace('/plugins', '/content-plugins')).pipe(replace("https://dev.ekstep.in", "")).pipe(replace('dispatcher: "local"', 'dispatcher: "console"')).pipe(gulp.dest('collection-editor/scripts/'))
    ]);
});

gulp.task('zip', ['minify', 'inject', 'replace', 'packageCorePlugins'], function() {
    return gulp.src('collection-editor/**')
        .pipe(zip('collection-editor.zip'))
        .pipe(gulp.dest(''));
});

gulp.task('build', ['minify', 'inject', 'replace', 'packageCorePlugins', 'zip']);

var corePlugins = [
    // "org.ekstep.conceptselector-1.1",
    // "org.ekstep.assetbrowser-1.2",
    // "org.ekstep.contenteditorfunctions-1.2",
    // "org.ekstep.unitmeta-1.6",
    // "org.ekstep.contentmeta-1.5",
    // "org.ekstep.courseunitmeta-1.6",
    // "org.ekstep.lessonplanunitmeta-1.5",
    // "org.ekstep.preview-1.1",
    // "org.ekstep.telemetry-1.0",
    // "org.ekstep.toaster-1.0",
    // "org.ekstep.breadcrumb-1.0",
    // "org.ekstep.collectionkeyboardshortcuts-1.0"
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

gulp.task('packageCorePluginsLocal', ["minifyCorePlugins"], function() {
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
                    fs.appendFile('app/scripts/coreplugins.js', "org.ekstep.pluginframework.resourceManager.loadExternalResource('" + resource + "', 'js')" + "\n");
                } else if (dependency.type == 'css') {
                    fs.appendFile('app/scripts/coreplugins.js', "org.ekstep.pluginframework.resourceManager.loadExternalResource('" + resource + "', 'css')" + "\n");
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

gulp.task('packageCorePlugins', ["minifyCorePlugins"], function() {
    var fs = require('fs');
    var _ = require('lodash');
    var jsDependencies = [];
    var cssDependencies = [];
    if (fs.existsSync('app/scripts/coreplugins.js')) {
        fs.unlinkSync('app/scripts/coreplugins.js');
    }
    corePlugins.forEach(function(plugin) {
        console.log('plugins/' + plugin + '/manifest.json');

        var manifest = JSON.parse(fs.readFileSync('plugins/' + plugin + '/manifest.json'));
        if (manifest.editor.dependencies) {
            manifest.editor.dependencies.forEach(function(dependency) {
                var resource = '/content-plugins/' + plugin + '/' + dependency.src;
                if (dependency.type == 'js') {
                    fs.appendFile('app/scripts/coreplugins.js', "org.ekstep.pluginframework.resourceManager.loadExternalResource('" + resource + "', 'js')" + "\n");
                } else if (dependency.type == 'css') {
                    fs.appendFile('app/scripts/coreplugins.js', "org.ekstep.pluginframework.resourceManager.loadExternalResource('" + resource + "', 'css')" + "\n");
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
gulp.task("clone-plugins", function(done) {
    git.clone('https://github.com/project-sunbird/sunbird-content-plugins.git', { args: '-b ' + branchName + ' ./plugins' }, function(err) {
        if (err) {
            done(err);
        }
        done();
    });
});