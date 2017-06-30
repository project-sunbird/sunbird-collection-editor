org.ekstep.collectioneditor.api = {
    initEditor: function(config, cb) {
        if (config) org.ekstep.collectioneditor.collectionService.initialize(config);
        if (cb) cb();
    },
    getService: function(service) {
    	switch (service) {
    		case "collection":
    			return org.ekstep.collectioneditor.collectionService
    			break;
    	}
    }
}