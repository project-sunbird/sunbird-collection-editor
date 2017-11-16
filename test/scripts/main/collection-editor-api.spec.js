describe('Collection Editor', function() {
    
    it('should init editor', function() {
        spyOn(org.ekstep.collectioneditor.api, "initEditor").and.callThrough();
        var config = { 
            baseURL: 'https://dev.ekstep.in', apislug: '/action', build_number: 'BUILDNUMBER', pluginRepo: '/plugins', 
            aws_s3_urls: [ 'https://s3.ap-south-1.amazonaws.com/ekstep-public-dev/', 'https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/' ], 
            plugins: [ { id: 'org.ekstep.collectionheader', ver: '1.0', type: 'plugin' }, { id: 'org.ekstep.download', ver: '1.0', type: 'plugin' } ], 
            corePluginsPackaged: false, dispatcher: 'local', localDispatcherEndpoint: '/app/telemetry', previewURL: '/content/preview/preview.html', useProxyForURL: false ,
            editorConfig: {
                "mode": "Edit",
                "contentStatus": "draft",
                "rules": {
                    "levels": 3,
                    "objectTypes": [{ type: 'TextBook', label: 'Textbook', isRoot: true, editable: true, childrenTypes: ['TextBookUnit', 'Collection', 'Story', 'Worksheet'], addType: 'Editor', iconClass: 'fa fa-book' }, { type: 'TextBookUnit', label: 'Textbook Unit', isRoot: false, editable: true, childrenTypes: ['TextBookUnit', 'Collection', 'Story', 'Worksheet'], addType: 'Editor', iconClass: 'fa fa-folder-o' }, { type: 'Collection', label: 'Collection', isRoot: false, editable: false, childrenTypes: [], addType: 'Browser', iconClass: 'fa fa-file-o' }, { type: 'Story', label: 'Story', isRoot: false, editable: false, childrenTypes: [], addType: 'Browser', iconClass: 'fa fa-file-o' }, { type: 'Worksheet', label: 'Worksheet', isRoot: false, editable: false, childrenTypes: [], addType: 'Browser', iconClass: 'fa fa-file-o' }]
                },
                "defaultTemplate": {}
            }
        };
        expect(org.ekstep.contenteditor.config).toEqual(config);
        org.ekstep.collectioneditor.api.initEditor(config, function(){});
        expect(org.ekstep.collectioneditor.api.initEditor).toHaveBeenCalled();
        org.ekstep.collectioneditor.api.initEditor('', '');
        expect(org.ekstep.collectioneditor.api.initEditor.calls.count()).toEqual(2);
    });

    xit('should register contentmeta', function(){
        spyOn(org.ekstep.collectioneditor.api, "getCurrentStage").and.callThrough();
        org.ekstep.collectioneditor.api.getCurrentStage();
        expect(org.ekstep.collectioneditor.api.getCurrentStage).toHaveBeenCalled();
    });
    
    it('should register contentmeta', function(){
        spyOn(org.ekstep.collectioneditor.api, "registerMetaPage").and.callThrough();
        org.ekstep.collectioneditor.api.registerMetaPage(org.ekstep.contenteditor.config);
        expect(org.ekstep.collectioneditor.api.registerMetaPage).toHaveBeenCalled();
        org.ekstep.collectioneditor.api.registerMetaPage('');
        expect(org.ekstep.collectioneditor.api.registerMetaPage.calls.count()).toEqual(2);
    });

    it('should return respective services', function() {
        spyOn(org.ekstep.collectioneditor.api, "getService").and.callThrough();
        expect(org.ekstep.collectioneditor.api.getService("popup")).toBe(org.ekstep.services.popupService);
        expect(org.ekstep.collectioneditor.api.getService("content")).toBe(org.ekstep.services.contentService);
        expect(org.ekstep.collectioneditor.api.getService("assessment")).toBe(org.ekstep.services.assessmentService);
        expect(org.ekstep.collectioneditor.api.getService("language")).toBe(org.ekstep.services.languageService);
        expect(org.ekstep.collectioneditor.api.getService("search")).toBe(org.ekstep.services.searchService);
        expect(org.ekstep.collectioneditor.api.getService("meta")).toBe(org.ekstep.services.metaService);
        expect(org.ekstep.collectioneditor.api.getService("asset")).toBe(org.ekstep.services.assetService);
        expect(org.ekstep.collectioneditor.api.getService("telemetry")).toBe(org.ekstep.services.telemetryService);
        expect(org.ekstep.collectioneditor.api.getService("collection")).toBe(org.ekstep.services.collectionService);
    });

});
