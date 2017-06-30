org.ekstep.collectioneditor.collectionService = new(Class.extend({
    config: undefined,
    initialize: function(config) {
        if (config) this.config = config;
    },
    getConfig: function() {
        return this.config;
    },
    addNode: function(objectType) {
        var selectedNode = ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode();
        var config = org.ekstep.collectioneditor.collectionService.getConfig();
        var node = _.clone(config.defaultTemplate);
        node.title = 'Untitled ' + config.labels[objectType];
        node.objectType = objectType;
        if (config.rules.definition[objectType].childrenTypes.length > 0) node.folder = true;
        selectedNode.addChildren(node);
        selectedNode.sortChildren(null, true);
        selectedNode.setExpanded();
    },
    removeNode: function() {
        var selectedNode = ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode();
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
            beforeActivate: function(event, data) {                
            },
            dnd: {
                autoExpandMS: 400,
                focusOnClick: true,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                dragStart: function(node, data) {
                    return true;
                },
                dragEnter: function(node, data) {
                    return true;
                },
                dragDrop: function(node, data) {
                    if (data.hitMode === "before" || data.hitMode === "after") return false;
                    var config = org.ekstep.collectioneditor.collectionService.getConfig(); 
                    
                    if (node.data && node.data.objectType) {
                        var dropAllowed = _.includes(config.rules.definition[data.node.data.objectType].childrenTypes, node.data.objectType);                        
                        if (dropAllowed) { 
                            data.otherNode.moveTo(node, data.hitMode) 
                        } 
                        else {
                            alert(data.node.title + " cannot be added to " + node.title);
                        }
                    }
                }
            },
            renderNode: function(event, data) {
                var node = data.node;
                var $nodeSpan = $(node.span);
                var config = org.ekstep.collectioneditor.collectionService.getConfig();
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
        setTimeout(function(){ecEditor.jQuery('.ui.inline.dropdown').dropdown({})}, 200);
    }
}));
