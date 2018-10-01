/**
 * @description
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 */
org.ekstep.services.stateService = new (Class.extend({

	/**
     * @property {string} state - Used to hold the state object
     */
	state: {},

	/**
     * @description -Intializes the state service instance
     */
	initialize: function () {
		org.ekstep.collectioneditor.cache = {}
	},

	/**
     * @description - Which allows user to create an object inside the state
     */
	create: function (name) {
		this.state[name] = {}
	},
	/**
     * @description - Used to save the state with key-value pair
     * @param {String} key - Name of the Key
     * @param {Object | String} value - Value of the Key
     * @deprecated
     */
	setState: function (objectName, key, value) {
		// NOTE: To support for the backward compatibality.
		// deprecate `org.ekstep.collectioneditor.cache` object
		if (objectName) {
			this.state[objectName][key] = value
			if (objectName === 'nodesModified') {
				org.ekstep.collectioneditor.cache.nodesModified[key] = value
			}
		} else {
			this.state[key] = value
			org.ekstep.collectioneditor.cache.nodesModified[key] = value
		}
	},

	/**
     * @description - Which used get the state value by passing refrence key
     * @return {Object}
     */
	getState: function (key) {
		return this.state[key] || {}
	},

	/**
     * @description - Which is used to remove the state of particular key or object.
     * @param {String} key - Name of the key
     */
	removeState: function (key) {
		delete this.state[key]
	},

	/**
     * @description - Which is used to reset the state
     */
	resetState: function () {
		this.state = {}
	}

}))()
