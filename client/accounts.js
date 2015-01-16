Template.logged_out.events({
    "click #login": function(e, tmpl) {
       if(Accounts.loginServicesConfigured()){ 
            Meteor.loginWithGoogle({
                requestPermissions: ['email', 'profile']
            }, function(err) {
                if (err) {
                    //error handling
                    alert('error : ' + err);
                    throw new Meteor.Error(Accounts.LoginCancelledError.numericError, 'Error');
                } else {
                    //show an alert
                    // alert('logged in');
                }
            });
        }   
    }
});

Template.logged_in.events({
    "click #logout": function(e, tmpl) {
        Meteor.logout(function(err) {
            if (err) {
                //sow err message
            } else {
                //show alert that says logged out
                //alert('logged out');
            }
        });
    }
})
Template.logged_in.rendered = function() {
    // Initialize collapse button
    $(".button-collapse").sideNav({menuWidth: 240, activationWidth: 70});
    // Initialize collapsible
    $('.collapsible').collapsible();
    $('.dropdown-button').dropdown();
    $('.modal-trigger').leanModal();
    $('select').material_select();
    // Push.Configure({
    //     gcm: {
    //         // Required for Android and Chrome OS
    //         projectNumber: '767912667782'
    //     },
    //     // apn: {
    //     //     // Only required if using safari web push, not required
    //     //     // for iOS / cordova
    //     //     websitePushId: 'com.push.server'
    //     //     webServiceUrl: 'http://some.server.com'
    //     // },
    //     // bagde: true,
    //     sound: true,
    //     alert: true
    // });

    Push.id(); // Unified application id - not a token
    Push.addListener('message', function(notification) {
        // Called on every message
        console.log("message recieved",notification);
    });

};

Template.logged_out.rendered = function() {
    $('.parallax').parallax();
   
};
