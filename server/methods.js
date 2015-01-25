Meteor.methods({
	'getKeyword':function(keyword){
		if(typeof keyword === "object" && Meteor.user() && keyword.text && keyword.categoryId){
			keyword.text = keyword.text.toLowerCase();
			if(db_keywords.find({text:keyword.text,categoryId:keyword.categoryId}).count()===0){

				keyword.createdOn = moment().format("X");
				return db_keywords.insert(keyword);		
			}else{
				var result = db_keywords.findOne({text:keyword.text,categoryId:keyword.categoryId});
				return result._id;
			}			
		}else{// Error handling
			if(!Meteor.user()){
				console.log("You must be logged in to perform this action");
			}
			if(!keyword.text)
				console.log("Unable creete Keyword with empty text");
			if(!keyword.categoryId)
				console.log("Keyword categoryId is mandatory to cretate keyword");
		}
	},
	'subscribeKeyword':function(subscription){
		if(Meteor.user() && typeof subscription === "object" && subscription.keywordId && subscription.categoryId){
			if(subscription.text){
				subscription.text = subscription.text.toLowerCase();
			}
			subscription.user = Meteor.userId();
			if(db_subscriptions.find(subscription).count()===0){
				db_keywords.update({_id:subscription.keywordId}, {$inc:{subCount:1}});
				var update = {};
				update['profile.categorySubCount.'+subscription.categoryId] =1;
				Meteor.users.update({_id:Meteor.userId()}, {$inc:update});								
				// console.log(catCount);				
				return db_subscriptions.insert(subscription);
			}
		}else{//Error handling
			if(!Meteor.user()){
				console.log("You must be logged in to perform this action");
			}
			if(!(typeof subscription === "object")){
				console.log("Invalid subscription:",subscription);
			}
			if(!subscription.categoryId){
				console.log("Invalid subscription.categoryId:",subscription);	
			}
			if(!subscription.keywordId){
				console.log("Invalid subscription.keywordId:",subscription);		
			}
		}
	},
	'unSubscribe':function(subscription){
		if(Meteor.user() && typeof subscription === "object" ){
			if(subscription.text){
				subscription.text=subscription.text.toLowercase();
			}
			subscription.user = Meteor.userId();
			if(db_subscriptions.find(subscription).count()===1){
				var sub = db_subscriptions.findOne(subscription);			
				db_keywords.update({_id:sub.keywordId},{$inc:{subCount:-1}});
				var update = {};
				update['profile.categorySubCount.'+sub.categoryId]=-1;
				Meteor.user.update({_id:sub.user},{$inc:update});	
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
			// if(!subscription.keywordId){
			// 	console.log("Invlaid subscription.keywordId:",subscription);
			// }			
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