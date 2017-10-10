org.ekstep.contenteditor = {};
org.ekstep.contenteditor.config = org.ekstep.contenteditor.config || {};
org.ekstep.contenteditor.config.basURL = "https://dev.ekstep.in";



org.ekstep.services.telemetryService = {
    apiCall: function() {}
};

var config = {
    pluginRepo: "base/test/data/content-plugins",
    env: "editor",
    baseURL: "",
    corePluginsPackaged: true,
    dispatcher: 'console',
    apislug: '/action',
    plugins: [{
          id: 'org.ekstep.sunbirdcommonheader',
          ver: '1.0',
          type: 'plugin'
    }],
    editorConfig: {
        "mode": "Edit",
        "contentStatus": "draft",
        "rules": {
            "levels": 3,
            "objectTypes": [{ type: 'TextBook', label: 'Textbook', isRoot: true, editable: true, childrenTypes: ['TextBookUnit', 'Collection', 'Story', 'Worksheet'], addType: 'Editor', iconClass: 'fa fa-book' }, { type: 'TextBookUnit', label: 'Textbook Unit', isRoot: false, editable: true, childrenTypes: ['TextBookUnit', 'Collection', 'Story', 'Worksheet'], addType: 'Editor', iconClass: 'fa fa-folder-o' }, { type: 'Collection', label: 'Collection', isRoot: false, editable: false, childrenTypes: [], addType: 'Browser', iconClass: 'fa fa-file-o' }, { type: 'Story', label: 'Story', isRoot: false, editable: false, childrenTypes: [], addType: 'Browser', iconClass: 'fa fa-file-o' }, { type: 'Worksheet', label: 'Worksheet', isRoot: false, editable: false, childrenTypes: [], addType: 'Browser', iconClass: 'fa fa-file-o' }]
        },
        "defaultTemplate": {}
    }
};

window.org.ekstep.pluginframework.initialize(config);

window.context = {
    "contentId": "do_112295424167223296119",
    "sid": "rctrs9r0748iidtuhh79ust993",
    "user": {
        "id": "390",
        "name": "Santhosh Vasabhaktula",
        "email": "santhosh@ilimi.in"
    }
};

org.ekstep.contenteditor.globalContext = window.context;

window.ServiceConstants = {
    SEARCH_SERVICE: "search",
    POPUP_SERVICE: "popup",
    CONTENT_SERVICE: "content",
    ASSESSMENT_SERVICE: "assessment",
    LANGUAGE_SERVICE: "language",
    META_SERVICE: "meta",
    ASSET_SERVICE: "asset",
    TELEMETRY_SERVICE: "telemetry"
};