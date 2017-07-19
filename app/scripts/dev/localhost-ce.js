window.context = {
    "contentId": "do_112272630392659968130",
    "sid": "rctrs9r0748iidtuhh79ust993",
    "user": {
        "id": "390",
        "name": "Santhosh Vasabhaktula",
        "email": "santhosh@ilimi.in"
    }
};

window.config = {
    baseURL: "https://dev.ekstep.in",
    corePluginsPackaged: true,
    pluginRepo: "/plugins",
    dispatcher: 'console',
    apislug: '/api',
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
                "iconClass": "fa fa-folder"
            }, {
                "type": "Collection",
                "label": "Collection",
                "isRoot": false,
                "editable": false,
                "childrenTypes": [],
                "addType": "Browser",
                "iconClass": "fa fa-file"
            }, {
                "type": "Content",
                "label": "Content",
                "isRoot": false,
                "editable": false,
                "childrenTypes": [],
                "addType": "Browser",
                "iconClass": "fa fa-file"
            }]
        },
        "defaultTemplate": {}
    }
}
