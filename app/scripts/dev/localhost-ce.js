window.context = {
    "contentId": "do_112272630392659968130",
    "sid": "rctrs9r0748iidtuhh79ust993",
    "user": {
        "id": "390",
        "name": "Santhosh Vasabhaktula",
        "email": "santhosh@ilimi.in"
    },
    "framework":'NCERT'
};

window.config = {
    baseURL: "",
    corePluginsPackaged: true,
    pluginRepo: "/plugins",
    dispatcher: 'console',
    apislug: '/action',
    showContentInTree : true,
    keywordsLimit:500,
    editorConfig: {
        "mode": "Edit",
        "contentStatus": "draft",
        "rules": {
            "levels": 3,
            "objectTypes": [{
                "type": "TextBook",
                "label": "Textbook",
                "isRoot": true,
                "editable": true,
                "childrenTypes": ["TextBookUnit"],
                "addType": "Editor",
                "iconClass": "fa fa-book"
            }, {
                "type": "TextBookUnit",
                "label": "Textbook Unit",
                "isRoot": false,
                "editable": true,
                "childrenTypes": ["TextBookUnit", "Collection", "Content"],
                "addType": "Editor",
                "iconClass": "fa fa-folder-o"
            }, {
                "type": "Collection",
                "label": "Collection",
                "isRoot": false,
                "editable": false,
                "childrenTypes": [],
                "addType": "Browser",
                "iconClass": "fa fa-file-o"
            }, {
                "type": "Content",
                "label": "Content",
                "isRoot": false,
                "editable": false,
                "childrenTypes": [],
                "addType": "Browser",
                "iconClass": "fa fa-file-o"
            }]
        },
        "defaultTemplate": {}
    }
}
