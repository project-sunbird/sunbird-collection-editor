window.context = {
    // "contentId": "do_112272630392659968130",
    "contentId": "do_21256981223442841614868", //QA//NCF
    // "contentId": "do_11260400078690713614", //dev
    // "contentId": "do_2125735539644989441526",
    // "contentId": "do_112272630392659968130",
    "sid": "rctrs9r0748iidtuhh79ust993",
    "user": {
        "id": "390",
        "name": "Santhosh Vasabhaktula",
        "email": "santhosh@ilimi.in",
        "organisations" : {
            "2125735539644989441526" : "Sunbird ORG",
            "112272630392659968130" : "EKSteP org"
        }
    },
    "framework": 'NCF',
    "ownershipType": ["createdBy", "createdFor"],
    
    
};

window.config = {
    baseURL: "",
    corePluginsPackaged: true,
    pluginRepo: "/plugins",
    dispatcher: 'console',
    apislug: '/action',
    nodeDisplayCriterion: {
        contentType: ['TextBook', 'TextBookUnit']
    },
    keywordsLimit: 500,
    editorConfig: {
        "mode": "Edit",
        "contentStatus": "draft",
        "rules": {
            "levels": 7,
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