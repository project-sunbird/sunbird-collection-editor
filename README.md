# Collection Editor


## Introduction
	
Collection Editor which allows user to create a group of contents.
It can be (ECML, Pdf, HTML, H5P, Epub, Youtube, Mp4/Webm) 

## How to configure
 Download collection editor 

>Run npm i @project-sunbird/collection-editor

**Required configuration**

**Lesson Plan**

```js
[{"type":"TextBook","label":"Textbook","isRoot":true,"editable":true,"childrenTypes":["TextBookUnit"],"addType":"Editor","iconClass":"fa fa-book"},{"type":"TextBookUnit","label":"Textbook Unit","isRoot":false,"editable":true,"childrenTypes":["TextBookUnit","Collection","Content"],"addType":"Editor","iconClass":"fa fa-folder-o"},{"type":"Collection","label":"Collection","isRoot":false,"editable":false,"childrenTypes":[],"addType":"Browser","iconClass":"fa fa-file-o"},{"type":"Content","label":"Content","isRoot":false,"editable":false,"childrenTypes":[],"addType":"Browser","iconClass":"fa fa-file-o"}]

```


**Textbook**

```js
[{"type":"TextBook","label":"Textbook","isRoot":true,"editable":true,"childrenTypes":["TextBookUnit"],"addType":"Editor","iconClass":"fa fa-book"},{"type":"TextBookUnit","label":"Textbook Unit","isRoot":false,"editable":true,"childrenTypes":["TextBookUnit","Collection","Content"],"addType":"Editor","iconClass":"fa fa-folder-o"},{"type":"Collection","label":"Collection","isRoot":false,"editable":false,"childrenTypes":[],"addType":"Browser","iconClass":"fa fa-file-o"},{"type":"Content","label":"Content","isRoot":false,"editable":false,"childrenTypes":[],"addType":"Browser","iconClass":"fa fa-file-o"}]    
```
**Course**

```js
[{"type":"TextBook","label":"Textbook","isRoot":true,"editable":true,"childrenTypes":["TextBookUnit"],"addType":"Editor","iconClass":"fa fa-book"},{"type":"TextBookUnit","label":"Textbook Unit","isRoot":false,"editable":true,"childrenTypes":["TextBookUnit","Collection","Content"],"addType":"Editor","iconClass":"fa fa-folder-o"},{"type":"Collection","label":"Collection","isRoot":false,"editable":false,"childrenTypes":[],"addType":"Browser","iconClass":"fa fa-file-o"},{"type":"Content","label":"Content","isRoot":false,"editable":false,"childrenTypes":[],"addType":"Browser","iconClass":"fa fa-file-o"}]
```

**Collection**

```js
[{"type":"Collection","label":"Collection","isRoot":true,"editable":true,"childrenTypes":["Collection","Resource"],"addType":"Editor","iconClass":"fa fa-folder-o"},{"type":"Collection","label":"Collection","isRoot":false,"editable":false,"childrenTypes":[],"addType":"Browser","iconClass":"fa fa-file-o"},{"type":"Resource","label":"Resource","isRoot":false,"editable":false,"childrenTypes":[],"addType":"Browser","iconClass":"fa fa-file-o"}]
```

	
```js
	
window.context = {
      user: {
        id: "",
        name: "",
      },
      sid: "",
      contentId: "do_4325354353975347",
      pdata: {
        id: "",
        ver: "build_number",
        pid: 'sunbird-portal'
      },
      tags: [],
      channel: "",
      framework: "",
      env: ""

    };
```
```js
window.config = {
    baseURL: "",
    corePluginsPackaged: true,
    pluginRepo: "/plugins",
    dispatcher: 'console',
    apislug: '/action',
    nodeDisplayCriterion: {
        contentType: ['TextBook', 'TextBookUnit']
    },
    keywordsLimit: 500,
    plugins:[],
    editorConfig: {
        "mode": "Edit",
        "contentStatus": "draft",
        "rules": {
            "levels": 3,
            "objectTypes": course/textbook/collection
        },
        "defaultTemplate": {}
    }
}


```
| Property Name | Description | Default Value   |
| --- | --- | --- |
| `user` | It is a `object`, Which should contain the user details(userId, name)  | NA  |
| `sid` | It is a `string`, Session identifier  | NA  |
| `contentId ` | It is a `string`,  content identifier | NA  |
| `pdata ` | It is a `object`,  producer information.It can have producer version, producer Id | NA  |
| `tags ` | It is a `array`,  Encrypted dimension tags passed by respective channels| NA  |
| `channel ` | It is a `string`,  Channel which has produced the event| NA  |
| `framework ` | It is a `string`, example:NCF, NCERT| NA  |
| `baseURL ` | It is a `string`, host url| NA  |
| `corePluginsPackaged ` | It is a `boolean`, Which enables the collection-editor to load the plugins from packaged script rather than individual  | true  |
| `pluginRepo ` | It is a `string`, From which location plugins should load  | /plugins  |
| `dispatcher ` | It is a `string`,Where the telemetry should log ex(console, piwik, library) | console |
| `keywordsLimit ` | It is a `number`, Max response keyword size| 500 |
| `plugins ` | It is a `array`, Array of plugins ex:`[{id:"org.sunbird.header",ver:"1.0",type:"plugin"}]`| NA |
| `editorConfig ` | It is a `object`, editor config related to tree |NA|
| `mode ` | It is a `string`, View mode of the collection editor, either it can be read/edit|edit|
| `contentStatus ` | It is a `string`, content status|draft|
| `rules ` | It is a `object`, which defines the rules for the collection-tree|NA|
| `levels ` | It is a `number`, Which defines the Max level of nodes can be added to tree|3|
| `objectTypes ` | It is a `object`, It can be textbook, course, collection, lessonplan|NA|



```js

  openCollectionEditor() {
    jQuery.fn.iziModal = iziModal;
    jQuery('#collectionEditor').iziModal({
      title: '',
      iframe: true,
      iframeURL: 'url', // collection-editor node_moduels index.html path
      navigateArrows: false,
      fullscreen: false,
      openFullscreen: true,
      closeOnEscape: false,
      overlayClose: false,
      overlay: false,
      overlayColor: '',
      history: false,
      onClosing: () => {
        this._zone.run(() => {
          this.closeModal();
        });
      }
    });
```
	

## How to setup sunbird-collection-editor in local
1. Clone the sunbird-collection-editor repo from [here](https://github.com/project-sunbird/sunbird-collection-editor)
2. Clone the sunbird-content-plugins repo from [here](https://github.com/project-sunbird/sunbird-content-plugins) 
3. Go to the root directory sunbird-collection-editor.
4. Run `npm install` to install node moduels.
3. `cd app` and run `bower install` to install bower components
5. Create a symlink to 'sunbird-content-plugins' (`ln -s ../sunbird-content-plugins plugins`)(Linx, mac)
for windows: use `mklink`


## ChangeLogs
   For changes logs please refer [here](https://github.com/project-sunbird/sunbird-collection-editor/releases) 

  
 >For sunbird-collection-editor demo please visit [here](https://staging.open-sunbird.org/workspace/content/create)   


