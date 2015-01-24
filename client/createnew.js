
Template.createNew.helpers({
	elements: function(){

		var els = db_category.find().fetch();
		// console.log(els);
		return els;
	}
});

Template.createNew.events({
	

		
		

	'submit .form1': function (evt) {
		console.log("submitted");
		evt.preventDefault();
		var keyword = {}
		var modelElement = $('#modal1');
		var textElement = $("#text");
		keyword.text = textElement.val();
		keyword.categoryId = $("#category").val();
		keyword.seed = $("#seed").val();
		keyword.peer = $("#peer").val();
		keyword.verified = $('#verified').is(':checked');
		var sub = {};

		Meteor.call('getKeyword', _.pick(keyword,"text","categoryId"), function (error, result) {
			if(error){
				console.log(error);
			}else{
				keyword.keywordId = result;
				Meteor.call('subscribeKeyword', _.omit(keyword,"text"), function (error, result) {
					if(error){
						console.log(error);
					}else{
						textElement.val("");
					}
				});
			}

		});

		modelElement.closeModal();
	}
});