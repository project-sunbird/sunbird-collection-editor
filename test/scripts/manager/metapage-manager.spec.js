'use strict'

describe('metapage manager', function () {
	beforeAll(function (done) {
		org.ekstep.collectioneditor.metaPageManager.initialize({ loadNgModules: function () {} })
		spyOn(org.ekstep.collectioneditor.metaPageManager, 'register').and.callThrough()
		spyOn(org.ekstep.collectioneditor.metaPageManager, 'getPages').and.callThrough()
		spyOn(org.ekstep.collectioneditor.metaPageManager, 'loadNgModules').and.returnValue({ then: function (cb1, cb2) {} })
		done()
	})

	it('should register meta pages', function () {
		var config = {
			templateURL: org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.textbookmeta-1.1/editor/textbookmeta.html',
			controllerURL: org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.textbookmeta-1.1/editor/textbookmetaApp.js'
		}
		org.ekstep.collectioneditor.metaPageManager.register(config)
		org.ekstep.collectioneditor.metaPageManager.register({templateURL: config.templateURL})
		expect(org.ekstep.collectioneditor.metaPageManager.register.calls.count()).toEqual(2)
	})

	it('should return registered pages', function () {
		org.ekstep.collectioneditor.metaPageManager.getPages()
		expect(org.ekstep.collectioneditor.metaPageManager.getPages.calls.count()).toEqual(1)
	})
})
