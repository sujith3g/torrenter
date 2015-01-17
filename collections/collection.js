db_keywords = new Meteor.Collection("keywords");
db_category = new Meteor.Collection("category");
db_subscriptions = new Meteor.Collection("subscriptions");
db_torrents = new Meteor.Collection("torrents");
currentUser = function(userId,doc) {
    return (!!userId);
};
dataOwner = function(userId,doc){
	return (!!userId) && doc.user == userId;
};
db_category.allow({
	insert:currentUser,
	update: currentUser,
	remove: currentUser	
});
db_keywords.allow({
	insert:currentUser,
	update: currentUser,
	remove: currentUser	
});
db_subscriptions.allow({
	insert:currentUser,
	update: currentUser,
	remove: currentUser
});
