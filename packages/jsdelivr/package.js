    Package.describe({                                                                                                 // 54
        summary: "jsdelivr CDN container",                                                                             // 55
        version: "1.0.0",                                                                                              // 56
        name: "jsdelivr"                                                                                               // 57
    });                                                                                                                // 58
                                                                                                                       // 59
    Package.onUse(function(api) {                                                                                      // 60
        api.versionsFrom("METEOR@1.0");                                                                                // 61
        api.use("templating@1.0.8", "client");                                                                         // 62
        api.add_files(["head.html"], "client");                                                                        // 63
    });                                                                                                                // 64