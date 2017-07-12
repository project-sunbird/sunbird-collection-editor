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
    clearFilter: function() {
        ecEditor.jQuery("#collection-tree").fancytree("getTree").clearFilter();
    },
    filterNode: function(text) {
        if(text) ecEditor.jQuery("#collection-tree").fancytree("getTree").filterNodes(text, {autoExpand: true });
    },
    addNode: function(objectType, data) {
        data = data || {};
        var selectedNode = this.getActiveNode();
        objectType = this.getObjectType(objectType);
        var node = {};
        node.title = data.name ? data.name : 'Untitled ' + objectType.label;
        node.objectType = data.contentType || objectType.type;        
        node.id = data.identifier ? data.identifier : UUID();
        node.root = false;
        node.folder = (objectType.childrenTypes.length > 0);
        node.icon = objectType.iconClass;
        node.metadata = data || {};
        selectedNode.addChildren(node);
        selectedNode.sortChildren(null, true);
        selectedNode.setExpanded();
        org.ekstep.services.telemetryService.interact({ "type": 'click', "subtype": 'add', "target": 'node', "pluginid": "org.ekstep.collectioneditor", "pluginver": "1.0", "objectid": node.id, "stage": node.id });
    },
    removeNode: function() {
        var selectedNode = this.getActiveNode();
        if (!selectedNode.data.root) {
            var result = ecEditor.getService('popup').open({
                template: '<div class="ui icon negative message remove-unit-popup"><i class="close icon" ng-click="closeThisDialog()"></i><div class="content"><div class="header"><i class="fa fa-exclamation-triangle"></i> Do you want to remove this?</div><div class="remove-unit-buttons" style="padding-right:0; text-align:right;"><div class="ui red button button-overrides" id="remove-yes-button" ng-click="confirm()">Yes</div><div class="ui basic primary button button-overrides" id="remove-no-button" ng-click="closeThisDialog()">No</div></div></div></div>',
                controller: ["$scope", function($scope) {
                    $scope.confirm = function() {
                        selectedNode.remove();
                        $scope.closeThisDialog();
                        delete org.ekstep.collectioneditor.cache.nodesModified[selectedNode.data.id];
                    };
                }],
                plain: true,
                showClose: false
            });
        }
    },
    getContextMenuTemplate: function(objectType) {
        var instance = this;
        var childrenTypes = this.getObjectType(objectType).childrenTypes;
        var contextMenu = "";
        if (childrenTypes && childrenTypes.length === 0) return undefined;
        ecEditor._.forEach(childrenTypes, function(types) {
            if (instance.getObjectType(types).addType === "Browser") {
                contextMenu = contextMenu + '<div class="item" onclick="org.ekstep.collectioneditor.collectionService.addLesson(\'' + types + '\')">' + instance.getObjectType(types).label + '</div>';
            } else {
                contextMenu = contextMenu + '<div class="item" onclick="org.ekstep.collectioneditor.api.getService(\'collection\').addNode(\'' + types + '\')">' + instance.getObjectType(types).label + '</div>';
            }
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
    addLesson: function(type) {
        var instance = this;
        ecEditor.dispatchEvent("org.ekstep.lessonbrowser:show", {
            filters: { lessonType: [type] },
            callback: function(err, res) {
                if (res) {
                    _.forEach(res, function(obj) {
                        instance.addNode(obj.contentType, obj);
                    });
                }
            }
        });
    },
    addTree: function(tree) {
        var instance = this;
        ecEditor.jQuery("#collection-tree").fancytree({
            extensions: ["dnd", "filter"],
            source: tree,
            modifyChild: function(event, data) {
                if (data && data.operation === "remove") {
                    org.ekstep.services.telemetryService.interact({ "type": 'click', "subtype": 'remove', "target": 'node', "pluginid": "org.ekstep.collectioneditor", "pluginver": "1.0", "objectid": data.node.data.id, "stage": data.node.data.id });
                    ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild().setActive();
                }
            },
            activate: function(event, data) {
                ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:selected', data.node);
                ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:selected:' + data.node.data.objectType, data.node);
                org.ekstep.services.telemetryService.interact({ "type": 'click', "subtype": 'select', "target": 'node', "pluginid": "org.ekstep.collectioneditor", "pluginver": "1.0", "objectid": data.node.data.id, "stage": data.node.data.id });
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
                    if (instance.config.rules && instance.config.rules.levels) {
                        if ((instance.checkTreeDepth(data.otherNode) + node.getLevel()) > instance.config.rules.levels) {
                            alert('Operation not allowed');
                            return false;
                        }
                    }
                    if (node.data && node.data.objectType) {
                        var dropAllowed = _.includes(instance.getObjectType(node.data.objectType).childrenTypes, data.otherNode.data.objectType);
                        if (dropAllowed) {
                            data.otherNode.moveTo(node, data.hitMode);
                            org.ekstep.services.telemetryService.interact({ "type": 'click', "subtype": 'dragndrop', "target": 'node', "pluginid": "org.ekstep.collectioneditor", "pluginver": "1.0", "objectid": data.node.data.id, "stage": data.node.data.id });
                        } else {
                            alert(data.otherNode.title + " cannot be added to " + data.node.title);
                        }
                    }
                },
                filter: {
                    autoApply: true,
                    autoExpand: false,
                    counter: true,
                    fuzzy: false,
                    hideExpandedCounter: true,
                    hideExpanders: false,
                    highlight: true,
                    leavesOnly: false,
                    nodata: true,
                    mode: "dimm"
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
    getCollectionHierarchy: function() {
        var instance = this;
        this.data = {};
        var data = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild();
        return {
            nodesModified: org.ekstep.collectioneditor.cache.nodesModified,
            hierarchy: instance._toFlatObj(data)
        };
    },
    _toFlatObj: function(data) {
        var instance = this;
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
            instance._toFlatObj(collection);
        });

        return instance.data;
    },
    checkTreeDepth: function(root) {
        var buffer = [{ node: root, depth: 1 }];
        var current = buffer.pop();
        var max = 0;

        while (current && current.node) {
            // Find all children of this node.
            _.forEach(current.node.children, function(child) {
                buffer.push({ node: child, depth: current.depth + 1 });
            });
            if (current.depth > max) max = current.depth;
            current = buffer.pop();
        }
        return max;
    }
}));
