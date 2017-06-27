org.ekstep.contenteditor.containerManager = new(Class.extend({
	registeredContainer: [],
	initialize: function(config) {
        this.loadNgModules = config.loadNgModules;
        this.scope = config.scope
    },
    register: function(container, manifest) {
    	this.registeredContainer.push({ id: manifest.id, container: container });
    	this.load(container, manifest);
    },
    load: function(container, manifest) {
        var instance = this;        
        if (container.templateURL) {
            container.templateURL = org.ekstep.contenteditor.api.resolvePluginResource(manifest.id, manifest.ver, container.templateURL);
            instance.loadNgModules(container.templateURL);

            if (container.controllerURL) {
                container.controllerURL = org.ekstep.contenteditor.api.resolvePluginResource(manifest.id, manifest.ver, container.controllerURL);
                instance.loadNgModules(undefined, container.controllerURL)
                    .then(function() {
                        instance.scope.addToContainer(container);
                    }, function() {
                        throw "unable to load controller :" + container.controllerURL;
                    });
            } else {
                instance.scope.addToContainer(container);
            }
        };
    }   
}));