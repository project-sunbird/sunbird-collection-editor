/**
 * @description
 * @author  Manjunath Davanam <manjunathd@ilimi.in>
 */
org.ekstep.services.stateService = new(Class.extend({


    /**
     * @property {string} state - Used to hold the state object
     */
    state: {},

    /**
     * @description         -Intializes the state service instance
     */
    initialize() {
        org.ekstep.collectioneditor.cache = {};
    },

    /**
     * @description             - Used to save the state with key-value pair
     * @param {String} key      - Name of the Key
     * @param {Object | String} value    - Value of the Key
     * @deprecated
     */
    setState(key, value) {
        this.state[key] = value;
        // NOTE: To support for the backward compatibality.
        // deprecate `org.ekstep.collectioneditor.cache` object
        org.ekstep.collectioneditor.cache.nodesModified[key] = value;

    },

    /**
     * @description         -  Which used get the state value by passing refrence key
     * @return  {Object}    
     */
    getState(key) {
        return this.state[key] || {}
    },

    /**
     * @description            - Which is used to remove the state of particular key or object.
     * @param {String} key     - Name of the key
     */
    removeState(key) {
        delete this.state[key]
    },

    /**
     * @description            - Which is used to reset the state
     */
    resetState() {
        this.state = {}
    }


}))