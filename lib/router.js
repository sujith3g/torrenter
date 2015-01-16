/**
 * 
 * @authors Sujith G (sujith3g@gmail.com)
 * @date    2015-01-11 01:12:29
 * @version $Id$
 */

Router.configure({
	layoutTemplate: 'default',
	loadingTemplate:'loadingTemplate',
	notFoundTemplate:'notfound',
	waitOn:function(){
		return Meteor.subscribe("category");
	}
});


Router.map(function () {
	this.route('myTorrents',{
		path:'/'
	});
	this.route('appLanding',{
		layoutTemplate: 'landingLayout',
		path:'/landing'
	});
	this.route('accessDenied',{
		layoutTemplate: 'landingLayout',
		path:'/accessDenied'
	});
});

var requireLogin = function() {


    if (!Meteor.user()) {
        if (Meteor.loggingIn())
            this.render(this.loadingTemplate);
        else {
            Router.go('appLanding');

        }
       
    } else {
        this.next();
    }
};
Router.onBeforeAction(requireLogin, {
    only: 'myTorrents'
});
