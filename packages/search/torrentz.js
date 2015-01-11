Torrentz = function(filter, keyword, url) {

    this.filter = (filter) ? filter : "search";
    this.keyword = (keyword) ? keyword : "torrentz";
    this.url = (url) ? url : "https://torrentz.in";

}

Torrentz.prototype.getJSON = function(filter, keyword, url) {

    this.filter = (filter) ? filter : "search";
    this.keyword = (keyword) ? keyword : "torrentz";
    this.url = (url) ? url : "https://torrentz.in";

    var torrentzHttpResponse = HTTP.get(this.url + "/" + this.filter + "?f=" + this.keyword, {
        timeout: 1000 * 60
    });

    if (torrentzHttpResponse.statusCode === 200) {

        var cheerio = Npm.require("cheerio");
        $ = cheerio.load(torrentzHttpResponse.content);






    } else console.log("torrentz:serach -> unable to connect https://torrentz.in");

}
