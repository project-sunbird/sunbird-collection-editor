/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
'use strict';

angular.module('editorApp', ['ngDialog', 'oc.lazyLoad', 'Scope.safeApply']).factory('cacheBustInterceptor', ['$templateCache', function($templateCache) {
    return {
        request : function(config) {
            config.alreadyCached = $templateCache.get(config.url);
            if (!config.alreadyCached) {
                config.url = config.url + '?' + ecEditor.getConfig('build_number');
            }
            return config;
        }
    };
}]).config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $httpProvider.interceptors.push('cacheBustInterceptor');
}]);
angular.module('editorApp').controller('popupController', ['ngDialog', '$ocLazyLoad','$templateCache', function(ngDialog, $ocLazyLoad,$templateCache) {
    function loadNgModules(templatePath, controllerPath, allowTemplateCache, identifier) {
        // console.log(allowTemplateCache);
        return $ocLazyLoad.load([
            { type: 'html', path: templatePath },
            { type: 'js', path: controllerPath + '?' + ecEditor.getConfig('build_number')}
        ]);

    // if(!allowTemplateCache){
    //     return $ocLazyLoad.load([
    //         { type: 'html', path: templatePath },
    //         { type: 'js', path: controllerPath + '?' + ecEditor.getConfig('build_number')}
    //     ]);
    // }
    // else{
    //     if (angular.isString(templatePath) && templatePath.length > 0) {
    //         angular.forEach(angular.element(templatePath), function(node) {
    //             if (node.nodeName === "SCRIPT" && node.type === "text/ng-template") {
    //                 $templateCache.put(node.id, node.innerHTML);
    //             }
    //         });
    //     }
    // }
    };

    function openModal(config, callback) {
        if (config && callback) config.preCloseCallback = callback;
        if (config) ngDialog.open(config);
    };
    org.ekstep.contenteditor.api.getService('popup').initService(loadNgModules, openModal);
}]);
angular.module('editorApp').controller('MainCtrl', ['$scope', '$ocLazyLoad', '$location', '$templateCache',
    function($scope, $ocLazyLoad, $location, $templateCache) { 

        $scope.loadNgModules = function(templatePath, controllerPath, allowTemplateCache, identifier) {
            if(!allowTemplateCache){
                var files = [];
                if (templatePath) files.push({ type: 'html', path: templatePath });
                if (controllerPath) files.push({ type: 'js', path: controllerPath + '?' + ecEditor.getConfig('build_number')});
                if (files.length) return $ocLazyLoad.load(files)
            }else{
                return new Promise(function(resolve, reject){
                    if (angular.isString(templatePath) && templatePath.length > 0) {
                        angular.forEach(angular.element(templatePath), function(node) {                            
                            resolve($templateCache.put(node.id, node.innerHTML))
                        });
                    }
                })
                    
            }
        };  

        

        org.ekstep.contenteditor.containerManager.initialize({loadNgModules: $scope.loadNgModules, scope: $scope });
        org.ekstep.collectioneditor.metaPageManager.initialize({loadNgModules: $scope.loadNgModules });

        // container scope starts
        $scope.editorContainer = undefined;
        $scope.addToContainer = function(container) {
            $scope.editorContainer = container;
            $scope.$safeApply();            
        }
        // container scope ends

        document.title = 'Collection-Editor';

        /** Initialize base editor */
        var context = org.ekstep.contenteditor.getWindowContext();
        context.uid = context.user ? context.user.id : context.uid;
        context.etags = context.etags || {};
        context.etags.app = context.app || context.etags.app || [];
        context.etags.partner = context.partner || context.etags.partner || [];
        context.etags.dims = context.dims || context.etags.dims || [];
        
        var config = org.ekstep.contenteditor.getWindowConfig();
        config.absURL = $location.protocol() + '://' + $location.host() + ':' + $location.port() // Required

        config.collectionEditorPlugins = config.plugins || org.ekstep.contenteditor.config.plugins;
        config.plugins = [        
            { "id": "org.ekstep.collectioneditor", "ver": "1.3", "type": "plugin" }
        ]
        org.ekstep.contenteditor.init(context, config, $scope, undefined, function() {
            $scope.contentService = org.ekstep.contenteditor.api.getService(ServiceConstants.CONTENT_SERVICE);            
            $scope.popupService = org.ekstep.contenteditor.api.getService(ServiceConstants.POPUP_SERVICE);            
        });           
    }
]);
