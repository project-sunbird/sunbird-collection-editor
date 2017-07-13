org.ekstep.collectioneditor.api = {
    initEditor: function(config, cb) {
        var startTime = Date.now();
        if (config) org.ekstep.collectioneditor.collectionService.initialize(config);
        org.ekstep.pluginframework.pluginManager.loadAllPlugins(org.ekstep.collectioneditor.config.plugins, undefined, function () {
            org.ekstep.services.telemetryService.initialize({
                uid: config.context.uid,
                sid: config.context.sid,
                content_id: config.context.contentId,
                etags: config.context.etags || {},
                channel:config.context.channel || "",
                pdata: config.context.pdata || {}
            }, org.ekstep.collectioneditor.config.dispatcher);
            org.ekstep.services.telemetryService.startEvent(true).append("loadtimes", { plugins: (Date.now() - startTime) });        
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