'use strict'

describe('container manager', function () {
	beforeAll(function (done) {
		org.ekstep.contenteditor.containerManager.initialize({ loadNgModules: function () {}, scope: { addToSidebar: function () {} } })
		spyOn(org.ekstep.contenteditor.containerManager, 'register').and.callThrough()
		spyOn(org.ekstep.contenteditor.containerManager, 'load').and.callThrough()
		spyOn(org.ekstep.contenteditor.containerManager, 'loadNgModules').and.returnValue({ then: function (cb1, cb2) {} })
		done()
	})

	it('should register the container', function () {
		var container = {
			'id': 'tree',
			'templateURL': org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.textbookmeta-1.1/editor/collectiontree.html',
			'controllerURL': org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.textbookmeta-1.1/editor/collectionEditorApp.js'
		}
		var collectionManifest = org.ekstep.contenteditor.config.pluginRepo + '/org.ekstep.collectioneditor-1.0/manifest.json'
		org.ekstep.contenteditor.containerManager.register(container, collectionManifest)
		expect(org.ekstep.contenteditor.containerManager.register.calls.count()).toEqual(1)
	})
})
