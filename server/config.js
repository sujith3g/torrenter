var ServiceSettings = {
"google_clientId" : "767912667782-bonpfuqdmu5jmn1bp1a8bgg6mdcorgc5.apps.googleusercontent.com",
"google_secret" : "pOnK8xBXB3zRDNGn3hyjrkxH"
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
