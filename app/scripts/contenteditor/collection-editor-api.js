org.ekstep.collectioneditor.api = {
    initEditor: function(config, cb) {
        if (config) org.ekstep.collectioneditor.collectionService.initialize(config);
        org.ekstep.pluginframework.pluginManager.loadAllPlugins(org.ekstep.collectioneditor.config.plugins, undefined, function () {
            if (cb) cb();    
        });        
    },
    getService: function(service) {
    	switch (service) {
    		case "collection":
    			return org.ekstep.collectioneditor.collectionService
    			break;
    	}
    },
    registerMetaPage: function(config) {
        if(config) org.ekstep.collectioneditor.metaPageManager.register(config);
    }
}