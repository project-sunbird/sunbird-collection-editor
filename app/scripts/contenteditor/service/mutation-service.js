org.ekstep.collectioneditor.mutationService = new(Class.extend({
	nodesAdded: [],
	nodesModified: [],
	nodesRemoved: [],
	node: {"id": undefined, "metadata": {}, "parent": undefined, "position": undefined },
	mutationRecord: {"ts": undefined, "target": undefined, "action": undefined, "parent": undefined, "attribute": undefined, "oldValue": undefined, "newValue": undefined, "position": undefined },
	add: function(action, data) {
		switch (action) {
			case "nodesAdded":
			if(data && this.isValidData(data)) this.nodesAdded.push(data);
			break;
			case "nodesModified":
			if(data && this.isValidData(data)) this.nodesModified.push(data);
			break;
			case "nodesRemoved":
			if(data && this.isValidData(data)) this.nodesRemoved.push(data);
			break;
		}
	},
	isValidData: function(data) {
		var instance = this;
		var isValid = false;
		if (!data) return false;

		_.forIn(instance.mutationRecord, function(value, key) {
			if(!data.hasOwnProperty(key)) {
				isValid = false
			} else {
				isValid = true
			}
		});
		return isValid;
	},
	getSummary: function() {		
		return {
			"nodesAdded": this.nodesAdded,
			"nodesModified": this.nodesModified,
			"nodesRemoved": this.nodesRemoved
		}
	}
}));