/**
 * 
 * @authors Sujith G (sujith3g@gmail.com)
 * @date    2015-01-11 01:12:29
 * @version $Id$
 */

Router.configure({
	waitOn:function(){
		return Meteor.subscribe("category");
	},
	layoutTemplate: 'default',
	loadingTemplate:'loadingTemplate',
	notFoundTemplate:'notfound'
	
});


Router.map(function () {
	this.route('myTorrents',{
		waitOn:function(){
			return [Meteor.subscribe("keywords",{},{fields:{text:1,category:1,subCount:1}}),Meteor.subscribe("subscriptions",{user:Meteor.userId()},{})];
		},
		data:function(){

		},
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
