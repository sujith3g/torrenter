/**
 *
 * @authors Sujith G (sujith3g@gmail.com)
 * @date    2015-01-11 01:12:29
 * @version $Id$
 */

Router.configure({
    waitOn: function() {
        return Meteor.subscribe("category");
    },
    layoutTemplate: 'default',
    loadingTemplate: 'loadingTemplate',
    notFoundTemplate: 'notfound'

});


Router.map(function() {
    this.route('myTorrents', {
        waitOn: function() {
        	var sub = this.params.query.sub ? this.params.query.sub:"all";        	
            return [Meteor.subscribe("keywords", {}, {
                fields: {
                    text: 1,
                    categoryId: 1,
                    subCount: 1
                }
            }), Meteor.subscribe("subscriptions", {
                user: Meteor.userId()
            }, {}),Meteor.subscribe("mytorrents",sub)];
        },
        data: function() {
            var data = {};
            data.subs = [];
            var user = Meteor.user();
            if (user && user.profile) {
                var categorySubCount = user.profile.categorySubCount;
                var sortable = [];
                var list = [];
                for (var category in categorySubCount){
                	list.push(category);
                    sortable.push([category, categorySubCount[category]]);
                }
                sortable.sort(function(a, b) {
                    return b[1] - a[1]
                });
                for (var i = 0; i < sortable.length; i++) {
                    var obj = {}
                    obj.name = db_category.findOne({
                        _id: sortable[i][0]
                    }).name;
                    obj.data = db_subscriptions.find({
                        categoryId: sortable[i][0]
                    }).fetch();
                    for (var j = 0; j < obj.data.length; j++) {
                        obj.data[j].keywordText = db_keywords.findOne(obj.data[j].keywordId).text;
                    }
                    data.subs.push(obj);
                }
                var remainingCat = db_category.find({_id:{$nin:list}}).fetch();
                _.each(remainingCat,function(element) {
                	var obj={};
                	obj.name = element.name;
                	obj.data = [];
                	data.subs.push(obj);
                });
                // console.log(data);
                return data;
            }
        },
        path: '/'
    });
    this.route('appLanding', {
        path: '/landing'
    });
    this.route('accessDenied', {
        path: '/accessDenied'
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