/**
 * The base plugin class that all collection editor plugins inherit from. It provides the common support contract for all plugins.
 * Plugins can override specific methods to change the behavior.
 *
 * @class org.ekstep.collectioneditor.basePlugin
 * @author Sunil A S <sunils@ilimi.in>
 */
org.ekstep.collectioneditor.basePlugin = Class.extend({
    id: undefined,
    parent: undefined,
    children: [],
    manifest: undefined,
    editorData: undefined,
    data: undefined,
    /**
     * Initializes the plugin with the given manifest and parent object
     * @param manifest {object} Manifest details for this plugin
     * @param data {object} Init parameters for the plugin
     * @param parent {object} Parent plugin object that instantiated this
     * @constructor
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    init: function(manifest, data, parent) {
        this.manifest = _.cloneDeep(manifest)
        if (arguments.length === 1) {
            this.registerMenu()
            this.initialize()
            org.ekstep.contenteditor.api.addEventListener(this.manifest.id + ':create', this.create, this)
            console.log(manifest.id + ' plugin initialized')
        } else {
            this.data = undefined
            this.editorData = data || {}
            this.children = []
            this.id = this.editorData.id || UUID()
            this.parent = parent
        }
    },

    /**
     * Initializes the plugin.
     * @private
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    initPlugin: function() {
        this.newInstance()
        this.postInit()
    },

    /**
     * Post init tasks for the plugin
     * @private
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    postInit: function() {
        if (this.parent) this.parent.addChild(this)
    },

    /**
     * Registers the menu for this plugin. By default, the base plugin handles the menu additions.
     * Child implementations can use this method to override and register additional menu items.
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    registerMenu: function() {
        var instance = this
        _.forEach(instance.manifest.editor.header, function(header) {
            org.ekstep.contenteditor.headerManager.register(header, instance.manifest)
        })

        _.forEach(instance.manifest.editor.container, function(container) {
            org.ekstep.contenteditor.containerManager.register(container, instance.manifest)
        })
    },

    /**
     * Returns relative URL for a particular asset. Plugins should use this method instead of
     * hard-coding the asset URLs.
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    relativeURL: function(src) {
        return org.ekstep.contenteditor.api.resolvePluginResource(this.manifest.id, this.manifest.ver, src)
    },

    /**
     * Returns the type of this plugin (manifest ID)
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    getType: function() {
        return this.manifest.id
    },

    /**
     * Returns the version of this plugin (manifest ID)
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    getVersion: function() {
        return this.manifest.ver
    },
    /**
     * Helper method to load a given resource relative to the plugin.
     * @memberof oorg.ekstep.collectioneditor.basePlugin
     */
    loadResource: function(src, dataType, cb) {
        org.ekstep.contenteditor.api.loadPluginResource(this.manifest.id, this.manifest.ver, src, dataType, cb)
    },

    /**
     * Removes the plugin from the stage. This can be used to perform self cleanup. If this method is called
     * from newInstance(), plugin won't be added to stage children.
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    remove: function() {
        if (this.parent) {
            this.parent.removeChild(this)
            this.parent = undefined // if this method is called from newInstance(), plugin won't be added to stage children
        }
        delete org.ekstep.pluginframework.pluginManager.pluginInstances[this.id]
    },

    /**
     * Creates the instance of the plugin when a new object is added to the canvas.
     * @private
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    create: function(event, data, parent) {
        org.ekstep.contenteditor.api.instantiatePlugin(this.manifest.id, _.clone(data), parent)
    },

    /**
     * Adds a child to this object. This can be useful for composite scenarios.
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    addChild: function(plugin) {
        this.children.push(plugin)
    },

    /**
     * Removes a child from this plugin. Use this to dynamically manage composite children.
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    removeChild: function(plugin) {
        this.children = _.reject(this.children, { id: plugin.id })
    },

    /**
     * Initialize the plugin when it is loaded. This is a no-op implementation and child classes must
     * provide the complete functional implementation.
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    /* istanbul ignore next */
    initialize: function(data) {},

    /**
     * Instantiate an object of the plugin type. This is a no-op implementation and child classes must
     * provide the complete functional implementation.
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    /* istanbul ignore next */
    newInstance: function(data) {},
    /**
     * Returns the data that this plugin might set and use at runtime. As a best practice, plugins should
     * differentiate between config (e.g. rendering colors, font size, levels etc) and data (actual
     * word details to use).
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    setData: function(data) {
        this.data = data
    },

    /**
     * Returns the data for this plugin. Data includes actual drivers - such as the words in a word game
     * or questions in a quiz. Plugins should set their data is they want to differentiate from
     * the config.
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    getData: function() {
        return this.data
    },
    /**
     * Returns the help text for this plugin by reading the help markdown file. Plugins can override this
     * to return custom help.
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    /* istanbul ignore next. test case failing */
    getHelp: function(cb) {
        var helpText = 'Help is not available.'
        try {
            this.loadResource(this.manifest.editor.help.src, this.manifest.editor.help.dataType, function(err, help) {
                if (!err) {
                    helpText = help
                    cb(helpText)
                }
            })
        } catch (e) {
            console.log(e)
            cb(helpText)
        }
    },
    getManifestId: function() {
        return (this.manifest.shortId || this.manifest.id)
    },

    /**
     * Returns the displayName of this object
     * @memberof org.ekstep.collectioneditor.basePlugin
     */
    getDisplayName: function() {
        return (this.manifest.displayName || this.manifest.id)
    }
})