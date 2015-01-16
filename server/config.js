var ServiceSettings = {
"google_clientId" : "767912667782-4v5qftj57161f321cpl1voeest3amtsq.apps.googleusercontent.com",
"google_secret" : "t8jIDuuYMEcAP1i9MKPwlrmh"
};
    Meteor.startup(function () {
        Accounts.loginServiceConfiguration.remove({
            service: "google"
        });

        Accounts.loginServiceConfiguration.insert({
            service: "google",
            clientId: ServiceSettings.google_clientId,
            secret: ServiceSettings.google_secret
        });
    });
