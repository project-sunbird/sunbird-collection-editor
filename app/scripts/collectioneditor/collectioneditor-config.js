org.ekstep.contenteditor.config = _.assign(org.ekstep.contenteditor.config, {
    plugins: [
        { "id": "org.ekstep.collectionheader", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.lessonbrowser", "ver": "1.2", "type": "plugin" },
        { "id": "org.ekstep.download", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.collectionwhatsnew", "ver": "1.0", "type": "plugin" }
    ],
    showContentInTree: true
});

org.ekstep.collectioneditor.cache = {
    nodesModified: {}
};