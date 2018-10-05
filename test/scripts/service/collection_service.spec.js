//'use strict';

describe('collection service', function() {
    var collectionData, treeData;
    beforeAll(function(done) {
        collectionData = { "code": "do_112295424167223296119", "notes": "", "keywords": ["test"], "subject": "English", "channel": "in.ekstep", "description": "as d", "edition": "", "language": ["English"], "mimeType": "application/vnd.ekstep.content-collection", "medium": "English", "idealScreenSize": "normal", "createdOn": "2017-07-24T14:24:30.412+0000", "appIcon": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112293142988955648133/artifact/c9b321d4248640d932813d5086fb8bb6_1500627806389.jpeg", "gradeLevel": ["Kindergarten"], "collections": [], "children": [{ "channel": "in.ekstep", "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/domain_17221_1459862898597.ecar", "language": ["Hindi"], "source": "EkStep", "mimeType": "application/vnd.ekstep.ecml-archive", "appIcon": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/language_assets/villageBank_1459855848852.jpeg", "gradeLevel": ["Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Other"], "me_totalTimespent": 146.52, "me_averageTimespentPerSession": 13.32, "collections": [{ "identifier": "do_112199604801921024159", "name": "qweqwe", "objectType": "Content", "relation": "hasSequenceMember", "description": "weqe", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112196369482465280114", "name": "Test", "objectType": "Content", "relation": "hasSequenceMember", "description": "test", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_1122026415105884161338", "name": "Parent 2dc", "objectType": "Content", "relation": "hasSequenceMember", "description": "dfgdfg", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112196187902476288113", "name": "Harry Potter and the Chamber of Secrets", "objectType": "Content", "relation": "hasSequenceMember", "description": "Harry, Ron and Hermione face a race against time to destroy the remaining horcruxes. Meanwhile, the students and teachers unite to defend Hogwarts against Lord Voldemort and his minions.", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112196741241438208122", "name": "Stories - unit - 1", "objectType": "Content", "relation": "hasSequenceMember", "description": "Stories - unit - 1", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112197022920982528118", "name": "Chapter 1.2", "objectType": "Content", "relation": "hasSequenceMember", "description": "vk 2", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112197508169244672168", "name": "test - respect", "objectType": "Content", "relation": "hasSequenceMember", "description": "sdesdsd", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_1122218159334195201221", "name": "asd", "objectType": "Content", "relation": "hasSequenceMember", "description": "as", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112284038700572672176", "name": "Test Collection 8th July", "objectType": "Content", "relation": "hasSequenceMember", "description": "Test Collection 8th July", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112196740642906112121", "name": "Stories - unit - 1", "objectType": "Content", "relation": "hasSequenceMember", "description": "Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1Stories - unit - 1", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112197172868497408134", "name": "Unit no. 2", "objectType": "Content", "relation": "hasSequenceMember", "description": "Unit 2", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_1122026265628753921331", "name": "Unit", "objectType": "Content", "relation": "hasSequenceMember", "description": "Unit", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_11219618102721740816", "name": "manoj - tb - 1 - unit 1", "objectType": "Content", "relation": "hasSequenceMember", "description": "manoj - tb - 1 - unit 1", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_1122027132058910721367", "name": "Test Unit 31212121212", "objectType": "Content", "relation": "hasSequenceMember", "description": "Test Unit 3", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112197192927526912147", "name": "Unit 1", "objectType": "Content", "relation": "hasSequenceMember", "description": "Unit 1", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_1122018903366123521135", "name": "totaa2", "objectType": "Content", "relation": "hasSequenceMember", "description": "totaa2tst", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112283184814686208159", "name": "2017 july 7 - collection test 1", "objectType": "Content", "relation": "hasSequenceMember", "description": "2017 july 7 - collection test 1", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112196811775811584157", "name": "Haunted Story 2.2.1.1", "objectType": "Content", "relation": "hasSequenceMember", "description": "test", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112196893811867648192", "name": "chapter2", "objectType": "Content", "relation": "hasSequenceMember", "description": "desc for chapter2", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112197178894958592140", "name": "aasd", "objectType": "Content", "relation": "hasSequenceMember", "description": "asdasd", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }], "children": [], "appId": "dev.ekstep.in", "usesContent": [], "me_totalRatings": 0, "contentEncoding": "gzip", "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/1459862897389_domain_17221.zip", "contentType": "Story", "sYS_INTERNAL_LAST_UPDATED_ON": "2017-06-09T12:58:20.101+0000", "item_sets": [], "identifier": "domain_17221", "audience": ["Learner"], "visibility": "Default", "consumerId": "f6878ac4-e9c9-4bc4-80be-298c5a73b447", "portalOwner": "EkStep", "index": 1, "mediaType": "content", "ageGroup": ["<5", "5-6", "6-7", "7-8", "8-10", ">10", "Other"], "osId": "org.ekstep.quiz.app", "license": "Creative Commons Attribution (CC BY)", "size": 2083886, "lastPublishedOn": "2016-05-03T17:44:45.292+0000", "concepts": [], "name": "A little girl called Kali", "me_averageSessionsPerDevice": 5.5, "publisher": "EkStep", "status": "Draft", "template": "domain_16862", "me_averageInteractionsPerMin": 49.96, "code": "org.ekstep.ordinal.story", "me_totalSessionsCount": 11, "methods": [], "description": "A little girl called Kali", "idealScreenSize": "normal", "createdOn": "2017-07-09T01:59:05.703+0000", "me_totalSideloads": 0, "me_totalComments": 0, "popularity": 146.52, "contentDisposition": "inline", "genre": ["Picture Books", "Chapter Books", "Flash Cards", "Serial Books", "Alphabet Books", "Folktales", "Fiction", "Non-Fiction", "Poems/Rhymes", "Plays", "Comics", "Words"], "lastUpdatedOn": "2017-07-09T01:59:06.222+0000", "me_totalDevices": 2, "owner": "EkStep", "me_totalDownloads": 5, "os": ["All"], "libraries": [], "me_totalInteractions": 122, "pkgVersion": 1, "versionKey": "1499565546222", "idealScreenDensity": "hdpi", "s3Key": "ecar_files/domain_17221_1459862898597.ecar", "me_averageRating": 0, "createdBy": "EkStep", "compatibilityLevel": 1, "testCSVImportField": 1, "developer": "EkStep" }, { "code": "sunbird.content.677887888", "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/do_112249356528508928115/2-youtube-test-video-by-logan_1495282796844_do_112249356528508928115_1.0.ecar", "channel": "in.ekstep", "description": "utube1 test video by logan", "language": ["Tamil"], "mimeType": "video/x-youtube", "variants": { "spine": { "ecarUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/do_112249356528508928115/2-youtube-test-video-by-logan_1495282797298_do_112249356528508928115_1.0_spine.ecar", "size": 751 } }, "idealScreenSize": "normal", "createdOn": "2017-07-14T17:23:43.024+0000", "contentDisposition": "online", "contentEncoding": "identity", "lastUpdatedOn": "2017-05-24T17:25:21.615+0000", "artifactUrl": "https://www.youtube.com/watch?v=xjS6SftYQaQ", "sYS_INTERNAL_LAST_UPDATED_ON": "2017-06-09T06:33:57.911+0000", "contentType": "Story", "owner": "EkStep", "identifier": "do_112249356528508928115", "audience": ["Learner"], "visibility": "Default", "os": ["All"], "index": 2, "mediaType": "content", "osId": "org.ekstep.quiz.app", "pkgVersion": 1, "versionKey": "1500053023024", "idealScreenDensity": "hdpi", "prevState": "Review", "s3Key": "ecar_files/do_112249356528508928115/2-youtube-test-video-by-logan_1495282796844_do_112249356528508928115_1.0.ecar", "size": 751, "lastPublishedOn": "2017-05-20T12:19:56.843+0000", "compatibilityLevel": 4, "name": "2 youtube test video by logan", "status": "Draft" }, { "keywords": ["test"], "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/do_1123151419620229121177/copied-from-test-1_1503313363334_do_1123151419620229121177_1.0.ecar", "channel": "in.ekstep", "language": ["English"], "variants": { "spine": { "ecarUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/do_1123151419620229121177/copied-from-test-1_1503313363541_do_1123151419620229121177_1.0_spine.ecar", "size": 42717 } }, "mimeType": "application/vnd.ekstep.content-collection", "appIcon": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_1123151419620229121177/artifact/assetssquirell1_442_1501585113_1501585131056.thumb.jpg", "collections": [{ "identifier": "do_112295424167223296119", "name": "Test", "objectType": "Content", "relation": "hasSequenceMember", "description": "as d", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112334986178101248122", "name": "Copied from NOTIFICATION TEST", "objectType": "Content", "relation": "hasSequenceMember", "description": "descri", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112312181234032640192", "name": "NOTIFICATION TEST", "objectType": "Content", "relation": "hasSequenceMember", "description": "descri", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }, { "identifier": "do_112334986806484992123", "name": "Copied from NOTIFICATION TEST", "objectType": "Content", "relation": "hasSequenceMember", "description": "descri", "index": null, "status": null, "depth": null, "mimeType": null, "visibility": null, "compatibilityLevel": null }], "children": [], "appId": "ekstep_portal", "usesContent": [], "copyType": "Translate", "contentEncoding": "gzip", "sYS_INTERNAL_LAST_UPDATED_ON": "2017-08-21T11:02:43.699+0000", "contentType": "Collection", "item_sets": [], "lastUpdatedBy": "391", "identifier": "do_1123151419620229121177", "audience": ["Learner"], "visibility": "Default", "consumerId": "f6878ac4-e9c9-4bc4-80be-298c5a73b447", "index": 3, "mediaType": "Content", "osId": "org.ekstep.quiz.app", "lastPublishedBy": "391", "languageCode": "en", "tags": ["test"], "prevState": "Review", "size": 697138, "lastPublishedOn": "2017-08-21T11:02:42.099+0000", "concepts": [], "name": "Copied from Test 1", "status": "Live", "code": "org.ekstep.collection.1503313053.fork", "methods": [], "origin": "do_1123151406893711361176", "description": "test", "posterImage": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112300985390252032168/artifact/assetssquirell1_442_1501585113_1501585131056.jpg", "idealScreenSize": "normal", "createdOn": "2017-08-21T11:00:27.785+0000", "contentDisposition": "inline", "lastUpdatedOn": "2017-08-21T11:01:40.092+0000", "creator": "Nitesh", "os": ["All"], "libraries": [], "pkgVersion": 1, "versionKey": "1503313363700", "idealScreenDensity": "hdpi", "s3Key": "ecar_files/do_1123151419620229121177/copied-from-test-1_1503313363334_do_1123151419620229121177_1.0.ecar", "lastSubmittedOn": "2017-08-21T11:01:40.082+0000", "createdBy": "442", "compatibilityLevel": 1 }, { "copyright": "2017", "keywords": ["test"], "subject": "Hindi", "channel": "in.ekstep", "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/do_112237256081014784119/3-may-testt2_1493807549215_do_112237256081014784119_2.0.ecar", "language": ["Bengali"], "source": "Internett", "variants": { "spine": { "ecarUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/do_112237256081014784119/3-may-testt2_1493807550840_do_112237256081014784119_2.0_spine.ecar", "size": 39546 } }, "mimeType": "application/vnd.ekstep.ecml-archive", "appIcon": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112237256081014784119/artifact/b95b3a59a1f084d918da0af10de2a270_1492066612510.thumb.jpeg", "gradeLevel": ["Grade 1"], "me_totalTimespent": 405.63, "me_averageTimespentPerSession": 405.63, "collections": [], "children": [], "appId": "dev.ekstep.in", "usesContent": [], "contentEncoding": "gzip", "collaborators": ["256"], "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_112237256081014784119/artifact/1493806159982_do_112237256081014784119.zip", "contentType": "Story", "sYS_INTERNAL_LAST_UPDATED_ON": "2017-07-09T01:59:05.590+0000", "item_sets": [], "lastUpdatedBy": "181", "identifier": "do_112237256081014784119", "audience": ["Learner"], "visibility": "Default", "consumerId": "f6878ac4-e9c9-4bc4-80be-298c5a73b447", "portalOwner": "181", "index": 4, "mediaType": "content", "ageGroup": ["6-7"], "osId": "org.ekstep.quiz.app", "lastPublishedBy": "215", "tags": ["test"], "prevState": "Processing", "size": 51394, "lastPublishedOn": "2017-05-03T10:32:29.197+0000", "concepts": [], "domain": ["literacy"], "me_averageSessionsPerDevice": 1, "name": "3 May - testtt3", "publisher": "Tekdi", "status": "Draft", "template": "", "me_averageInteractionsPerMin": 0.44, "code": "org.ekstep.literacy.story.4379", "me_totalSessionsCount": 1, "methods": [], "description": "3 May - testtt3", "medium": "Hindi", "posterImage": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/do_1122230096895344641255/artifact/b95b3a59a1f084d918da0af10de2a270_1492066612510.jpeg", "idealScreenSize": "normal", "createdOn": "2017-05-03T10:39:51.859+0000", "popularity": 405.63, "contentDisposition": "inline", "genre": ["Chapter Books"], "lastUpdatedOn": "2017-05-15T11:37:04.270+0000", "me_totalDevices": 1, "theme": ["Art"], "owner": "Umesh THorat", "creator": "Umesh Thorat tekdi", "createdFor": ["org.ekstep.partner.21"], "os": ["All"], "libraries": [], "me_totalInteractions": 3, "pkgVersion": 2, "versionKey": "1499565545590", "idealScreenDensity": "hdpi", "s3Key": "ecar_files/do_112237256081014784119/3-may-testt2_1493807549215_do_112237256081014784119_2.0.ecar", "createdBy": "181", "compatibilityLevel": 1, "organization": ["Prerana"], "usedByContent": [] }, { "code": "Test_QA", "keywords": ["LP_functionalTest"], "downloadUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/LP_NFT_4222685/.testcontent23._1506421260750_lp_nft_4222685_1.0.ecar", "channel": "in.ekstep", "description": "Test_QA", "language": ["English"], "variants": { "spine": { "ecarUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/ecar_files/LP_NFT_4222685/.testcontent23._1506421260922_lp_nft_4222685_1.0_spine.ecar", "size": 820 } }, "mimeType": "application/vnd.ekstep.ecml-archive", "idealScreenSize": "normal", "createdOn": "2017-09-28T11:57:23.371+0000", "appId": "ekstep_portal", "contentDisposition": "inline", "contentEncoding": "gzip", "lastUpdatedOn": "2017-09-26T10:20:09.953+0000", "artifactUrl": "https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/content/lp_nft_4222685/artifact/uploadcontent_1506421204828.zip", "sYS_INTERNAL_LAST_UPDATED_ON": "2017-09-26T10:21:01.138+0000", "contentType": "Story", "owner": "EkStep", "lastUpdatedBy": "Test", "identifier": "LP_NFT_4222685", "audience": ["Learner"], "visibility": "Default", "os": ["All"], "consumerId": "f6878ac4-e9c9-4bc4-80be-298c5a73b447", "index": 5, "mediaType": "content", "osId": "org.ekstep.quiz.app", "lastPublishedBy": "Test", "pkgVersion": 1, "versionKey": "1506599843371", "tags": ["LP_functionalTest"], "idealScreenDensity": "hdpi", "s3Key": "ecar_files/LP_NFT_4222685/.testcontent23._1506421260750_lp_nft_4222685_1.0.ecar", "size": 717796, "lastPublishedOn": "2017-09-26T10:21:00.750+0000", "compatibilityLevel": 1, "name": ".TestContent!23.", "status": "Draft" }], "appId": "ekstep_portal", "publication": "", "contentDisposition": "inline", "contentEncoding": "gzip", "lastUpdatedOn": "2017-10-04T11:32:41.192+0000", "contentType": "TextBook", "owner": "kartheek", "lastUpdatedBy": "386", "identifier": "do_112295424167223296119", "audience": ["Learner"], "visibility": "Default", "os": ["All"], "author": "ssss", "consumerId": "f6878ac4-e9c9-4bc4-80be-298c5a73b447", "mediaType": "content", "osId": "org.ekstep.quiz.app", "versionKey": "1507115636699", "tags": ["test"], "idealScreenDensity": "hdpi", "createdBy": "386", "compatibilityLevel": 1, "name": "Test", "usedByContent": [], "board": "NCERT", "resourceType": "Story", "status": "Draft" };
        treeData = [{ "id": "do_1123535646090362881115", "title": "Test TextBook Issue", "tooltip": "Test TextBook Issue", "objectType": "TextBook", "metadata": { "code": "org.ekstep.literacy.plugin_test2", "channel": "in.ekstep", "description": "Asset", "language": ["English"], "mimeType": "application/vnd.ekstep.content-collection", "idealScreenSize": "normal", "createdOn": "2017-10-14T17:51:32.314+0000", "contentDisposition": "inline", "contentEncoding": "gzip", "lastUpdatedOn": "2017-10-14T17:51:32.314+0000", "contentType": "TextBook", "identifier": "do_1123535646090362881115", "audience": ["Learner"], "visibility": "Default", "os": ["All"], "consumerId": "e84015d2-a541-4c07-a53f-e31d4553312b", "mediaType": "content", "osId": "org.ekstep.quiz.app", "versionKey": "1508003492314", "idealScreenDensity": "hdpi", "compatibilityLevel": 1, "domain": ["literacy"], "name": "Test TextBook Issue", "resourceType": "Story", "status": "Draft" }, "folder": true, "children": [], "root": true, "icon": "fa fa-book" }];
        org.ekstep.services.collectionService.data = {};

        done();
    });

    it('should initialize', function() {
        console.log(org.ekstep.contenteditor.config);
        spyOn(org.ekstep.services.collectionService, "initialize").and.callThrough();
        org.ekstep.services.collectionService.initialize(org.ekstep.contenteditor.config.editorConfig);
        expect(org.ekstep.services.collectionService.initialize).toHaveBeenCalled();
        org.ekstep.services.collectionService.initialize();
        expect(org.ekstep.services.collectionService.initialize.calls.count()).toEqual(2);
    });

    it('should get config', function() {
        spyOn(org.ekstep.services.collectionService, "getConfig").and.callThrough();
        var returnValue = org.ekstep.services.collectionService.getConfig();
        expect(org.ekstep.services.collectionService.getConfig).toHaveBeenCalled();
        expect(returnValue).toBeDefined();
    });

    it('when collection content is loaded to framework  ', function() {
        spyOn(ecEditor.jQuery("#collection-tree"), "fancytree");
        org.ekstep.services.collectionService.addTree(treeData);
        //expect(ecEditor.jQuery("#collection-tree").fancytree).toHaveBeenCalled();
    });

    it('when collection content is loaded to framework  ', function() {
        spyOn(org.ekstep.services.collectionService, "fromCollection").and.callThrough();
        org.ekstep.services.collectionService.fromCollection(collectionData);
        expect(org.ekstep.services.collectionService.fromCollection).toHaveBeenCalled();
    });

    it('should clear cache', function() {
        spyOn(org.ekstep.services.collectionService, "clearCache").and.callThrough();
        org.ekstep.services.collectionService.clearCache();
        expect(org.ekstep.services.collectionService.clearCache).toHaveBeenCalled();
    });

    it('should return tree object', function() {
        spyOn(org.ekstep.services.collectionService, "getTreeObject").and.callThrough();
        org.ekstep.services.collectionService.getTreeObject();
        expect(org.ekstep.services.collectionService.getTreeObject).toHaveBeenCalled();
    });

    it('When clicked on expand all button', function() {
        spyOn(org.ekstep.services.collectionService, "expandAll").and.callThrough();
        org.ekstep.services.collectionService.expandAll();
        expect(org.ekstep.services.collectionService.expandAll).toHaveBeenCalled();
    });

    it('Should invoke the add child', function() {
        spyOn(org.ekstep.services.collectionService, "addChild").and.callThrough();
        var obj = org.ekstep.services.collectionService.addChild({});
        expect(org.ekstep.services.collectionService.addChild).toHaveBeenCalled();
    })

    it('Should initialize the context menu', function() {
        spyOn(org.ekstep.services.collectionService, "initContextMenuDropDown").and.callThrough();
        var obj = org.ekstep.services.collectionService.initContextMenuDropDown();
        expect(org.ekstep.services.collectionService.initContextMenuDropDown).toHaveBeenCalled();
    })

    it('Should drop the selected node', function() {
        var node = jQuery("#collection-tree").fancytree("getTree").getActiveNode()
        var data = { otherNode: { data: {} }, node: {} };
        data.otherNode.getLevel = function() {}
        spyOn(org.ekstep.services.collectionService, "_dropNode").and.callThrough();
        var obj = org.ekstep.services.collectionService._dropNode(node, data);
        expect(org.ekstep.services.collectionService._dropNode).toHaveBeenCalled();
    });

    it('Collection sevices functions', function() {
        spyOn(org.ekstep.services.collectionService, "clearFilter").and.callThrough();
        org.ekstep.services.collectionService.clearFilter();
        expect(org.ekstep.services.collectionService.clearFilter).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "getActiveNode").and.callThrough();
        var returnObj = org.ekstep.services.collectionService.getActiveNode();
        expect(returnObj).toBeNonEmptyObject();
        var returnVal = org.ekstep.services.collectionService.getNodeById("do_112295424167223296119");
        expect(returnVal).toBeNonEmptyObject();

        spyOn(org.ekstep.services.collectionService, "setNodeTitle").and.callThrough();
        org.ekstep.services.collectionService.setNodeTitle("test");
        expect(org.ekstep.services.collectionService.setNodeTitle).toHaveBeenCalled();
        org.ekstep.services.collectionService.setNodeTitle("This is a long test This is a long test This is a long test");
        expect(org.ekstep.services.collectionService.setNodeTitle).toHaveBeenCalled();
        org.ekstep.services.collectionService.setNodeTitle();
        expect(org.ekstep.services.collectionService.setNodeTitle).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "getCollectionHierarchy").and.callThrough();
        org.ekstep.services.collectionService.getCollectionHierarchy();
        expect(org.ekstep.services.collectionService.getCollectionHierarchy).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "addLesson").and.callThrough();
        org.ekstep.services.collectionService.addLesson("Story");
        expect(org.ekstep.services.collectionService.addLesson).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "addNode").and.callThrough();
        org.ekstep.services.collectionService.addNode("TextBookUnit", {}, "child");
        expect(org.ekstep.services.collectionService.addNode).toHaveBeenCalled();
        org.ekstep.services.collectionService.addNode("TextBookUnit");
        expect(org.ekstep.services.collectionService.addNode).toHaveBeenCalled();

        var objectType = { "type": "Collection", "label": "Collection", "isRoot": false, "editable": false, "childrenTypes": [], "addType": "Browser", "iconClass": "fa fa-file-o" };
        org.ekstep.services.collectionService.addNode(objectType, collectionData);
        expect(org.ekstep.services.collectionService.addNode).toHaveBeenCalled();
        org.ekstep.services.collectionService.addNode(objectType, collectionData, "sibling");
        expect(org.ekstep.services.collectionService.addNode).toHaveBeenCalled();
        org.ekstep.services.collectionService.addNode("TextBookUnit", {}, "sibling");
        expect(org.ekstep.services.collectionService.addNode).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "setActiveNode").and.callThrough();
        org.ekstep.services.collectionService.setActiveNode(ecEditor.jQuery("#collection-tree").fancytree("getTree").getFirstChild().key);
        expect(org.ekstep.services.collectionService.setActiveNode).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "maxTreeDepth").and.callThrough();
        org.ekstep.services.collectionService.maxTreeDepth(jQuery("#collection-tree").fancytree("getTree").getActiveNode());
        expect(org.ekstep.services.collectionService.maxTreeDepth).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "filterNode").and.callThrough();
        org.ekstep.services.collectionService.filterNode("test");
        expect(org.ekstep.services.collectionService.filterNode).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "removeNode").and.callThrough();
        org.ekstep.services.collectionService.setActiveNode(ecEditor.jQuery("#collection-tree").fancytree("getTree").getRootNode().children[0].children[0].key);
        org.ekstep.services.collectionService.removeNode();
        expect(org.ekstep.services.collectionService.removeNode).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "getContextMenu").and.callThrough();
        org.ekstep.services.collectionService.getContextMenu(ecEditor.jQuery("#collection-tree").fancytree("getTree").getRootNode().children[0]);
        expect(org.ekstep.services.collectionService.getContextMenu).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "addChild").and.callThrough();
        org.ekstep.services.collectionService.addChild();
        expect(org.ekstep.services.collectionService.addChild).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "highlightNode").and.callThrough();
        org.ekstep.services.collectionService.highlightNode(org.ekstep.services.collectionService.getActiveNode().data.id);
        expect(org.ekstep.services.collectionService.highlightNode).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "lowLightNode").and.callThrough();
        org.ekstep.services.collectionService.lowLightNode(org.ekstep.services.collectionService.getActiveNode().data.id);
        expect(org.ekstep.services.collectionService.lowLightNode).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "showMenu").and.callThrough();
        org.ekstep.services.collectionService.showMenu();
        expect(org.ekstep.services.collectionService.showMenu).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "addSibling").and.callThrough();
        org.ekstep.services.collectionService.setActiveNode(ecEditor.jQuery("#collection-tree").fancytree("getTree").getRootNode().children[0].children[0].key)
        org.ekstep.services.collectionService.addSibling();
        expect(org.ekstep.services.collectionService.addSibling).toHaveBeenCalled();
        org.ekstep.services.collectionService.setActiveNode(ecEditor.jQuery("#collection-tree").fancytree("getTree").getRootNode().children[0].key)
        org.ekstep.services.collectionService.addSibling();
        expect(org.ekstep.services.collectionService.addSibling).toHaveBeenCalled();

        spyOn(org.ekstep.services.collectionService, "removeSpecialChars").and.callThrough();
        var resultText = org.ekstep.services.collectionService.removeSpecialChars("This is a test $#collection");
        expect(resultText == "This is a test collection").toBeTruthy();
        expect(org.ekstep.services.collectionService.removeSpecialChars).toHaveBeenCalled();





        // spyOn(org.ekstep.services.collectionService, "addTree").and.callThrough();
        // org.ekstep.services.collectionService.setActiveNode(ecEditor.jQuery("#collection-tree").fancytree("getTree").getRootNode().children[0].children[0].key)
        // var returnObj = org.ekstep.services.collectionService.getActiveNode();
        // returnObj.editStart();
        // expect(org.ekstep.services.collectionService.addTree).toHaveBeenCalled();

        // spyOn(org.ekstep.services.collectionService, "addTree").and.callThrough();
        // org.ekstep.services.collectionService.setActiveNode(ecEditor.jQuery("#collection-tree").fancytree("getTree").getRootNode().children[0].children[0].key)
        // ecEditor.dispatchEvent("org.ekstep.collectioneditor:node:removed", org.ekstep.services.collectionService.getActiveNode());
        // expect(org.ekstep.services.collectionService.addTree).toHaveBeenCalled();

        // spyOn(org.ekstep.services.collectionService, "fetchKeywords").and.callThrough();
        // org.ekstep.services.collectionService.fetchKeywords("test").then(function(data){
        //     expect(data).toBeGreaterThan(0);
        //     done();
        // })
        // expect(org.ekstep.services.collectionService.fetchKeywords).toHaveBeenCalled();

        // spyOn(org.ekstep.services.collectionService, "onRenderNode").and.callThrough();
        // org.ekstep.services.collectionService.onRenderNode(undefined, { node: ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode() }, true)
        // $nodeSpan  = $(ecEditor.jQuery("#collection-tree").fancytree("getTree").getActiveNode());
        // spyEvent = spyOnEvent($nodeSpan[0], 'mouseover');
        // expect(org.ekstep.services.collectionService.onRenderNode).toHaveBeenCalled();
    });

    it('Should remove the special charectors', function() {
        spyOn(org.ekstep.services.collectionService, "removeSpecialChars").and.callThrough();
        var text = org.ekstep.services.collectionService.removeSpecialChars("@#$432423ABC");
        expect(org.ekstep.services.collectionService.removeSpecialChars).toHaveBeenCalled();
        expect(text).toEqual('432423ABC')
    })

    it('Should get the objectType', function() {
        spyOn(org.ekstep.services.collectionService, "getObjectTypeByAddType").and.callThrough();
        var obj = org.ekstep.services.collectionService.getObjectTypeByAddType("Browser");
        expect(org.ekstep.services.collectionService.getObjectTypeByAddType).toHaveBeenCalled();
        expect(obj).not.toBe(undefined)
        expect(obj).not.toBe(null)

    })

    it('Should log the telemetry', function() {
        spyOn(org.ekstep.services.collectionService, "__telemetry").and.callThrough();
        var obj = org.ekstep.services.collectionService.__telemetry({});
        expect(org.ekstep.services.collectionService.__telemetry).toHaveBeenCalled();
    })


    describe('Keywords', function() {
        it('Should fetch the keywords', function() {
                var keyword = 'test'
                var keywords = org.ekstep.services.collectionService.fetchKeywords(keyword)
                spyOn(org.ekstep.services.collectionService, "fetchKeywords").and.callThrough();
                org.ekstep.services.collectionService.fetchKeywords(keyword)
                expect(org.ekstep.services.collectionService.fetchKeywords).toHaveBeenCalled();
                expect(keywords).not.toBe(null);
                expect(keywords).not.toBe(undefined);
            }),

            it('should to store the keywords inMemory', function() {
                org.ekstep.services.collectionService.cacheKeywords['collection_editor'] = { "abc": [] }
                spyOn(org.ekstep.services.collectionService, "storeKeywords").and.callThrough();
                org.ekstep.services.collectionService.storeKeywords({});
                expect(org.ekstep.services.collectionService.storeKeywords).toHaveBeenCalled();
                expect(org.ekstep.services.collectionService.cacheKeywords['collection_editor']).not.toBe(undefined);
            });

        it('Should check keyword is present inMemory or not', function() {
            org.ekstep.services.collectionService.cacheKeywords['collection_editor'] = { "abc": [] }
            spyOn(org.ekstep.services.collectionService, "isKeywordExists").and.callThrough();
            var isPresent = org.ekstep.services.collectionService.isKeywordExists('abc');
            expect(org.ekstep.services.collectionService.isKeywordExists).toHaveBeenCalled();
            expect(isPresent.isPresent).toBe(true);
        })

    })

});