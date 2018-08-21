/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
/* istanbul ignore next. Fabric extension - cannot be tested */
// eslint-disable-next-line
var collection_editor = function () {}
collection_editor.prototype.jQuery = window.$
collection_editor.prototype._ = window._
// eslint-disable-next-line
window.org.ekstep.collectioneditor = new collection_editor()

window.ServiceConstants.COLLECTION_SERVICE = 'collection'
