org.ekstep.collectioneditor.metaPageManager = new(Class.extend({
    registeredPages: [],
    sidebar: [],
    breadcrumb: [],
    initialize: function (config) {
        this.loadNgModules = config.loadNgModules;
    },
    register: function (config) {
        var instance = this;
        if (config.templateURL) {

            instance.loadNgModules(config.templateURL, undefined, config.allowTemplateCache, config.objectType[0])

            if (config.controllerURL && _.isString(config.controllerURL)) {
                instance.loadNgModules(undefined, config.controllerURL, config.allowTemplateCache)
                    .then(function (x) {
                        instance.registeredPages.push(config);
                    }, function (e) {
                        console.error(e);
                        throw "unable to load controller :" + config.controllerURL;
                    });
            } else {
                instance.registeredPages.push(config);
            }
        };
    },
    getPages: function () {
        return this.registeredPages;
    },
    registerSidebar: function (config) {
        var instance = this;
        if (config.templateURL) {
            instance.loadNgModules(config.templateURL);
            if (config.controllerURL) {
                instance.loadNgModules(undefined, config.controllerURL)
                    .then(function () {
                        instance.sidebar.push(config);
                    }, function () {
                        throw "unable to load controller :" + config.controllerURL;
                    });
            }
        };
    },
    getSidebar: function () {
        return this.sidebar;
    },
    registerBreadcrumb: function (config) {
        var instance = this;
        if (config.templateURL) {
            instance.loadNgModules(config.templateURL, undefined, config.allowTemplateCache, config.objectType[0]);
            if (config.controllerURL && _.isString(config.controllerURL)) {
                instance.loadNgModules(undefined, config.controllerURL, config.allowTemplateCache)
                    .then(function () {
                        instance.breadcrumb.push(config);
                    }, function () {
                        throw "unable to load controller :" + config.controllerURL;
                    });
            }
            else{
                instance.breadcrumb.push(config);
            }
        };
    },
    getBreadcrumb: function () {
        return this.breadcrumb;
    }
}));