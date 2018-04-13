/**
 * @description
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 */
org.ekstep.services.stateService = new(Class.extend({

    /**
     * @property    -
     */
    state: {
        /**
         * @property            - Object which contains only modified nodes
         */
        nodesModified: {},
        /**
         * @property            - Object which contains only dialcode values
         */
        dialCodeMap: {},

        /**
         * @property            - Object which contains only collection of nodes hierarchy
         */
        hierarchy: {}
    },

    /**
     * @description
     */
    initialize: function(state) {
        this.state = state || this.state;
        org.ekstep.collectioneditor.cache = {};
    },

    /**
     * @description                 - Which is used to set the dial code value
     * @param {Object} value        
     */
    setDialCode: function(key, value) {
        this.state.dialCodeMap[key] = value;
    },

    /**
     * @description                 - Which is used to get the dial code value
     * @returns {Object}
     */
    getDialCode: function() {
        return _.cloneDeep(this.state.dialCodeMap);
    },

    /**
     * @description                 - Which is used to reset the dialCode object
     */
    resetDialcode: function() {
        this.state.dialCodeMap = {};
    },

    /**
     * @description                 - Which is used to set the modified nodes object
     */
    setNodesModified: function(key, value) {
        this.state.nodesModified[key] = value;
        // For backward compatibility need to remove this
        org.ekstep.collectioneditor.cache.nodesModified[key] = value;
    },

    /**
     * @description                 - Which is used to get the modified nodes 
     * @returns {Object}
     */
    getNodesModified: function() {
        return _.cloneDeep(this.state.nodesModified);
    },

    /**
     * @description                 - Which is used to reset the modified nodes object
     */
    resetNodesModified: function() {
        this.state.nodesModified = {}
    },

    /**
     * @description                 - Which is used to set the hierarchy object
     */
    setHierarchy: function(key, value) {
        this.state.hierarchy[key] = value
    },

    /**
     * @description                 - Which is used to get the hierarchy object
     * @return {Object}
     */
    getHierarchy: function() {
        return _.cloneDeep(this.state.hierarchy);
    },

    /**
     * @description                 - Which is used to reset the hierarchy object
     */
    resetHierarchy: function() {
        this.state.hierarchy = {}
    }

}))