Package.describe({
    name: "torrentz:search",
    summary: "for 'torrentz._' search",
    version: "15.1.11"
});

Npm.depends({
    "cheerio": "0.18.0"
});

Package.onUse(function(api) {
    api.versionsFrom("1.0");
    api.use(["http@1.0.8"], ["client", "server"]);
    api.add_files(["torrentz.js"], ["client", "server"]);
    api.export("Torrentz");
});
