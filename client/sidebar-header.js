Template.sideBarAndHeader.helpers({
	category: function () {
		
		return db_category.find().fetch();
	}
	
});
Template.subMenuList.helpers({
	keywordCount: function(){
		console.log(this.data);
		return this.data.length;
	}
});
Template.sideBarAndHeader.events({

	'click .keyword': function (evt) {
		evt.preventDefault();
		var subId = $(evt.target).attr("sub-id");
		Router.go('myTorrents',{},{query:{sub:subId}});		
	}

});

Template.sideBarAndHeader.rendered = function () {
	    // Initialize collapse button
    $(".button-collapse").sideNav({menuWidth: 240, activationWidth: 70});
    // Initialize collapsible
    $('.collapsible').collapsible();
    $('.dropdown-button').dropdown();
    $('.modal-trigger').leanModal();
    $('select').material_select();
};
