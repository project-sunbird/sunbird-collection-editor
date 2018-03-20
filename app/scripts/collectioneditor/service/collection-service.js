org.ekstep.services.collectionService = new(Class.extend({
    config: undefined,
    data: {},
    framework: "NCF",
    categoryList: {},
    cacheKeywords: {},
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
    collapseAllChildrens: function(flag) {
        var rootNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild();
        ecEditor._.forEach(rootNode.children, function(child) {
            child.setExpanded(flag);
        });
    },
    addTooltip: function(title) {
        return {
            class: "fancytree-title popup-item",
            'data-content': title,
            'data-variation': "wide",
            'data-position': "bottom left"
        }
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
        ecEditor.jQuery('span.fancytree-title').attr('style','width:11em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden');
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
        node.title = data.name ? (data.name) : 'Untitled ' + objectType.label;
        node.tooltip = data.name;
        node.objectType = data.contentType || objectType.type;
        node.id = data.identifier ? data.identifier : UUID();
        node.root = false;
        node.folder = (data.visibility && data.visibility === 'Default') ? false : (objectType.childrenTypes.length > 0);
        node.icon = (data.visibility && data.visibility === 'Default') ? 'fa fa-file-o' : objectType.iconClass;
        node.metadata = data;
        if (node.folder) { 
            // to check child node should not be created more than the set configlevel
            if ((selectedNode.getLevel() >= this.config.rules.levels - 1) && createType === 'child'){
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: "Sorry, this operation is not allowed.",
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
                return;
            }   
            newNode = (createType === 'sibling') ? selectedNode.appendSibling(node) : selectedNode.addChildren(node);
            org.ekstep.collectioneditor.cache.nodesModified[node.id] = { isNew: true, root: false, metadata: { mimeType: "application/vnd.ekstep.content-collection" } };
            newNode.setActive();

        } else { 
            newNode = (createType === 'sibling') ? selectedNode.appendSibling(node) : selectedNode.addChildren(node);
        };
        //selectedNode.sortChildren(null, true);
        if(newNode.span) ecEditor.jQuery(newNode.span.childNodes[2]).attr(org.ekstep.services.collectionService.addTooltip(node.title));
        selectedNode.setExpanded();
        ecEditor.dispatchEvent("org.ekstep.collectioneditor:node:added", newNode);
        ecEditor.jQuery('span.fancytree-title').attr('style','width:11em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden');
        if(node.title.length > 22) ecEditor.jQuery('.popup-item').popup();
        ecEditor.jQuery('#collection-tree').scrollLeft(ecEditor.jQuery('.fancytree-lastsib').width());
        ecEditor.jQuery('#collection-tree').scrollTop(ecEditor.jQuery('.fancytree-lastsib').height());
    },
    removeNode: function() {
        var selectedNode = this.getActiveNode();
        if (!selectedNode.data.root) {
            ecEditor.getService('popup').open({
                template: '<div class="ui tiny modal active" id="deletePopup" style="top: auto;"> <div class="content"> <div class="ui grid"> <div class="ten wide column"> <span class="custom-modal-heading">Are you sure you want to delete this content?</span> </div><div class="two wide column"> <i class="close large icon four wide column right-float pointer" ng-click="closeThisDialog()"></i></div></div><p class="custom-modal-content">All content within this folder will also be deleted from this textbook.</p><button class="ui red button" ng-click="confirm()">YES, DELETE</button> </div></div>',
                controller: ["$scope", function($scope) {
                    $scope.confirm = function() {
                        var parentNode = selectedNode.getParent();
                        selectedNode.remove();
                        delete org.ekstep.collectioneditor.cache.nodesModified[selectedNode.data.id];
                        parentNode.setActive();
                        $scope.closeThisDialog();
                        ecEditor.dispatchEvent("org.ekstep.collectioneditor:node:removed", selectedNode.data.id);
                    };
                }],
                plain: true,
                showClose: false
            });
        }
    },
    getContextMenu: function(node){
        var contextMenu = [],
            ctrl = (window.navigator.platform.toLowerCase().indexOf('mac') !== -1) ? 'Cmd' : 'Ctrl',
            del = (ctrl === 'Cmd') ? "Cmd+Del" : "Del",
            alt = (ctrl === 'Cmd') ? "Opt" : "Alt";
        contextMenu = [
            {title: "Edit <kbd>[F2]</kbd>", cmd: "rename",  uiIcon: "ui-icon-pencil"},
            {title: "Delete <kbd>[" + del + "]</kbd>", cmd: "remove", uiIcon: "ui-icon-trash", disabled: node.data.root ? true : false}
        ];
        if((node.data.metadata.visibility === 'Default' && node.data.root) || (node.data.metadata.visibility === 'Parent') || _.isUndefined(node.data.metadata.visibility) ){
            var menu = [{title: "----"},
                {title: "New sibling <kbd>[" + ctrl + "+" + alt +"+Shift+N]</kbd>", cmd: "addSibling", uiIcon: "ui-icon-plus", disabled: node.data.root ? true : false},
                {title: "New child <kbd>[" + ctrl + "+" + alt + "+N]</kbd>", cmd: "addChild", uiIcon: "ui-icon-arrowreturn-1-e"},
                {title: "----"},
                {title: "Add Resource <kbd>[" + ctrl + "+" + alt + "+A]</kbd>",  cmd: "addLesson", uiIcon: "ui-icon-plus"}];
            contextMenu = contextMenu.concat(menu);
        }
        return contextMenu;
    },
    getContextMenuTemplate: function(node) {
        var instance = this, removeTemplate= "", contextMenu = "";
        var childrenTypes = this.getObjectType(node.data.objectType).childrenTypes;
        if (!node.data.root) removeTemplate = '<i class="fa fa-trash-o" onclick="org.ekstep.services.collectionService.removeNode(); org.ekstep.services.collectionService.__telemetry({ subtype: \'remove\', target: \'removeNodeBtn\'});"></i>';
        return '<span style="padding-left:45px;">' + '<div class="ui inline dropdown">' + '<i class="ellipsis vertical icon" onclick = "org.ekstep.services.collectionService.showMenu()" ></i>' + '</div>' + removeTemplate + '</span>'
    },
    addLesson: function(type) {
        var instance = this;
        ecEditor.dispatchEvent("org.ekstep.lessonbrowser:show", {
            filters: { lessonType: [type] },
            callback: function(err, res) {
                if (res) {
                   ecEditor._.forEach(res, function(obj) {
                        var activeNode = org.ekstep.services.collectionService.getActiveNode();
                        var children = activeNode.getChildren();
                        if (children && children.length > 0) {
                            ecEditor._.forEach(children, function(child, index) {
                                if (child.data.metadata.identifier === obj.identifier) {
                                    ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                                        message: 'Content ' + obj.name +  ' already available',
                                        position: 'topCenter',
                                        icon: 'fa fa-warning'
                                    });
                                    return false;        // Returning if content is already available in selected node.
                                }
                                if (index === children.length-1) {
                                    instance.addNode(obj.contentType, obj);
                                }
                            });
                        } else {
                            instance.addNode(obj.contentType, obj);
                        }
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
                triggerStart: ["f2"],
                inputCss: { minWidth: "2em", color: "#000", width:"11em" },
                edit: function(event, data) {
                    var inputNode = ecEditor.jQuery(data.node.span).find('.fancytree-edit-input');
                    inputNode.attr("maxlength", "100");
                    inputNode.attr("size", "15");
                    ecEditor.jQuery(data.node.span.childNodes[2]).attr('style','background:none;');
                    inputNode.focus();
                    var currentValue = inputNode.val();
                    inputNode.val('');
                    inputNode.val(currentValue);
                    inputNode[0].scrollLeft = inputNode[0].scrollWidth;
                },
                close: function(event, data) {
                    ecEditor.jQuery('span.fancytree-title').attr('style','width:11em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden');
                    ecEditor.dispatchEvent("title:update:" + instance.getActiveNode().data.objectType.toLowerCase(), data.node.title, this );
                    ecEditor.jQuery('span.fancytree-title').attr('title', data.node.title);

                    if(data.node.title.length > 23) {
                        ecEditor.jQuery(data.node.span.childNodes[2]).attr(org.ekstep.services.collectionService.addTooltip(data.node.title));
                        ecEditor.jQuery('.popup-item').popup();
                    }
                    org.ekstep.services.collectionService.onRenderNode(undefined, { node: ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode() }, true);

                },
                beforeEdit: function(event, data) {
                    if((data.node.data.metadata.visibility === 'Default' && data.node.data.root) || data.node.data.metadata.visibility === 'Parent' || _.isUndefined(data.node.data.metadata.visibility)) {
                        ecEditor.dispatchEvent("title:update:" + instance.getActiveNode().data.objectType.toLowerCase(), data.orgTitle, this );
                        return true;
                    } else {
                        ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                            message: "Sorry, this operation is not allowed.(You can only edit content created by you.)",
                            position: 'topCenter',
                            icon: 'fa fa-warning'
                        });
                        return false;
                    }
                },
            },
            renderNode: function(event, data) {
                instance.onRenderNode(event, data)
                if (ecEditor.getConfig('nodeDisplayCriteria') && ecEditor.getConfig('nodeDisplayCriteria').contentType && ecEditor.getConfig('nodeDisplayCriteria').contentType.length > 0) {
                    var nodeTypeIndex = ecEditor._.indexOf(ecEditor.getConfig('nodeDisplayCriteria').contentType, data.node.data.objectType);
                    nodeTypeIndex < '0' ? (data.node.li ? data.node.li.style.display = 'none' : "") : "";
                }
            },
            loadChildren: function(event, data) {
                data.node.visit(function(subNode) {
                    if( subNode.key === "_1" && !subNode.isExpanded() ) {
                        subNode.setExpanded(true);
                    }
                });
            }
        }).on("nodeCommand", function(event, data){
            var refNode, moveMode,
            tree = ecEditor.jQuery(this).fancytree("getTree"),
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
                    org.ekstep.services.collectionService.addChild()
                    break;
                case "addSibling":
                    org.ekstep.services.collectionService.addSibling()
                    break;
                case "showMenu":
                    ecEditor.getService('popup').open({
                        template: '<div class="ui large modal active" style="top: 5% !important"><div class="header"><div class="ui grid"><div class="fourteen column row"><div class="left floated five wide column"><i class="file code outline icon"></i><label><b>Keyboard ShortCuts</b></label></div><div><span class="right floated column"><i class="remove link icon" ng-click="closeThisDialog()"></i></span></div></div></div></div><div class="content"><div class="ui grid shortcut-popup"> <pre class="line-numbers language-markup shortcut-popup`" id="shortCut"> <table class="shortcut-table"> <tr> <th colspan="2">ShortCuts(Windows)</th> <th colspan="2">ShortCuts(Mac)</th> <th colspan="6">Details</th> </tr><tr> <td colspan="2">Ctrl + Del</td><td colspan="2">Command + Del</td><td colspan="6">Delete the selected node</td></tr><tr> <td colspan="2">F2</td><td colspan="2">F2</td><td colspan="6">Edit the selected node</td></tr><tr> <td colspan="2">Ctrl + Alt + Shift + N</td><td colspan="2">Command + Alt + Shift + N</td><td colspan="6">Add new Sibling to selected node</td></tr><tr> <td colspan="2">Ctrl + Alt + N</td><td colspan="2">Command + Alt + N</td><td colspan="6">Add new Child to selected node</td></tr><tr> <td colspan="2">Ctrl + Alt + A</td><td colspan="2">Command + Alt + A</td><td colspan="6">Add Resource to selected node</td></tr><tr> <td colspan="2">+</td><td colspan="2">+</td><td colspan="6">Expand the selected node</td></tr><tr> <td colspan="2">-</td><td colspan="2">-</td><td colspan="6">Collapse the selected node</td></tr></table> </pre> </div></div></div>',
                        controller: ["$scope", function($scope) {
                            $scope.confirm = function() {
                                selectedNode.remove();
                                $scope.closeThisDialog();
                                delete org.ekstep.collectioneditor.cache.nodesModified[selectedNode.data.id];
                                ecEditor.dispatchEvent("org.ekstep.collectioneditor:node:removed", selectedNode.data.id);
                            };
                        }],
                        width: 900,
                        plain: true,
                        showClose: true,
                        className: 'ngdialog-theme-default'
                    });
                    break;
                default:
                    alert("Unhandled command: " + data.cmd);
                    return;
            }
        }).on("keydown", function(e){
            var cmd = null;
            switch( ecEditor.jQuery.ui.fancytree.eventToString(e) ) {
                case "alt+ctrl+shift+n":
                case "alt+meta+shift+n": // mac: cmd+shift+n
                    cmd = "addSibling";
                    break;
                case "alt+ctrl+a":
                case "alt+meta+a": // mac: cmd+shift+n
                    cmd = "addLesson";
                    break;
                case "alt+ctrl+n":
                case "alt+meta+`": // mac
                    cmd = "addChild";
                    break;
                case "del":
                case "ctrl+del":
                case "ctrl+backspace":
                case "meta+backspace": // mac
                    cmd = "remove";
                    break;
                case "ctrl+/":
                case "meta+/": // mac
                    cmd = "showMenu";
            }
            if( cmd ){
              ecEditor.jQuery(this).trigger("nodeCommand", {cmd: cmd});
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

        if(data.node.span) data.node.span.childNodes[2].title = "";
        if ((!$nodeSpan.data('rendered') || force)) {
           if (org.ekstep.services.collectionService.getContextMenuTemplate(data.node)) {
               var contextButton = $(org.ekstep.services.collectionService.getContextMenuTemplate(data.node));
               $nodeSpan.append(contextButton);
               contextButton.hide();
               $nodeSpan[0].onmouseover = function() {
                   contextButton.show();
               };
               $nodeSpan[0].onmouseout = function() {
                   contextButton.hide();
               }
               $nodeSpan.data('rendered', true)
           }
       }
        if(node.title && node.title.length > 23 && node.span && !ecEditor.jQuery(node.span.childNodes[2]).hasClass("popup-item")) {
            ecEditor.jQuery(node.span.childNodes[2]).attr(org.ekstep.services.collectionService.addTooltip(node.title));
        }
        if(node.span && node.span.childNodes[2].hasAttribute("data-variation")) {
            ecEditor.jQuery(node.span.childNodes[2]).attr("data-variation","wide");
        }

        // for read mode do not add context menu on node
        if (config.mode === "Read" || _.isEmpty(objectType)) return;
        ecEditor.jQuery("#collection-tree").contextmenu({
            delegate: "span.fancytree-node",
            autoFocus: true,
            menu: [],
            beforeOpen: function(event, ui) {
                var node = ecEditor.jQuery.ui.fancytree.getNode(ui.target);
                ecEditor.jQuery("#collection-tree").contextmenu("replaceMenu", org.ekstep.services.collectionService.getContextMenu(node));
                var nodeType = instance.getObjectType(node.data.objectType);
                ecEditor.jQuery("#collection-tree").contextmenu("enableEntry", "remove", !node.data.root);
                if(node.data.metadata.visibility === 'Default' && !node.data.root){
                    ecEditor.jQuery("#collection-tree").contextmenu("enableEntry", "rename", false);
                }else{
                    ecEditor.jQuery("#collection-tree").contextmenu("enableEntry", "rename", nodeType.editable); 
                    ecEditor.jQuery("#collection-tree").contextmenu("enableEntry", "addChild", (nodeType.addType === "Editor") ? true : false );
                    if(node.getLevel() >= config.rules.levels - 1){
                        ecEditor.jQuery("#collection-tree").contextmenu("enableEntry", "addChild", false);
                    }
                    ecEditor.jQuery("#collection-tree").contextmenu("enableEntry", "addSibling", (!node.data.root && nodeType.addType === "Editor" ? true : false));
                    ecEditor.jQuery("#collection-tree").contextmenu("enableEntry", "addLesson", nodeType.editable);
                }
                return node.setActive();
            },
            select: function(event, ui) {
                var that = this;
                // delay the event, so the menu can close and the click event does
                // not interfere with the edit control
                setTimeout(function(){
                    ecEditor.jQuery(that).trigger("nodeCommand", {cmd: ui.cmd});
                }, 100);
            },
            close: function(event, ui){
                var node = ecEditor.jQuery.ui.fancytree.getNode(ui.target);
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
            "title": data.name,
            "tooltip": data.name,
            "objectType": data.contentType,
            "metadata": _.omit(data, ["children", "collections"]),
            "folder": true,
            "children": treeData,
            "root": true,
            "icon": instance.getObjectType(data.contentType).iconClass
        }]);
        org.ekstep.services.collectionService.expandAll(true);
        org.ekstep.services.collectionService.collapseAllChildrens(false);
        ecEditor.jQuery('span.fancytree-title').attr('style','width:11em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden');
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
                    "title": child.name,
                    "tooltip": child.name,
                    "objectType": child.contentType,
                    "metadata": _.omit(child, ["children", "collections"]),
                    "folder": child.visibility === 'Default' ? false : (objectType.childrenTypes.length > 0),
                    "children": childTree,
                    "root": false,
                    "icon": child.visibility === 'Default' ? 'fa fa-file-o' : instance.getObjectType(child.contentType).iconClass
                });
                if (child.visibility === 'Parent') {
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
    },
    showMenu:function(){
       ecEditor.jQuery("#collection-tree").contextmenu("open", ecEditor.jQuery("span.fancytree-node.fancytree-active"));
    },
    addChild: function() {
        var instance = this;
        var refNode, moveMode,
            tree =  ecEditor.jQuery('#collection-tree').fancytree('getTree'),
            rootNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild(),
            node = tree.getActiveNode();
        if (this.getObjectType(node.data.objectType).editable) {
            var childrenTypes = instance.getObjectType(rootNode.data.objectType).childrenTypes;
            org.ekstep.services.collectionService.addNode(childrenTypes[0], {}, 'child');
        } else {
            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                message: "Sorry, this operation is not allowed.",
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
        }
    },
    addSibling: function() {
        var instance = this;
        var refNode, moveMode,
            tree =  ecEditor.jQuery('#collection-tree').fancytree('getTree'),
            rootNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild(),
            node = tree.getActiveNode();
        if (!node.data.root) {
            var childrenTypes = instance.getObjectType(rootNode.data.objectType).childrenTypes;
            org.ekstep.services.collectionService.addNode(childrenTypes[0], {}, 'sibling');
        } else {
            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                message: "Sorry, this operation is not allowed.",
                position: 'topCenter',
                icon: 'fa fa-warning'
            });
        }
    },
    removeSpecialChars: function(text) {
        var iChars = "@#$^*()+=-[]\\\';,/{}|\":<>";
        for (var i = 0; i < text.length; i++) {
            if (iChars.indexOf(text.charAt(i)) != -1) {
                ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                    message: "Special characters are not allowed",
                    position: 'topCenter',
                    icon: 'fa fa-warning'
                });
                text = text.replace(/[^a-zA-Z ]/g, "")
            }
        }
        return text;
    },
    getObjectTypeByAddType: function (addType) {
        var categoryList = [];
        _.find(this.config.rules.objectTypes, function (obj) {
            if(obj.addType === addType){
                categoryList.push(obj.type);
            }
        });
        return categoryList;
    },
    fetchKeywords: function($query) {
        return new Promise(function(resolve, reject) {
            var keyword = org.ekstep.services.collectionService.isKeywordExists($query);
            if (!keyword.isPresent) {
                var requestData = {
                    "request": {
                        "text": $query
                    }   
                }
                if(ecEditor.getConfig('keywordsLimit')){
                    requestData.request.limit = ecEditor.getConfig('keywordsLimit');
                }
                org.ekstep.services.metaService.suggestVocabulary(requestData, function(err, resp) {
                    if (resp) {
                        if (resp.data.result.terms) {
                            var result = {};
                            result[$query] = _.uniqBy(resp.data.result.terms,'lemma');
                            org.ekstep.services.collectionService.storeKeywords(result);
                            resolve(result[$query]);
                        }
                    } else {
                        reject(false)
                    }
                })
            } else {
                resolve(keyword.value);
            }
        });
    },
    storeKeywords: function(data) {
        var instance = this;
        var items = instance.cacheKeywords['collection_editor']
        if (items) {
            _.forEach(items, function(value, key) {
                data[key] = value;
            })
        }
        instance.cacheKeywords['collection_editor'] = data;
    },
    isKeywordExists :function($query) {
        var instance = this;
        var keywords = {}
        var obj = instance.cacheKeywords['collection_editor'];
        if (obj) {
            _.forEach(obj, function(value, key) {
                if (_.includes(key, $query)) {
                    keywords.isPresent = true;
                    keywords.value = value;
                }
            });
        }
        return keywords
    }



}));
