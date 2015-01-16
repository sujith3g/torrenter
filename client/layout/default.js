Template.default.rendered = function () {
	    // Initialize collapse button
    $(".button-collapse").sideNav({menuWidth: 240, activationWidth: 70});
    // Initialize collapsible
    $('.collapsible').collapsible();
    $('.dropdown-button').dropdown();
    $('.modal-trigger').leanModal();
    $('select').material_select();
};