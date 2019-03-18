'use strict';

describe('container manager', function() {

    beforeAll(function(done) {
        org.ekstep.contenteditor.containerManager.initialize({ loadNgModules: function() {}, scope: { addToContainer: function() {} } });
        spyOn(org.ekstep.contenteditor.containerManager, 'register').and.callThrough();
        spyOn(org.ekstep.contenteditor.containerManager, 'load').and.callThrough();
        done();
    });

    it('should register the container', function() {
        var container = {
            "id": "tree",
            "templateURL": org.ekstep.contenteditor.config.pluginRepo + "/org.ekstep.textbookmeta-1.1/editor/collectiontree.html",
            "controllerURL": org.ekstep.contenteditor.config.pluginRepo + "/org.ekstep.textbookmeta-1.1/editor/collectionEditorApp.js"
        }
        spyOn(org.ekstep.contenteditor.containerManager, 'loadNgModules').and.returnValue(Promise.resolve('Resolved'));

        var collectionManifest = org.ekstep.contenteditor.config.pluginRepo + "/org.ekstep.collectioneditor-1.0/manifest.json";
        org.ekstep.contenteditor.containerManager.register(container, collectionManifest);
        expect(org.ekstep.contenteditor.containerManager.register.calls.count()).toEqual(1);
    });
    it('when controller url is not defined', function(){
        var container = {
            "id": "tree",
            "templateURL": org.ekstep.contenteditor.config.pluginRepo + "/org.ekstep.textbookmeta-1.1/editor/collectiontree.html",
        }
        spyOn(org.ekstep.contenteditor.containerManager, 'loadNgModules').and.returnValue(Promise.resolve('Resolved'));

        var collectionManifest = org.ekstep.contenteditor.config.pluginRepo + "/org.ekstep.collectioneditor-1.0/manifest.json";
        org.ekstep.contenteditor.containerManager.register(container, collectionManifest);
        expect(org.ekstep.contenteditor.containerManager.register.calls.count()).toEqual(2);

    })
    it('should  loadngmodules promised reject',function(){
        var container = {
            "id": "tree",
            "templateURL": org.ekstep.contenteditor.config.pluginRepo + "/org.ekstep.textbookmeta-1.1/editor/collectiontree.html",
            "controllerURL": org.ekstep.contenteditor.config.pluginRepo + "/org.ekstep.textbookmeta-1.1/editor/collectionEditorApp.js"
        }
        org.ekstep.contenteditor.containerManager.loadNgModules =  jasmine.createSpy().and.returnValue(Promise.reject('Resolved'))
        var collectionManifest = org.ekstep.contenteditor.config.pluginRepo + "/org.ekstep.collectioneditor-1.0/manifest.json";
        org.ekstep.contenteditor.containerManager.register(container, collectionManifest);
        expect(org.ekstep.contenteditor.containerManager.register.calls.count()).toEqual(3);
    })
});
