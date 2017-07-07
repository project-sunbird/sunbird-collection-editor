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
        var instance = this;
        if (title) ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode().applyPatch({ 'title': title }).done(function(a, b) {
            instance.onRenderNode(undefined, { node: ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode() }, true);
        });
    },
    setActiveNode: function(key) {
        if (key) ecEditor.jQuery("#collection-tree").fancytree("getTree").getNodeByKey(key).setActive();
    },
    addNode: function(objectType) {
        var selectedNode = this.getActiveNode();
        objectType = this.getObjectType(objectType);
        var node = {};
        node.title = 'Untitled ' + objectType.label;
        node.objectType = objectType.type;
        node.id = UUID();
        node.root = false;
        node.folder = (objectType.childrenTypes.length > 0);
        node.icon = objectType.iconClass;
        node.metadata = {};
        selectedNode.addChildren(node);
        selectedNode.sortChildren(null, true);
        selectedNode.setExpanded();
        org.ekstep.collectioneditor.cache.nodesModified[node.id] = { isNew: true, contentType: objectType.type };
    },
    removeNode: function() {
        var selectedNode = this.getActiveNode();
        if (!selectedNode.root) {
            var result = confirm("Do you want to remove this unit?");
            if (result == true) {
                selectedNode.remove();
            }
        }
    },
    getContextMenuTemplate: function(objectType) {
        var instance = this;
        var childrenTypes = this.getObjectType(objectType).childrenTypes;
        var contextMenu = "";
        if (childrenTypes && childrenTypes.length === 0) return undefined;
        ecEditor._.forEach(childrenTypes, function(types) {
            if (instance.getObjectType(types).label) contextMenu = contextMenu + '<div class="item" onclick="org.ekstep.collectioneditor.api.getService(\'collection\').addNode(\'' + types + '\')">' + instance.getObjectType(types).label + '</div>';
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
            },
            activate: function(event, data) { 
                ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:selected', data.node);               
                ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:selected:' + data.node.data.objectType, data.node);
            },
            dnd: {
                autoExpandMS: 400,
                focusOnClick: true,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                dragStart: function(node, data) {
                    var config = instance.getConfig();
                    if (config.mode === "Edit") return true;
                    if (config.mode === "Read") return false;
                },
                dragEnter: function(node, data) {
                    return true;
                },
                dragDrop: function(node, data) {
                    if (data.hitMode === "before" || data.hitMode === "after") return false;
                    if (node.data && node.data.objectType) {
                        var dropAllowed = _.includes(instance.getObjectType(node.data.objectType).childrenTypes, data.otherNode.data.objectType);
                        if (dropAllowed) {
                            data.otherNode.moveTo(node, data.hitMode)
                        } else {
                            alert(data.otherNode.title + " cannot be added to " + data.node.title);
                        }
                    }
                }
            },
            renderNode: function(event, data) {
                instance.onRenderNode(event, data)
            }
        });
        var node = ecEditor.jQuery("#collection-tree").fancytree("getRootNode");
        node.sortChildren(null, true);
        node.getFirstChild().setActive(); //select the first node by default
    },
    onRenderNode: function(event, data, force) {
        var instance = this;
        var node = data.node;
        var $nodeSpan = $(node.span);
        var config = this.config;
        // for read mode do not add context menu on node
        if (config.mode === "Read") return;
        // limit adding nodes depending on config levels for nested stucture
        if (((!$nodeSpan.data('rendered') || force) && data.node.getLevel() >= config.rules.levels) || (!$nodeSpan.data('rendered') && this.getObjectType(data.node.data.objectType).childrenTypes.length == 0)) {
            var contextButton = $('<span style="padding-left: 20px;left: 65%;"><i class="remove icon" onclick="org.ekstep.collectioneditor.api.getService(\'collection\').removeNode()"></i></span>');
            $nodeSpan.append(contextButton);
            contextButton.hide();
            $nodeSpan.hover(function() { contextButton.show(); }, function() { contextButton.hide(); });
            $nodeSpan.data('rendered', true);
        }

        if ((!$nodeSpan.data('rendered') || force) && (this.getObjectType(data.node.data.objectType).childrenTypes.length > 0)) {
            if (org.ekstep.collectioneditor.collectionService.getContextMenuTemplate(data.node.data.objectType)) {
                var contextButton = $(org.ekstep.collectioneditor.collectionService.getContextMenuTemplate(data.node.data.objectType));
                $nodeSpan.append(contextButton);
                $nodeSpan.hover(function() { contextButton.show(); }, function() { contextButton.hide(); });
                $nodeSpan.data('rendered', true);
                contextButton.hide();
                instance.initContextMenuDropDown();
            }
        }
    },
    initContextMenuDropDown: function() {
        setTimeout(function() {
            ecEditor.jQuery('.ui.inline.dropdown').dropdown({});
        }, 200);
    },
    getObjectType: function(type) {
        return _.find(this.config.rules.objectTypes, function(obj) {
            return obj.type === type
        });
    },
    fromCollection: function(data) {
        var treeData = this._buildTree(data);
        var instance = this;
        this.addTree([{
            "id": data.identifier || UUID(),
            "title": data.name,
            "objectType": data.contentType,
            "metadata": _.omit(data, ["children", "collections"]),
            "folder": true,
            "children": treeData,
            "root": true,
            "icon": instance.getObjectType(data.contentType).iconClass
        }]);
    },
    _buildTree: function(data, tree) {
        var instance = this,
            tree = tree || [];
        _.forEach(data.children, function(child) {
            var objectType = instance.getObjectType(child.contentType);
            var childTree = [];
            if (objectType) {
                tree.push({
                    "id": child.identifier || UUID(),
                    "title": child.name,
                    "objectType": child.contentType,
                    "metadata": _.omit(child, ["children", "collections"]),
                    "folder": (objectType.childrenTypes.length > 0),
                    "children": childTree,
                    "root": false,
                    "icon": instance.getObjectType(child.contentType).iconClass
                });
                if (objectType.childrenTypes.length > 0) {
                    instance._buildTree(child, childTree);
                }
            }
        });

        return tree;
    },
    getCollectionHierarchy: function(data) {
        var instance = this;

        if (!data) return;
        instance.data[data.data.id] = {
            "name": data.title,
            "contentType": data.data.objectType,
            "children": [],
            "root": data.data.root
        }

        if (data.children && data.children.length > 0) {
            instance.data[data.data.id].children = ecEditor._.map(data.children, function(child) {
                return child.data.id
            });
        }

        ecEditor._.forEach(data.children, function(collection) {
            instance.getCollectionHierarchy(collection);
        });

        return instance.data;
    }
}));
