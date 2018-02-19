'use strict'

const request = require('request');
const cheerio = require('cheerio');

module.exports = function FML() {
	return new Promise((resolve, reject) => {
		request('http://www.fmylife.com/random', function(err, body, res) {
            let $ = cheerio.load(res);
	        let link = $("figure.text-center.visible-xs").find("a").eq(0).attr('href');

     request(`http://www.fmylife.com${link}`, function (err, body, close) {
        let o = cheerio.load(close)
        let fml = o("p.block.hidden-xs").text()
        if(!fml) reject('Couldn\'t not find any FMLs.');
                else resolve(fml);
        })
        })
    })
}
