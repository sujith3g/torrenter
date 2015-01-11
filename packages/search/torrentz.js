Torrentz = function(filter, keyword, url) {

    this.filter = (filter) ? filter : "search";
    this.keyword = (keyword) ? keyword : "torrentz";
    this.url = (url) ? url : "http://torrentz.in";

}

Torrentz.prototype.getJSON = function(filter, keyword, url) {

    this.filter = (filter) ? filter : "search";
    this.keyword = (keyword) ? keyword : "torrentz";
    this.url = (url) ? url : "http://torrentz.in";

    var torrentzHttpResponse = HTTP.get(this.url + "/" + this.filter, {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5"
        },
        params: {
            f: this.keyword
        },
        timeout: 1000 * 60
    });

    if (torrentzHttpResponse.statusCode === 200) {

        var cheerio = Npm.require("cheerio");
        $ = cheerio.load(torrentzHttpResponse.content);

        console.log($(".results dl").text().trim());

    } else console.log("torrentz:serach -> unable to connect " + this.url);

}
