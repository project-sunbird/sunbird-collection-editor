window.org.ekstep.collectioneditor.api = _.assign(org.ekstep.contenteditor.api, {
    initEditor: function(config, cb) {
        var startTime = Date.now();
        if (config) org.ekstep.services.collectionService.initialize(config);
        org.ekstep.pluginframework.pluginManager.loadAllPlugins(ecEditor.getConfig('collectionEditorPlugins'), undefined, function () {
            org.ekstep.services.telemetryService.initialize({
                uid: ecEditor.getContext('uid'),
                sid: ecEditor.getContext('sid'),
                content_id: ecEditor.getContext('contentId'),
                etags: ecEditor.getContext('etags') || {},
                channel: ecEditor.getContext('channel')  || "",
                pdata: ecEditor.getContext('pdata') || {}
            }, ecEditor.getConfig('dispatcher'));
            //org.ekstep.services.telemetryService.startEvent(true).append("loadtimes", { plugins: (Date.now() - startTime) });        
            org.ekstep.services.telemetryService.startEvent(true).duration((new Date()).getTime() - startTime);
            if (cb) cb();    
        });        
    },
    /**
     * Retrns the current stage object to the plugin. Plugins might use this to query other objects on the
     * canvas or access other stage context.
     * @memberof org.ekstep.contenteditor.api
     */
    getCurrentStage: function() {
        return org.ekstep.services.collectionService.getActiveNode().data;
    },
    /**
     * Returns the handle to the Angular services. The services can be used by plugisn to achieve
     * the functional calls or render custom views. Valid services are:
     *     popup - UI service to render popup
     *     content - Provides access to the content API (for loading templates and assets)
     *     assessment - Provides access to the assessment API (for loading questions)
     *     language - Provides access to the wordnet API (for loading words and aksharas)
     *     search - Provides access to search API (for search activities, question, domains)
     *     meta - Provides access to metadata API (for resource bundles, ordinals, definitions)
     *     asset - Provides access to the content API (for save assets)
     *     telemetry - Service to genarate and log telemetry events
     *     collection - collection service
     * @param serviceId {string} id of the service to return. Returns undefined if the id is invalid
     * @memberof org.ekstep.contenteditor.api
     */
    getService: function(serviceId) {
        var service = '';
        switch (serviceId) {
            case ServiceConstants.POPUP_SERVICE:
                service = org.ekstep.services.popupService;
                break;
            case ServiceConstants.CONTENT_SERVICE:
                service = org.ekstep.services.contentService;
                break;
            case ServiceConstants.ASSESSMENT_SERVICE:
                service = org.ekstep.services.assessmentService;
                break;
            case ServiceConstants.LANGUAGE_SERVICE:
                service = org.ekstep.services.languageService;
                break;
            case ServiceConstants.SEARCH_SERVICE:
                service = org.ekstep.services.searchService;
                break;
            case ServiceConstants.META_SERVICE:
                service = org.ekstep.services.metaService;
                break;
            case ServiceConstants.ASSET_SERVICE:
                service = org.ekstep.services.assetService;
                break;
            case ServiceConstants.TELEMETRY_SERVICE:
                service = org.ekstep.services.telemetryService;
                break;
            case ServiceConstants.COLLECTION_SERVICE:
                service = org.ekstep.services.collectionService;
                break;
        }
        return service;
    },
    registerMetaPage: function(config) {
        if(config) org.ekstep.collectioneditor.metaPageManager.register(config);
    }
});

window.ecEditor = window.org.ekstep.collectioneditor.api;