Meteor.publish("category",function(){
	return db_category.find();
});
Meteor.publish("keywords",function(options,fieldFilter){
	return db_keywords.find(options,fieldFilter);
});