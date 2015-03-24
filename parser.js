var request = require('request');
var cheerio = require('cheerio');
var parseArgs = require('minimist');
var util = require('util');
var entities = require('entities');

var args = parseArgs(process.argv.slice(2), {
	alias: { productName: 'n' }
});

var productName = args.productName;
var url = util.format('http://catalog.onliner.by/%s', productName);

request(url, function (err, response, body) {
	if (err) {
		throw err;
	}

	var $ = cheerio.load(body);

	var priceHtml = $('.b-offers-desc__info-sub > a').html();
	var price = entities.decodeHTML(priceHtml).replace(/<\/?small>/g, '');

	console.log("Price of %s is %s", productName, price);
});