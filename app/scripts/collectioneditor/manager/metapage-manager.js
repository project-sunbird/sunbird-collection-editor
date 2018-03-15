org.ekstep.collectioneditor.metaPageManager = new(Class.extend({
    registeredPages: [],
    sidebar: [],
    breadcrumb: [],
    initialize: function(config) {
        this.loadNgModules = config.loadNgModules;
    },
    register: function(config) {
        var instance = this;
        if (config.templateURL) {
            instance.loadNgModules(config.templateURL);
            if (config.controllerURL) {
                instance.loadNgModules(undefined, config.controllerURL)
                    .then(function() {
                        instance.registeredPages.push(config);
                    }, function() {
                        throw "unable to load controller :" + config.controllerURL;
                    });
            }
        };
    },
    getPages: function() {
        return this.registeredPages;
    },
    registerSidebar: function(config) {
        var instance = this;
        if (config.templateURL) {
            instance.loadNgModules(config.templateURL);
            if (config.controllerURL) {
                instance.loadNgModules(undefined, config.controllerURL)
                    .then(function() {
                        instance.sidebar.push(config);
                    }, function() {
                        throw "unable to load controller :" + config.controllerURL;
                    });
            }
        };
    },
    getSidebar: function() {
        return this.sidebar;
    },
    registerBreadcrumb: function (config) {
        var instance = this;
        if (config.templateURL) {
            instance.loadNgModules(config.templateURL);
            if (config.controllerURL) {
                instance.loadNgModules(undefined, config.controllerURL)
                    .then(function () {
                        instance.breadcrumb.push(config);
                    }, function () {
                        throw "unable to load controller :" + config.controllerURL;
                    });
            }
        };
    },
    getBreadcrumb: function () {
        return this.breadcrumb;
    }
}));
