describe('state service', function() {
    beforeAll(function(done) {
        done();
    });
    it('Should be empty state of nodesModified,dialcode,hierarchy ', function() {
        expect(org.ekstep.services.stateService.state).not.toBe(undefined);
        expect(org.ekstep.services.stateService.state.dialCodeMap).not.toBe(undefined);
        expect(org.ekstep.services.stateService.state.hierarchy).not.toBe(undefined);
        expect(org.ekstep.services.stateService.state.nodesModified).not.toBe(undefined);
    });

    it('Should set the modified nodes', function() {
        org.ekstep.services.stateService.setNodesModified('do_52353496346', { name: "Untitled" });
        spyOn(org.ekstep.services.stateService, 'setNodesModified').and.callThrough();
        expect(org.ekstep.services.stateService.state).not.toBe(undefined);
        var modifiedNodes = org.ekstep.services.stateService.getNodesModified()
        expect(modifiedNodes).not.toBe(undefined);
    });

    it('Should return the all modified nodes', function() {
        var modifiedNodes = org.ekstep.services.stateService.getNodesModified()
        spyOn(org.ekstep.services.stateService, 'getNodesModified').and.callThrough();
        expect(modifiedNodes).not.toBe(undefined);
        expect(modifiedNodes['do_52353496346']).not.toBe(undefined)
    });

    it('Should reset the modified nodes', function() {
        spyOn(org.ekstep.services.stateService, 'resetNodesModified').and.callThrough();
        org.ekstep.services.stateService.resetNodesModified();
        var modifiedNodes = org.ekstep.services.stateService.getNodesModified();
        expect(_.size(modifiedNodes)).toBe(0);
        expect(modifiedNodes['do_52353496346']).toBe(undefined)
    });

    it('Should set the dial code value', function() {
        org.ekstep.services.stateService.setDialCode('validCode', { id: "ABCSD" });
        spyOn(org.ekstep.services.stateService, 'setDialCode').and.callThrough();
        expect(org.ekstep.services.stateService.state).not.toBe(undefined);
        var dialCode = org.ekstep.services.stateService.getDialCode()
        expect(dialCode).not.toBe(undefined);
    });

    it('Should return dial code values', function() {
        var dialCodes = org.ekstep.services.stateService.getDialCode()
        spyOn(org.ekstep.services.stateService, 'getDialCode').and.callThrough();
        expect(dialCodes).not.toBe(undefined);
        expect(dialCodes['validCode']).not.toBe(undefined)
    });
    it('Should reset the dial code value', function() {
        spyOn(org.ekstep.services.stateService, 'resetDialcode').and.callThrough();
        org.ekstep.services.stateService.resetDialcode();
        var dialCodes = org.ekstep.services.stateService.getDialCode();
        expect(_.size(dialCodes)).toBe(0);
        expect(dialCodes['validCode']).toBe(undefined)
    });

    it('Should set the hierarchy of nodes', function() {
        org.ekstep.services.stateService.setHierarchy('do_573459793', {});
        spyOn(org.ekstep.services.stateService, 'setHierarchy').and.callThrough();
        expect(org.ekstep.services.stateService.state).not.toBe(undefined);
        var hierarchyValue = org.ekstep.services.stateService.getHierarchy()
        expect(hierarchyValue).not.toBe(undefined);
    });

    it('Should get the hierarchy of nodes', function() {
        var hierarchyValue = org.ekstep.services.stateService.getHierarchy()
        spyOn(org.ekstep.services.stateService, 'getHierarchy').and.callThrough();
        expect(hierarchyValue).not.toBe(undefined);
        expect(hierarchyValue['do_573459793']).not.toBe(undefined)
    });

    it('Should reset the hierarchy of nodes', function() {
        spyOn(org.ekstep.services.stateService, 'resetHierarchy').and.callThrough();
        org.ekstep.services.stateService.resetHierarchy();
        var hierarchyValue = org.ekstep.services.stateService.getHierarchy();
        expect(_.size(hierarchyValue)).toBe(0);
        expect(hierarchyValue['do_573459793']).toBe(undefined)
    });

    it('Should initialize the service', function() {
        spyOn(org.ekstep.services.stateService, 'initialize').and.callThrough();
        org.ekstep.services.stateService.initialize();
    });
})