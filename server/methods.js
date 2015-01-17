Meteor.methods({
	'getKeyword':function(keyword){
		if(typeof keyword === "object" && Meteor.user() && keyword.text && keyword.category){
			if(db_keywords.find({text:keyword.text,category:keyword.category}).count()===0){				
				keyword.createdOn = Date.now();
				return db_keywords.insert(keyword);		
			}else{
				var result = db_keywords.findOne({text:keyword.text,category:keyword.category});
				return result._id;
			}			
		}else{// Error handling
			if(!Meteor.user()){
				console.log("You must be logged in to perform this action");
			}
			if(!keyword.text)
				console.log("Unable creete Keyword with empty text");
			if(!keyword.category)
				console.log("Keyword category is mandatory to cretate keyword");
		}
	},
	'subscribeKeyword':function(subscription){
		if(Meteor.user() && typeof subscription === "object" && subscription.keywordId){
			subscription.user = Meteor.userId();
			if(db_subscriptions.find(subscription).count()===0){
				return db_subscription.insert(subscription);
			}
		}else{//Error handling
			if(!Meteor.user()){
				console.log("You must be logged in to perform this action");
			}
			if(!(typeof subscription === "object")){
				console.log("Invalid subscription:",subscription);
			}
		}
	},
	'unsubscribeKeyword':function(subscription){
		if(Meteor.user() && typeof subscription === "object"){
			subscription.user = Meteor.userId();
			if(db_subscriptions.find(subscription).count()===1){
				var result = db_subscriptions.findOne(subscription);
				db_subscriptions.remove(result._id);
			}
		}else{//Error handling
			if(!Meteor.user()){
				console.log("You must be logged in to perform this action");
			}
			if(!(typeof subscription === "object")){
				console.log("Invalid subscription:",subscription);
			}			
		}
	},
	'deleteKeyword':function(id){
		if(Meteor.user() && id){
			db_keywords.remove(id);
		}else{//Error handling
			if(!Meteor.user()){
				console.log("You must be logged in to perform this action");
			}
			if(!id)
				console.log("Invalid keyword ID @ deleteKeyword");
		}
	}
});