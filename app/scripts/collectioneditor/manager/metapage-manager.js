org.ekstep.collectioneditor.metaPageManager = new (Class.extend({
	registeredPages: [],
	sidebar: [],
	breadcrumb: [],
	initialize: function (config) {
		this.loadNgModules = config.loadNgModules
	},
	register: function (config) {
		var instance = this
		if (config.templateURL) {
			instance.loadNgModules(config.templateURL, undefined, config.allowTemplateCache).then(function (value) {
				config.identifier = value
			})

			if (config.controllerURL && _.isString(config.controllerURL)) {
				instance.loadNgModules(undefined, config.controllerURL, config.allowTemplateCache)
					.then(function () {
						instance.registeredPages.push(config)
					}, function (e) {
						// eslint-disable-next-line
						throw 'unable to load controller :' + config.controllerURL
					})
			} else {
				instance.registeredPages.push(config)
			}
		};
	},
	getPages: function () {
		return this.registeredPages
	},
	registerSidebar: function (config) {
		var instance = this
		if (config.templateURL) {
			instance.loadNgModules(config.templateURL)
			if (config.controllerURL) {
				instance.loadNgModules(undefined, config.controllerURL)
					.then(function () {
						instance.sidebar.push(config)
					}, function () {
						// eslint-disable-next-line
						throw 'unable to load controller :' + config.controllerURL
					})
			}
		};
	},
	getSidebar: function () {
		return this.sidebar
	},
	registerBreadcrumb: function (config) {
		var instance = this
		if (config.templateURL) {
			instance.loadNgModules(config.templateURL, undefined, config.allowTemplateCache).then(function (value) {
				config.identifier = value
			})
			if (config.controllerURL && _.isString(config.controllerURL)) {
				instance.loadNgModules(undefined, config.controllerURL, config.allowTemplateCache)
					.then(function () {
						instance.breadcrumb.push(config)
					}, function () {
						// eslint-disable-next-line
						throw 'unable to load controller :' + config.controllerURL
					})
			} else {
				instance.breadcrumb.push(config)
			}
		};
	},
	getBreadcrumb: function () {
		return this.breadcrumb
	}
}))()
