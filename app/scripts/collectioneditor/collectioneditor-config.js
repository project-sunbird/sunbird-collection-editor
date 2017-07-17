org.ekstep.contenteditor.config = _.assign(org.ekstep.contenteditor.config, {
    plugins: [
        { "id": "org.ekstep.preview", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.lessonbrowser", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.textbookmeta", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.unitmeta", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.contentmeta", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.telemetry", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.sunbirdcollectionheader", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.toaster", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.collectioneditorfunctions", "ver": "1.0", "type": "plugin" }
    ]
});

org.ekstep.collectioneditor.cache = {
    nodesModified: {}
};