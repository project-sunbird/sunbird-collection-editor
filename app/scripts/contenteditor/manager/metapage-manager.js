org.ekstep.collectioneditor.metaPageManager = new(Class.extend({
    registeredPages: [],
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
    }
}));
