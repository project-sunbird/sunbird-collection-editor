org.ekstep.contenteditor.config = {
    baseURL: 'https://dev.ekstep.in',
    apislug: '/api',
    defaultSettings: 'config/editorSettings.json',
    build_number: 'BUILDNUMBER',
    pluginRepo: '/plugins',
    aws_s3_urls: ["https://s3.ap-south-1.amazonaws.com/ekstep-public-dev/", "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/"],
    corePluginMapping: {},
    baseConfigManifest: "config/baseConfigManifest.json",
    plugins: [
        { "id": "org.ekstep.preview", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.collectioneditor", "ver": "1.0", "type": "plugin" }
    ],
    corePluginsPackaged: false,
    dispatcher: "local",
    useProxyForURL: true
}

org.ekstep.contenteditor.baseConfigManifest = []