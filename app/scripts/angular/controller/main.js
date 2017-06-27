/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
'use strict';

angular.module('editorApp', ['ngDialog', 'oc.lazyLoad', 'Scope.safeApply']).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
angular.module('editorApp').controller('MainCtrl', ['$scope', '$ocLazyLoad',
    function($scope, $ocLazyLoad) {
        
        org.ekstep.contenteditor.init(undefined, undefined, $scope, undefined, function() {
            $scope.contentService = org.ekstep.contenteditor.api.getService(ServiceConstants.CONTENT_SERVICE);            
            $scope.popupService = org.ekstep.contenteditor.api.getService(ServiceConstants.POPUP_SERVICE);            
        });    

        $scope.loadNgModules = function(templatePath, controllerPath) {
            var files = [];
            if (templatePath) files.push({ type: 'html', path: templatePath });
            if (controllerPath) files.push({ type: 'js', path: controllerPath });
            if (files.length) return $ocLazyLoad.load(files)
        };    

        org.ekstep.contenteditor.containerManager.initialize({loadNgModules: $scope.loadNgModules, scope: $scope });

        // container scope starts
        $scope.editorContainer = undefined;
        $scope.addToContainer = function(container) {
            $scope.editorContainer = container;
            $scope.$safeApply();            
        }
        // container scope ends

        document.title = 'Collection-Editor';        
    }
]);
