Torrentz = function(filter, keyword, url) {

    this.filter = (filter) ? filter : "search";
    this.keyword = (keyword) ? keyword : "_";
    this.url = (url) ? url : "http://torrentz.in";

}

Torrentz.prototype.getData = function(filter, keyword, url) {
    var _this = this;

    this.filter = (filter) ? filter : "search";
    this.keyword = (keyword) ? keyword : "_";
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
        var torrents = [];

        var cheerio = Npm.require("cheerio");
        $ = cheerio.load(torrentzHttpResponse.content);

        $(".results dl").each(function(index, element) {
            if ($(this).find("dt a").attr("href")) {
                var torrent = {};

                torrent["url"] = _this.url + $(this).find("dt a").attr("href");

                torrent["title"] = $(this).find("dt a").html().trim().replace(/\s+/g, " ");
                torrent["category"] = $(this).find("dt").children().remove().end().text().replace(/[^0-9a-zA-Z]/g, " ").trim().replace(/\s+/g, " ");

                torrent["verified"] = $(this).find("dd .v").text().replace(/[^0-9]/g, "");
                torrent["time"] = $(this).find("dd .a span").attr("title").trim().replace(/\s+/g, " ").trim().replace(/\s+/g, " ");
                torrent["size"] = $(this).find("dd .s").text().replace(/[^0-9a-zA-Z]/g, " ").trim().replace(/\s+/g, " ");
                torrent["peers"] = $(this).find("dd .u").text().replace(/[^0-9]/g, "");
                torrent["seeds"] = $(this).find("dd .d").text().replace(/[^0-9]/g, "");

                torrents.push(torrent);
            }
        });

        return torrents;
    } else return "httpResponse"; // console.log("torrentz:search -> unable to connect " + _this.url);
}

Torrentz.prototype.getView = function(url) {
    var _this = this;

    this.url = (url) ? url : "http://torrentz.in/_";

    var torrentzHttpResponse = HTTP.get(this.url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5"
        },
        timeout: 1000 * 60
    });

    if (torrentzHttpResponse.statusCode === 200) {
        var htmlStrips = [];

        var cheerio = Npm.require("cheerio");
        $ = cheerio.load(torrentzHttpResponse.content);

        $(".download dl").each(function(index, element) {
            if ($(this).find("dd").text().replace(/[^0-9a-zA-Z]/g, " ").trim().replace(/\s+/g, " ") != "Sponsored Link")
                htmlStrips.push($(this).find("dt").html());
        });

        return htmlStrips;
    } else return "httpResponse"; // console.log("torrentz:search -> unable to connect " + this.url);
}
