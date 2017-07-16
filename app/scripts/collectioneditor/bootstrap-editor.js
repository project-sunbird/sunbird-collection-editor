/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
/* istanbul ignore next. Fabric extension - cannot be tested */

var collection_editor = function() {};
collection_editor.prototype.jQuery = window.$;
collection_editor.prototype._ = window._;
window.org.ekstep.collectioneditor = new collection_editor();

window.ServiceConstants.COLLECTION_SERVICE = "collection";