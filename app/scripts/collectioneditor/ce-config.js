org.ekstep.contenteditor.config = {
    baseURL: 'https://dev.ekstep.in',
    apislug: '/api',
    build_number: 'BUILDNUMBER',
    pluginRepo: '/plugins',
    plugins: [
        { "id": "org.ekstep.preview", "ver": "1.0", "type": "plugin" },
        { "id": "org.ekstep.collectioneditor", "ver": "1.0", "type": "plugin" }
    ],
    corePluginsPackaged: true,
    dispatcher: "local",
    localDispatcherEndpoint: "/app/telemetry"
}

org.ekstep.contenteditor.extendedConfig = {
    useProxyForURL: false
}

org.ekstep.contenteditor.baseConfigManifest = []