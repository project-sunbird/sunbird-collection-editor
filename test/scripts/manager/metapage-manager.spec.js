'use strict';

describe('metapage manager', function() {

    var returnMock, pluginInstance;
    var metaInstance =  org.ekstep.collectioneditor.metaPageManager;
    beforeAll(function(done) {
        metaInstance.initialize({ loadNgModules: function() {}});
        spyOn(metaInstance, 'register').and.callThrough();
        spyOn(metaInstance, 'getPages').and.callThrough();
        spyOn(metaInstance, 'registerSidebar').and.callThrough();
        spyOn(metaInstance, 'getSidebar').and.callThrough();
        spyOn(metaInstance, 'registerBreadcrumb').and.callThrough();
        spyOn(metaInstance, 'getBreadcrumb').and.callThrough();
        done();
    });


    describe('MetaPages', function(){
        var config = {
            templateURL : org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.textbookmeta-1.1/editor/textbookmeta.html',
            controllerURL: org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.textbookmeta-1.1/editor/textbookmetaApp.js'
          }
        it('should register meta pages', function() {
            spyOn(metaInstance, 'loadNgModules').and.returnValue(Promise.resolve('Resolved'));

            metaInstance.register(config);
            metaInstance.register({templateURL : config.templateURL});
            expect(metaInstance.register.calls.count()).toEqual(2);
        });

        it('should return registered pages', function() {
            metaInstance.loadNgModules = jasmine.createSpy().and.returnValue(Promise.resolve('Resolved'))
            var returnVal = metaInstance.getPages();
            expect(metaInstance.getPages.calls.count()).toEqual(1);
        });

        it('should register Metapages - Promise Reject', function(){
            metaInstance.loadNgModules = jasmine.createSpy().and.returnValue(Promise.reject())
            metaInstance.register(config);
            var promise =  metaInstance.loadNgModules(config.templateURL, undefined, config.allowTemplateCache)
            promise.then(function() {
                done(new Error('Promise should not be resolved'));
              }, function(reason) {
                  console.log(reason);
                done();
              });
        })
    })
    describe('Sidebar', function(){
        var config = {
            templateURL : org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.suggestcontent-1.1/editor/suggestContent.html',
            controllerURL: org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.suggestcontent-1.1/editor/suggestContentApp.js'
        }
        it('Should register Sidebar', function(){
            metaInstance.loadNgModules = jasmine.createSpy().and.returnValue(Promise.resolve('Resolved'))
            metaInstance.registerSidebar(config);
            metaInstance.registerSidebar({templateURL : config.templateURL});
            expect(metaInstance.registerSidebar.calls.count()).toEqual(2)
        })

        it('Should return registered sidebars', function(){
            metaInstance.loadNgModules = jasmine.createSpy().and.returnValue({ then: function(cb1, cb2) {} })
            var returnVal = metaInstance.getSidebar();
            expect(metaInstance.getSidebar.calls.count()).toEqual(1);
        })
        it('Should register Sidebar - Promise Reject', function(done){
            metaInstance.loadNgModules = jasmine.createSpy().and.returnValue(Promise.reject())
            metaInstance.registerSidebar(config);
            var promise =  metaInstance.loadNgModules(config.templateURL, undefined, config.allowTemplateCache)
            promise.then(function() {
                done(new Error('Promise should not be resolved'));
              }, function(reason) {
                done();
              });
        })
    })

    describe("BreadCrumbs", function(){
        var config = {
            templateURL : org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.breadcrumb-1.1/editor/template.html',
            controllerURL: org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.breadcrumb-1.1/editor/breadcrumbApp.js',
            allowTemplateCache: true,
            identifier:''
        }
        beforeAll(function(done) {
            metaInstance.initialize({ loadNgModules: function() {}});
            done();
        })
        it('Should register BreadCrumbs', function(){
            spyOn(metaInstance, 'loadNgModules').and.returnValue(Promise.resolve('breadCrumbID'));
            metaInstance.registerBreadcrumb(config);
            var promise =  metaInstance.loadNgModules(config.templateURL, undefined, config.allowTemplateCache)
            promise.then(function(value){
                expect(value).toEqual('breadCrumbID')
            })
        })
        it('Should return registered BreadCrumbs', function(){
            var returnVal = metaInstance.getBreadcrumb();
            expect(metaInstance.getBreadcrumb.calls.count()).toEqual(1);
        })
        it('When controller is not present', function(){
            var falseConfig = {
                templateURL : org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.breadcrumb-1.1/editor/template.html',
                controllerURL: '',
                allowTemplateCache: true,
                identifier:''
            }
            metaInstance.loadNgModules = jasmine.createSpy().and.returnValue(Promise.resolve('breadCrumbID'))
            metaInstance.registerBreadcrumb(falseConfig);
            expect(metaInstance.registerBreadcrumb.calls.count()).toEqual(2)
        })

        it('Should register BreadCrumbs - Promise Reject', function(done){
            metaInstance.loadNgModules = jasmine.createSpy().and.returnValue(Promise.reject())
            metaInstance.registerBreadcrumb(config);
            var promise =  metaInstance.loadNgModules(config.templateURL, undefined, config.allowTemplateCache)
            promise.then(function() {
                done(new Error('Promise should not be resolved'));
              }, function(reason) {
                done();
              });
        })


    })
});
