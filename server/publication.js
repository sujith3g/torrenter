Meteor.publish("category", function() {
    return db_category.find();
});
Meteor.publish("keywords", function(options, fieldFilter) {
    return db_keywords.find(options, fieldFilter);
});
Meteor.publish("torrents", function(options, fieldFilter) {
    return db_torrents.find(options, fieldFilter);
});
Meteor.publish("mytorrents", function(subId) {
    var userId = this.userId;
    if (subId.toLowerCase() === "all") {
        var subs = db_subscriptions.find({
            user: userId
        }).fetch();
        var keywordList = [];
        _.each(subs, function(entry) {
            if (_.indexOf(keywordList, entry.keywordId) === -1){
                keywordList.push(entry.keywordId);
            }
        });
        return db_torrents.find({keywords:{$in:keywordList}});
    }else{
    	if(db_subscriptions.find(subId)===1){
    		var sub = db_subscriptions.findOne(subId);
    		return db_torrents.find({keywords:{$in:[sub.keywordId]}});
    	}else{
    		console.log("invlaid subId @ mytorrents publication:",subId);
    	}
    }
});
Meteor.publish("subscriptions", function(options, fieldFilter) {
    return db_subscriptions.find(options, fieldFilter);
});