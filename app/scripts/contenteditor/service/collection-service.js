org.ekstep.collectioneditor.collectionService = new(Class.extend({
    config: undefined,
    data: {},
    initialize: function(config) {
        if (config) this.config = config;
    },
    getConfig: function() {
        return this.config;
    },
    getTreeObject: function() {
        return ecEditor.jQuery("#collection-tree").fancytree("getTree").toDict(true);
    },
    getActiveNode: function() {
        return ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode();
    },
    setNodeTitle: function(title) {
        if(title) ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode().setTitle(title);
    },
    addNode: function(objectType) {
        var selectedNode = this.getActiveNode();
        var config = org.ekstep.collectioneditor.collectionService.getConfig();
        var node = _.clone(config.defaultTemplate);
        node.title = 'Untitled ' + config.labels[objectType];
        node.objectType = objectType;
        node.id = UUID();
        node.root = false;
        if (config.rules.definition[objectType].childrenTypes.length > 0) node.folder = true;
        selectedNode.addChildren(node);
        selectedNode.sortChildren(null, true);
        selectedNode.setExpanded();
        ecEditor.dispatchEvent("org.ekstep.collectioneditor:collectioneditormeta");
    },
    removeNode: function() {
        var selectedNode = this.getActiveNode();
        var config = org.ekstep.collectioneditor.collectionService.getConfig()
        if (!config.rules.definition[selectedNode.data.objectType].root) {
            var result = confirm("Do you want to remove this unit?");
            if (result == true) {
                selectedNode.remove();
            }
        }
    },
    getContextMenuTemplate: function(objectType) {
        var instance = this;
        var childrens = this.config.rules.definition[objectType].childrenTypes;
        var contextMenu = "";
        if (childrens && childrens.length === 0) return undefined;
        ecEditor._.forEach(childrens, function(child) {
            if (instance.config.labels[child]) contextMenu = contextMenu + '<div class="item" onclick="org.ekstep.collectioneditor.api.getService(\'collection\').addNode(\'' + child + '\')">' + instance.config.labels[child] + '</div>';
        });

        return '<span style="padding-left: 20px;left: 65%;">' +
            '<div class="ui inline dropdown">' +
            '<i class="add square icon"></i>' +
            '<div class="menu">' +
            contextMenu +
            '</div>' +
            '</div>' +
            '<i class="remove icon" onclick="org.ekstep.collectioneditor.api.getService(\'collection\').removeNode()"></i></span>'
    },
    addTree: function(tree) {
        var instance = this;
        ecEditor.jQuery("#collection-tree").fancytree({
            extensions: ["dnd"],
            source: tree,
            modifyChild: function(event, data) {
                if (data && data.operation === "add") org.ekstep.collectioneditor.mutationService.add("nodesAdded", { "ts": Date.now(), "target": data.childNode.key, "action": "add", "parent": data.node.key, "attribute": "node", "oldValue": "", "newValue": data.childNode.toDict(true), "position": data.node.getLevel() + 1 });
                if (data && data.operation === "remove") org.ekstep.collectioneditor.mutationService.add("nodesRemoved", { "ts": Date.now(), "target": data.key, "action": "delete", "parent": data.node.parent.key, "attribute": "node", "oldValue": data.node.toDict(true), "newValue": "", "position": data.node.getLevel() });
            },
            dnd: {
                autoExpandMS: 400,
                focusOnClick: true,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                dragStart: function(node, data) {
                    var config = org.ekstep.collectioneditor.collectionService.getConfig();
                    if (config.mode === "edit") return true;
                    if (config.mode === "read") return false;
                },
                dragEnter: function(node, data) {
                    return true;
                },
                dragDrop: function(node, data) {
                    if (data.hitMode === "before" || data.hitMode === "after") return false;
                    var config = org.ekstep.collectioneditor.collectionService.getConfig();

                    if (node.data && node.data.objectType) {
                        var dropAllowed = _.includes(config.rules.definition[node.data.objectType].childrenTypes, data.otherNode.data.objectType);
                        if (dropAllowed) {
                            data.otherNode.moveTo(node, data.hitMode)
                        } else {
                            alert(data.otherNode.title + " cannot be added to " + data.node.title);
                        }
                    }
                }
            },
            renderNode: function(event, data) {
                var node = data.node;
                var $nodeSpan = $(node.span);
                var config = org.ekstep.collectioneditor.collectionService.getConfig();
                // for read mode do not add context menu on node
                if (config.mode === "read") return;
                // limit adding nodes depending on config levels for nested stucture
                if ((!$nodeSpan.data('rendered') && data.node.getLevel() >= config.levels) || (!$nodeSpan.data('rendered') && config.rules.definition[data.node.data.objectType].childrenTypes.length == 0)) {
                    var contextButton = $('<span style="padding-left: 20px;left: 65%;"><i class="remove icon" onclick="org.ekstep.collectioneditor.api.getService(\'collection\').removeNode()"></i></span>');
                    $nodeSpan.append(contextButton);
                    contextButton.hide();
                    $nodeSpan.hover(function() { contextButton.show(); }, function() { contextButton.hide(); });
                    $nodeSpan.data('rendered', true);
                }

                if (!$nodeSpan.data('rendered') && (config.rules.definition[data.node.data.objectType].childrenTypes.length > 0)) {
                    if (org.ekstep.collectioneditor.collectionService.getContextMenuTemplate(data.node.data.objectType)) {
                        var contextButton = $(org.ekstep.collectioneditor.collectionService.getContextMenuTemplate(data.node.data.objectType));
                        $nodeSpan.append(contextButton);
                        $nodeSpan.hover(function() { contextButton.show(); }, function() { contextButton.hide(); });
                        $nodeSpan.data('rendered', true);
                        contextButton.hide();
                        instance.initContextMenuDropDown();
                    }
                }
            }
        });
        var node = ecEditor.jQuery("#collection-tree").fancytree("getRootNode");
        node.sortChildren(null, true);
    },
    initContextMenuDropDown: function() {
        setTimeout(function() { 
            ecEditor.jQuery('.ui.inline.dropdown').dropdown({});
            ecEditor.dispatchEvent("org.ekstep.collectioneditor:collectioneditormeta");
        }, 200);
    },
    toCollection: function(data) {
        var instance = this;

        if (!data) return;
        instance.data[data.data.id] = {
            "title": data.title,
            "objectType": data.data.objectType,
            "metadata": data.data.metadata,
            "children": [],
            "root": data.data.root
        }

        if (data.children && data.children.length > 0) instance.data[data.data.id].children = ecEditor._.map(data.children, function(child) {
            return child.data.id
        });

        ecEditor._.forEach(data.children, function(collection) {            
            if (collection.children && collection.children.length > 0) {
                instance.toCollection(collection);
            }
        });

        return instance.data;
    },
    fromCollection: function(data) {
        var rootNode = _.pickBy(data, function(data) {
            return data.root === true
        });

        //TODO: raise error telemetry
        if (!rootNode) {
            console.error("Root node not found from the data");
            return;
        }
        this.data = data;
        return this._buildFancyTree(rootNode);

    },
    _buildFancyTree: function(data, tree) {
        var instance = this,
            tree = tree || [];
        _.forIn(data, function(obj, id) {
            var child = [];
            tree.push({
                "title": obj.title,
                "objectType": obj.objectType,
                "metadata": obj.metadata,
                "children": child,
                "id": id,
                "folder": (instance.getConfig().rules.definition[obj.objectType].childrenTypes.length > 0),
                "root": obj.root
            });

            if (obj.children && obj.children.length > 0) {
                _.forEach(obj.children, function(childId, obj) { 
                    obj = _.pick(instance.data, [childId]);
                    instance._buildFancyTree(obj, child);
                });
            }
        });

        return tree;
    }
}));
