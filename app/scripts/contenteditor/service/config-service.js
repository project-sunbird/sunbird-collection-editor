org.ekstep.collectioneditor = org.ekstep.collectioneditor || {};

org.ekstep.collectioneditor.configService = new(Class.extend({
    baseConfig: {
        "levels": 4,
        "mode": "edit/read",
        "defaultTemplate": {
            "title": "Untitled TextBook",
            "objectType": "TextBook",
            "folder": false,
            "metadata": {},
            "children": []
        }
    },
    hierarchyDefinition: {
        "objectTypes": ["TextBook", "TextBookUnit", "Collection", "Content"],
        "definition": {
            "TextBook": {
                "root": true,
                "childrenTypes": ["TextBook", "TextBookUnit", "Collection"],
                "additionalConfig": {}
            },
            "TextBookUnit": {
                "root": false,
                "childrenTypes": ["TextBookUnit", "Collection", "Content"],
                "additionalConfig": {}
            },
            "Collection": {
                "root": false,
                "childrenTypes": [],
                "additionalConfig": {}
            },
            "Content": {
                "root": false,
                "childrenTypes": [],
                "additionalConfig": {}
            }
        }
    },
    buildConfig: function(data, tree) {
        var instance = this,
            config;
        var tree = tree || [];

        if (!data) return _.cloneDeep(instance.baseConfig);

        data.children = _.orderBy(data.children, ['mimeType']);
        ecEditor._.forEach(data.children, function(collection) {
            var child = [];
            if (collection.children && collection.children.length > 0) {
                tree.push({
                    "title": collection.name,
                    "objectType": collection.contentType,
                    "metadata": collection,
                    "children": child,
                    "folder": true
                });
                instance.buildConfig(collection, child);
            } else {
                tree.push({
                    "title": collection.name,
                    "objectType": collection.contentType,
                    "metadata": collection
                });
            }
        });

        config = _.cloneDeep(instance.baseConfig);
        config.defaultTemplate.title = data.name;
        config.defaultTemplate.metadata = data;
        config.defaultTemplate.children = tree;
        return config;
    },
    getConfig: function(data, tree) {
        var instance = this,
            config;
        var tree = tree || [];
        ecEditor._.forEach(data.children, function(node) {
            var child = [];            
            if (node.children && node.children.length > 0) {
                tree.push({
                    "title": node.title,
                    "objectType": node.data.objectType,
                    "metadata": node.data.metadata,
                    "children": child,
                    "folder": node.folder
                });
                instance.getConfig(node, child);
            } else {
                tree.push({
                    "title": node.title,
                    "objectType": node.data.objectType,
                    "metadata": node.data.metadata
                });
            }
        });

        config = _.cloneDeep(instance.baseConfig);
        config.defaultTemplate.title = data.title;
        config.defaultTemplate.metadata = data.data.metadata;
        config.defaultTemplate.children = tree;
        return config;
    },
    getHierarchyDefinition: function() {
        return this.hierarchyDefinition;
    }
}));
