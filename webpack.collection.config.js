const path = require('path');
const PLUGIN_PATH = process.env.CE_COREPLUGINS || './plugins';
const webpack = require('webpack');
const glob = require('glob');
const uglifyjs = require('uglify-js');
const expose = require('expose-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');
const entryPlus = require('webpack-entry-plus');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


var corePlugins = [
     "org.ekstep.conceptselector-1.1",
     "org.ekstep.assetbrowser-1.2",
    "org.ekstep.contenteditorfunctions-1.2",
    "org.ekstep.unitmeta-1.5",
     "org.ekstep.contentmeta-1.5",
    "org.ekstep.courseunitmeta-1.5",
    "org.ekstep.lessonplanunitmeta-1.5",
     "org.ekstep.preview-1.1",
     "org.ekstep.telemetry-1.0",
     "org.ekstep.toaster-1.0",
     "org.ekstep.breadcrumb-1.0",
     "org.ekstep.collectionkeyboardshortcuts-1.0"
]

let entryFiles = []

function getEntryFiles() {
    entryFiles = [{
            entryFiles: packagePlugins(),
            outputName: 'coreplugins.js',
        },
        {
            entryFiles: getVendorCSS(),
            outputName: 'plugin-vendor',
        },
    ];
    return entryPlus(entryFiles);
}


function packagePlugins() {
    var pluginPackageArr = []; // Default coreplugin
    // pluginPackageArr.push('./app/scripts/coreplugins.js')
    corePlugins.forEach(function(plugin) {
        var dependenciesArr = [];
        var packagedDepArr = [];
        var manifest = JSON.parse(fs.readFileSync('plugins/' + plugin + '/manifest.json'));
        var manifestURL = './plugins/' + plugin + '/manifest.json';
        var pluginContent = fs.readFileSync('plugins/' + plugin + '/editor/plugin.js', 'utf8');        
        if (fs.existsSync('plugins/' + plugin + '/editor/plugin.dist.js')) {
            fs.unlinkSync('plugins/' + plugin + '/editor/plugin.dist.js');
        }
        if (manifest.editor.views && pluginContent) {
            var controllerPathArr = [];
            var templatePathArr = [];
            manifest.editor.views.forEach(function(obj, i) {
                controllerPathArr[i] = (obj.controller) ? 'require("' + obj.controller + '")' : undefined;
                templatePathArr[i] = (obj.template) ? 'require("' + obj.template + '")' : undefined;
            });
            var count = 0;
            var matchLoadNgModule = pluginContent.match(/\b(loadNgModules)\b.*?\)/g);
            var matchRegisterMeta = pluginContent.match(/(registerMetaPage).*[\s]*?(objectType:.*?])([^)]+)\)/g);            
            if(matchLoadNgModule !== null){
                console.log("inside if",plugin);
                pluginContent = uglifyjs.minify(pluginContent.replace(/\b(loadNgModules)\b.*?\)/g, function($0) {
                    var dash;
                    dash = 'loadNgModules(' + templatePathArr[count] + ' , ' + controllerPathArr[count] + ', true)'
                    count++;
                    return dash;
                }))
            }
            else if(matchRegisterMeta !== null){
                console.log("inside else if",plugin);
                
                pluginContent = uglifyjs.minify(pluginContent.replace(/(registerMetaPage).*[\s]*?(objectType:.*?])([^)]+)\)/g, function($1, $2, $3) {
                    var dash;
                    dash = 'registerMetaPage({' + $3 + ', templateURL: ' + templatePathArr[count] + ', controllerURL:'+ controllerPathArr[count] + ', allowTemplateCache: true})'
                    count++;
                    return dash;
                }));
            }    
            else {
                console.log("inside else",plugin);
                pluginContent = uglifyjs.minify(pluginContent);
            }
    
        } 
         
        else {
            pluginContent = uglifyjs.minify(pluginContent);
        }

        if (manifest.editor.dependencies) {
            
            manifest.editor.dependencies.forEach(function(obj, i) {
                if (obj.type == "js") {
                    dependenciesArr[i] = fs.readFileSync('./plugins/' + plugin + '/' + obj.src, 'utf8');
                }
            });
        }
        dependenciesArr.push('org.ekstep.pluginframework.pluginManager.registerPlugin(' + JSON.stringify(manifest) + ',' + pluginContent.code.replace(/;\s*$/, "") + ')')
        fs.appendFile('plugins/' + plugin + '/editor/plugin.dist.js', [...dependenciesArr].join("\n"))
        pluginPackageArr.push('./plugins/' + plugin + '/editor/plugin.dist.js')
    })

    return pluginPackageArr;
}

function getVendorCSS() {
    var cssDependencies = [];
    corePlugins.forEach(function(plugin) {
        var manifest = JSON.parse(fs.readFileSync('plugins/' + plugin + '/manifest.json'));
        if (manifest.editor.dependencies) {
            manifest.editor.dependencies.forEach(function(dep) {
                if (dep.type == "css") {
                    cssDependencies.push('./plugins/' + plugin + '/' + dep.src)
                }
            })
        };
    })
    return cssDependencies;
}



module.exports = {

    entry: getEntryFiles(),

    output: {
        filename: '[name]',
        path: path.resolve(__dirname, './app/scripts'),
    },
    resolve: {
        alias: {
            'jquery': path.resolve('./node_modules/jquery/dist/jquery.js'),
            'angular': path.resolve('./app/bower_components/angular/angular.js'),
            'iziToast': path.resolve('./app/bower_components/izitoast/dist/js/iziToast.min.js'),
        }
    },
    module: {
        rules: [
            
            {
                test: require.resolve('./app/bower_components/izitoast/dist/js/iziToast.min.js'),
                use: [{
                    loader: 'expose-loader',
                    options: 'iziToast'
                }]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            minimize: true,
                            "preset": "advanced",
                            discardComments: {
                                removeAll: true
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false,
                            minimize: true,
                            "preset": "advanced",
                            discardComments: {
                                removeAll: true
                            }
                        }
                    }
                ]
            }, {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50, //it's important
                            outputPath: './images/assets',
                            name: '[name].[ext]',
                        }
                    },
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].min.css",
        }),
        new webpack.ProvidePlugin({
            iziToast: 'iziToast'
        }),
        new UglifyJsPlugin({
            cache: false,
            parallel: true,
            uglifyOptions: {
                compress: {
                    dead_code: true,
                    drop_console: false,
                    global_defs: {
                        DEBUG: true
                    },
                    passes: 1,
                },
                ecma: 5,
                mangle: true
            },
            sourceMap: true
        }),
    ],
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
        }
    }
};