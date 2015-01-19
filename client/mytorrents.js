Template.myTorrents.rendered = function () {
	    // Initialize collapse button
    $(".button-collapse").sideNav({menuWidth: 240, activationWidth: 70});
    // Initialize collapsible
    $('.collapsible').collapsible();
    $('.dropdown-button').dropdown();
    $('.modal-trigger').leanModal();
    $('select').material_select();
};
Template.createNew.helpers({
	elements: function(){

		var els = db_category.find().fetch();
		// console.log(els);
		return els;
	}
});
Template.sideBarAndHeader.helpers({
	category: function () {
		return db_category.find().fetch();
	}
});
Template.sideBarAndHeader.events({
	
});
Template.createNew.events({
	'click .modal-trigger': function () {
		if (Router.current().url !== '/#modal1')
			Router.go('/#modal1');
		
		else
			Router.go('/');

		
		
	},
	'submit .form1': function (evt) {
		console.log("submitted");
		evt.preventDefault();
		var keyword = {}
		var modelElement = $('#modal1');
		var textElement = $("#text");
		keyword.text = textElement.val();
		keyword.category = $("#category").val();
		keyword.seed = $("#seed").val();
		keyword.peer = $("#peer").val();
		keyword.verified = $('#verified').is(':checked');
		var sub = {};

		Meteor.call('getKeyword', _.pick(keyword,"text","category"), function (error, result) {
			if(error){
				console.log(error);
			}else{
				keyword.keywordId = result;
				Meteor.call('subscribeKeyword', keyword, function (error, result) {
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