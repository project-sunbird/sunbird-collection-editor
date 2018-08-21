describe('content editor integration test: ', function () {
	beforeAll(function (done) {
		org.ekstep.contenteditor.globalContext = {}
		var corePlugins = [
			{ 'id': 'org.ekstep.collectioneditor', 'ver': '1.0', 'type': 'plugin' },
			{ 'id': 'org.ekstep.download', 'ver': '1.0', 'type': 'plugin' }
		]

		org.ekstep.contenteditor.config.useProxyForURL = false
		org.ekstep.contenteditor.config.corePluginsPackaged = false
		org.ekstep.contenteditor.config.editorConfig = {
			'mode': 'Edit',
			'contentStatus': 'draft',
			'rules': {
				'levels': 3,
				'objectTypes': [{ type: 'TextBook', label: 'Textbook', isRoot: true, editable: true, childrenTypes: ['TextBookUnit', 'Collection', 'Story', 'Worksheet'], addType: 'Editor', iconClass: 'fa fa-book' }, { type: 'TextBookUnit', label: 'Textbook Unit', isRoot: false, editable: true, childrenTypes: ['TextBookUnit', 'Collection', 'Story', 'Worksheet'], addType: 'Editor', iconClass: 'fa fa-folder-o' }, { type: 'Collection', label: 'Collection', isRoot: false, editable: false, childrenTypes: [], addType: 'Browser', iconClass: 'fa fa-file-o' }, { type: 'Story', label: 'Story', isRoot: false, editable: false, childrenTypes: [], addType: 'Browser', iconClass: 'fa fa-file-o' }, { type: 'Worksheet', label: 'Worksheet', isRoot: false, editable: false, childrenTypes: [], addType: 'Browser', iconClass: 'fa fa-file-o' }]
			},
			'defaultTemplate': {}
		}

		org.ekstep.services.config = {
			baseURL: org.ekstep.contenteditor.config.baseURL,
			apislug: org.ekstep.contenteditor.config.apislug
		}

		org.ekstep.pluginframework.initialize({
			env: 'editor',
			pluginRepo: 'https://s3.ap-south-1.amazonaws.com/ekstep-public-dev/content-plugins'
		})

		org.ekstep.pluginframework.pluginManager.loadAllPlugins(corePlugins, undefined, function () {
			done()
		})
	})

	it('should load default plugins', function () {
		var context = { contentId: 'do_112295424167223296119', uid: 346 }
		spyOn(org.ekstep.pluginframework.pluginManager, 'loadAllPlugins')
		org.ekstep.contenteditor._loadDefaultPlugins(context, function () {})
		// expect(org.ekstep.contenteditor.config.plugins).toEqual('');
		expect(org.ekstep.pluginframework.pluginManager.loadAllPlugins).toHaveBeenCalledWith(org.ekstep.contenteditor.config.plugins, undefined, jasmine.any(Function))
	})
})
