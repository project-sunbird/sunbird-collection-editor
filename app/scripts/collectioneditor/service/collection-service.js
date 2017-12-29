org.ekstep.services.collectionService = new(Class.extend({
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
    expandAll: function(flag) {
        ecEditor.jQuery('#collection-tree').fancytree('getTree').visit(function(node){node.setExpanded(flag);});
    },
    getActiveNode: function() {
        return ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode();
    },
    getNodeById: function(id) {
        var _node;
        ecEditor.jQuery('#collection-tree').fancytree('getTree').visit(function(node){
            if (node.data.id === id) _node = node;
        });
        return _node;
    },
    setNodeTitle: function(title) {
        var instance = this;
        if(!title) title = 'Untitled';
        ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode().applyPatch({ 'title': title }).done(function(a, b) {
            instance.onRenderNode(undefined, { node: ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode() }, true);
        });
        ecEditor.jQuery('span.fancytree-title').attr('style','width:15em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden');
    },
    setActiveNode: function(key) {
        if (key) ecEditor.jQuery("#collection-tree").fancytree("getTree").getNodeByKey(key).setActive();
    },
    clearFilter: function() {
        ecEditor.jQuery("#collection-tree").fancytree("getTree").clearFilter();
    },
    filterNode: function(text) {
        if (text) ecEditor.jQuery("#collection-tree").fancytree("getTree").filterNodes(text, { autoExpand: true });
    },
    addNode: function(objectType, data, createType) {
        var newNode;
        data = data || {};
        var selectedNode = this.getActiveNode();
        objectType = this.getObjectType(objectType);
        var node = {};
        node.title = data.name ? ((data.name.length > 22) ? data.name.substring(0,22)+'...' : data.name) : 'Untitled ' + objectType.label;
        node.tooltip = data.name;
        node.objectType = data.contentType || objectType.type;
        node.id = data.identifier ? data.identifier : UUID();
        node.root = false;
        node.folder = (objectType.childrenTypes.length > 0);
        node.icon = objectType.iconClass;
        node.metadata = data;
        if (node.folder) { 
            if (selectedNode.getLevel() === this.config.rules.levels - 1) return;
            newNode = (createType === 'after') ? selectedNode.appendSibling(node) : selectedNode.addChildren(node);
            newNode.setActive();
            org.ekstep.collectioneditor.cache.nodesModified[node.id] = { isNew: true, root: false, metadata: { mimeType: "application/vnd.ekstep.content-collection" } };
        } else { 
            newNode = (createType === 'after') ? selectedNode.appendSibling(node) : selectedNode.addChildren(node);
        };
        //selectedNode.sortChildren(null, true);
        selectedNode.setExpanded();
        ecEditor.dispatchEvent("org.ekstep.collectioneditor:node:added", newNode);
    },
    removeNode: function() {
        var selectedNode = this.getActiveNode();
        if (!selectedNode.data.root) {
            ecEditor.getService('popup').open({
                template: '<div class="ui icon negative message remove-unit-popup"><i class="close icon" ng-click="closeThisDialog()"></i><div class="content"><div class="header"><i class="fa fa-exclamation-triangle"></i> Do you want to remove this?</div><div class="remove-unit-buttons" style="padding-right:0; text-align:right;"><div class="ui red button button-overrides" id="remove-yes-button" ng-click="confirm()">Yes</div><div class="ui basic primary button button-overrides" id="remove-no-button" ng-click="closeThisDialog()">No</div></div></div></div>',
                controller: ["$scope", function($scope) {
                    $scope.confirm = function() {
                        selectedNode.remove();
                        $scope.closeThisDialog();
                        delete org.ekstep.collectioneditor.cache.nodesModified[selectedNode.data.id];
                        ecEditor.dispatchEvent("org.ekstep.collectioneditor:node:removed", selectedNode.data.id);
                    };
                }],
                plain: true,
                showClose: false
            });
        }
    },
    getContextMenu: function(node){
        var instance = this, contextMenu = [];
        var nodeType = instance.getObjectType(node.data.objectType);
        contextMenu = [
            {title: "Edit <kbd>[F2]</kbd>", cmd: "rename",  uiIcon: "ui-icon-pencil"},
            {title: "Delete <kbd>[Del]</kbd>", cmd: "remove", uiIcon: "ui-icon-trash", disabled: node.data.root ? true : false}
        ];
        if(nodeType.childrenTypes && nodeType.childrenTypes.length > 0){
            var menu = [{title: "----"},
                {title: "New sibling <kbd>[Ctrl+N]</kbd>", cmd: "addSibling", uiIcon: "ui-icon-plus", disabled: node.data.root ? true : false},
                {title: "New child <kbd>[Ctrl+Shift+N]</kbd>", cmd: "addChild", uiIcon: "ui-icon-arrowreturn-1-e"},
                {title: "----"},
                {title: "Add Resource <kbd>[Ctrl+Shift+R]</kbd>",  cmd: "addLesson", uiIcon: "ui-icon-plus"}];
            contextMenu = contextMenu.concat(menu);
        }
        return contextMenu;
    },
    getContextMenuTemplate: function(node) {
        var instance = this, removeTemplate= "", contextMenu = "";
        var childrenTypes = this.getObjectType(node.data.objectType).childrenTypes;
        if (!node.data.root) removeTemplate = '<i class="fa fa-trash-o" onclick="org.ekstep.services.collectionService.removeNode(); org.ekstep.services.collectionService.__telemetry({ subtype: \'remove\', target: \'removeNodeBtn\'});"></i>';
        if (childrenTypes && childrenTypes.length === 0) return;
        ecEditor._.forEach(childrenTypes, function(types) {
            if (instance.getObjectType(types).addType === "Browser") {
                contextMenu = contextMenu + '<div class="item" onclick="org.ekstep.services.collectionService.addLesson(\'' + types + '\'); org.ekstep.services.collectionService.__telemetry({ subtype: \'addLesson\', target: \''+ types + '\' });"><i class="' + instance.getObjectType(types).iconClass + '"></i>&nbsp;' + instance.getObjectType(types).label + '</div>';
            } else if (node.getLevel() !== (instance.config.rules.levels - 1)) {
                contextMenu = contextMenu + '<div class="item" onclick="org.ekstep.services.collectionService.addNode(\'' + types + '\'); org.ekstep.services.collectionService.__telemetry({ subtype: \'addNode\', target: \''+ types + '\' });"><i class="' + instance.getObjectType(types).iconClass + '"></i>&nbsp;' + instance.getObjectType(types).label + '</div>';
            }            
        });        
        return '<span style="padding-left: 20px;left: 65%;">' + '<div class="ui inline dropdown">' + '<i class="add square icon"></i>' + '<div class="menu">' + contextMenu + '</div>' + '</div>' + removeTemplate + '</span>'
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
            extensions: ["dnd", "filter", "edit"],
            source: tree,
            keyboard: true,
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
                //focusOnClick: true,
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
                    if ((data.hitMode === "before" || data.hitMode === "after") && data.node.data.root) return false;
                    if (instance.config.rules && instance.config.rules.levels) return instance._dropNode(node, data);
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
            edit: {
                triggerStart: ["clickActive", "f2", "dblclick", "mac+enter", "shift+click"],
                inputCss: { minWidth: "2em", color: "#000", width:"15em" },
                edit: function(event, data){
                    var inputNode = document.getElementsByClassName("fancytree-edit-input")[0];
                    ecEditor.jQuery(data.node.span).find('.fancytree-edit-input').attr("maxlength", "100");
                    ecEditor.jQuery(data.node.span).find('.fancytree-edit-input').attr("size", "15");
                    ecEditor.jQuery('span.fancytree-title').attr('style','background:none;');
                },
                close: function(event, data) {
                    ecEditor.jQuery('span.fancytree-title').attr('style','width:15em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden');
                    ecEditor.dispatchEvent("title:update:" + instance.getActiveNode().data.objectType.toLowerCase(), data.node.title, this );
                },
                beforeEdit: function(event, data) {
                    if(instance.getObjectType(instance.getActiveNode().data.objectType).editable) {
                        ecEditor.dispatchEvent("title:update:" + instance.getActiveNode().data.objectType.toLowerCase(), data.orgTitle, this );
                    } else {
                        ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                            message: "Sorry, this operation is not allowed.(You can only edit content created by you.)",
                            position: 'topCenter',
                            icon: 'fa fa-warning'
                        });
                    }
                    return instance.getObjectType(instance.getActiveNode().data.objectType).editable;
                },
            },
            renderNode: function(event, data) {
                instance.onRenderNode(event, data)
            }
        }).on("nodeCommand", function(event, data){
            var refNode, moveMode,
            tree = $(this).fancytree("getTree"),
            rootNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild(),
            node = tree.getActiveNode();
            switch( data.cmd ) {
                case "rename":
                    node.editStart();
                    break;
                case "remove":
                    if (!node.data.root) {
                        org.ekstep.services.collectionService.removeNode();
                    } else {
                        ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                            message: "Sorry, delete is not allowed.",
                            position: 'topCenter',
                            icon: 'fa fa-warning'
                        });
                    }
                    break;
                case "addLesson":
                    if(instance.getObjectType(node.data.objectType).editable) {
                        org.ekstep.services.collectionService.addLesson("Resource");
                    } else {
                        ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                            message: "Sorry, this operation is not allowed.",
                            position: 'topCenter',
                            icon: 'fa fa-warning'
                        });
                    }
                    break;
                case "addChild":
                    if(instance.getObjectType(node.data.objectType).editable) {
                        var childrenTypes = instance.getObjectType(rootNode.data.objectType).childrenTypes;
                        org.ekstep.services.collectionService.addNode(childrenTypes[0], {}, 'child');
                    }else{
                        ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                            message: "Sorry, this operation is not allowed.",
                            position: 'topCenter',
                            icon: 'fa fa-warning'
                        });
                    }
                    break;
                case "addSibling":
                    if (!node.data.root) {
                        var childrenTypes = instance.getObjectType(rootNode.data.objectType).childrenTypes;
                        org.ekstep.services.collectionService.addNode(childrenTypes[0], {}, 'after');
                    }else{
                        ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                            message: "Sorry, this operation is not allowed.",
                            position: 'topCenter',
                            icon: 'fa fa-warning'
                        });
                    }
                    break;
                case "showMenu":
                    $("#collection-tree").contextmenu("open", $("span.fancytree-node.fancytree-active"));
                    break;
                default:
                    alert("Unhandled command: " + data.cmd);
                    return;
            }
        }).on("keydown", function(e){
            var cmd = null;
            console.log($.ui.fancytree.eventToString(e));
            switch( $.ui.fancytree.eventToString(e) ) {
                case "ctrl+shift+n":
                case "meta+shift+n": // mac: cmd+shift+n
                    cmd = "addChild";
                    break;
                case "ctrl+shift+r":
                case "meta+shift+r": // mac: cmd+shift+n
                    cmd = "addLesson";
                    break;
                case "ctrl+n":
                case "meta+n": // mac
                    cmd = "addSibling";
                    break;
                case "del":
                case "ctrl+backspace":
                case "meta+backspace": // mac
                    cmd = "remove";
                    break;
                case "ctrl+/":
                case "meta+/": // mac
                    cmd = "showMenu";
            }
            if( cmd ){
              $(this).trigger("nodeCommand", {cmd: cmd});
              // e.preventDefault();
              // e.stopPropagation();
              return false;
            }
        });
        var node = ecEditor.jQuery("#collection-tree").fancytree("getRootNode");
        node.getFirstChild().setActive(); //select the first node by default
    },
    _dropNode: function(node, data) {
        var instance = this,
            objectType;
        if ((data.otherNode.getLevel() === node.getLevel()) && data.hitMode === "over") {
            ecEditor.dispatchEvent("org.ekstep.toaster:warning", {
                title: 'This operation is not allowed!',
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (data.otherNode.getLevel() === node.getLevel()) {
            objectType = node.getParent().data.objectType;
        } else if ((instance.maxTreeDepth(data.otherNode) + node.getLevel()) > instance.config.rules.levels) {
            ecEditor.dispatchEvent("org.ekstep.toaster:warning", {
                title: 'This operation is not allowed!',
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (data.hitMode === "before" || data.hitMode === "after") {
            objectType = node.getParent().data.objectType;
        } else {
            objectType = node.data.objectType;
        };

        var dropAllowed = _.includes(instance.getObjectType(objectType).childrenTypes, data.otherNode.data.objectType);
        if (dropAllowed) {
            data.otherNode.moveTo(node, data.hitMode);
            org.ekstep.services.telemetryService.interact({ "type": 'click', "subtype": 'dragndrop', "target": 'node', "pluginid": "org.ekstep.collectioneditor", "pluginver": "1.0", "objectid": data.node.data.id, "stage": data.node.data.id });
            ecEditor.dispatchEvent("org.ekstep.collectioneditor:node:reorder", { src: data.otherNode.data.id, dst: data.node.data.id });
            return true;
        } else {
            ecEditor.dispatchEvent("org.ekstep.toaster:warning", {
                title: "\"" + data.otherNode.title + "\"" + " cannot be added to " + "\"" + data.node.title + "\"",
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
            return false;
        }
    },
    onRenderNode: function(event, data, force) {
        var instance = this;
        var node = data.node;
        var $nodeSpan = $(node.span);
        var config = this.config;
        var objectType = this.getObjectType(data.node.data.objectType);
        // for read mode do not add context menu on node
        if (config.mode === "Read" || _.isEmpty(objectType)) return;
        $("#collection-tree").contextmenu({
            delegate: "span.fancytree-node",
            autoFocus: true,
            menu: [],
            beforeOpen: function(event, ui) {
                var node = $.ui.fancytree.getNode(ui.target);
                $("#collection-tree").contextmenu("replaceMenu", org.ekstep.services.collectionService.getContextMenu(node));
                var nodeType = instance.getObjectType(node.data.objectType);
                $("#collection-tree").contextmenu("enableEntry", "rename", nodeType.editable);
                $("#collection-tree").contextmenu("enableEntry", "remove", !node.data.root);
                $("#collection-tree").contextmenu("enableEntry", "addChild", (nodeType.addType === "Editor") ? true : false );
                $("#collection-tree").contextmenu("enableEntry", "addSibling", (!node.data.root && nodeType.addType === "Editor" ? true : false));
                $("#collection-tree").contextmenu("enableEntry", "addLesson", nodeType.editable);
                return node.setActive();
            },
            select: function(event, ui) {
                var that = this;
                // delay the event, so the menu can close and the click event does
                // not interfere with the edit control
                setTimeout(function(){
                    $(that).trigger("nodeCommand", {cmd: ui.cmd});
                }, 100);
            },
            close: function(event, ui){
                var node = $.ui.fancytree.getNode(ui.target);
                node.setFocus();
            }
        });
    },
    initContextMenuDropDown: function() {
        setTimeout(function() {
            ecEditor.jQuery('.ui.inline.dropdown').dropdown({ on: 'hover' });
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
            "title": (data.name.length > 22) ? data.name.substring(0,22)+'...' : data.name,
            "tooltip": data.name,
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
        if (data.children) data.children = _.sortBy(data.children, ['index']);
        _.forEach(data.children, function(child) {
            var objectType = instance.getObjectType(child.contentType);
            var childTree = [];
            if (objectType) {
                tree.push({
                    "id": child.identifier || UUID(),
                    "title": (child.name.length > 22) ? child.name.substring(0,22)+'...' : child.name,
                    "tooltip": child.name,
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
        if (data && data.data) {
            instance.data[data.data.id] = {
                "name": data.title,
                "contentType": data.data.objectType,
                "children": ecEditor._.map(data.children, function(child) {
                    return child.data.id
                }),
                "root": data.data.root
            }

            ecEditor._.forEach(data.children, function(collection) {
                instance._toFlatObj(collection);
            });
        }

        return instance.data;
    },
    maxTreeDepth: function(root) {
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
    },
    clearCache: function() {
        org.ekstep.collectioneditor.cache = {
            hierarchy: {},
            nodesModified: {}
        }
    },
    __telemetry: function(data) {
        org.ekstep.services.telemetryService.interact({ "type": 'click', "subtype": data.subtype, "target": data.target, "pluginid": "org.ekstep.collectioneditor", "pluginver": "1.0", "objectid": ecEditor.getCurrentStage().id, "stage": ecEditor.getCurrentStage().id });
    },

    highlightNode:function(nodeId){
        var nodeElem = org.ekstep.services.collectionService.getNodeById(nodeId)
           if(nodeElem){
                nodeElem.span.childNodes[1].style.color = 'red'
                nodeElem.span.childNodes[2].style.color = 'red'
           }
    },
    lowLightNode: function(nodeId) {
        var nodeElem = org.ekstep.services.collectionService.getNodeById(nodeId)
        if (nodeElem) {
            nodeElem.span.childNodes[1].style.color = 'black'
            nodeElem.span.childNodes[2].style.color = 'black'
        }
    }

}));
