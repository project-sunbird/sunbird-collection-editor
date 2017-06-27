/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
/* istanbul ignore next. Fabric extension - cannot be tested */

var content_editor = function() {};
content_editor.prototype.jQuery = window.$;
content_editor.prototype._ = window._;
window.org.ekstep.contenteditor = new content_editor();
window.org.ekstep.collectioneditor = new content_editor();
content_editor = undefined;

window.ServiceConstants = {
    SEARCH_SERVICE: "search",
    POPUP_SERVICE: "popup",
    CONTENT_SERVICE: "content",
    ASSESSMENT_SERVICE: "assessment",
    LANGUAGE_SERVICE: "language",
    META_SERVICE: "meta",
    ASSET_SERVICE: "asset",
    TELEMETRY_SERVICE: "telemetry"
}

window.ManagerConstants = {
    EVENT_MANAGER: "event",    
    PLUGIN_MANAGER: "plugin",
    RESOURCE_MANAGER: "resource"   
}