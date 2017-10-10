describe('Collection Editor', function() {
    it('should init editor', function() {
        var context = {
            "contentId": "do_112295424167223296119",
            "sid": "rctrs9r0748iidtuhh79ust993",
            "user": {
                "id": "390",
                "name": "Santhosh Vasabhaktula",
                "email": "santhosh@ilimi.in"
            }
        }
        spyOn(org.ekstep.collectioneditor.api, "initEditor").and.callThrough();
        expect(org.ekstep.contenteditor.globalContext).toEqual(context);
    });

    
});
