Meteor.publish("category",function(){
	return db_category.find();
});
Meteor.publish("keywords",function(options,fieldFilter){
	return db_keywords.find(options,fieldFilter);
});
Meteor.publish("torrents",function(options,fieldFilter){
	return db_torrents.find(options,fieldFilter);
});
Meteor.publish("subscriptions",function(options,fieldFilter){
	return db_subscriptions.find(options,fieldFilter);
});