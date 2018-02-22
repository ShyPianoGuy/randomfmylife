'use strict';

const request = require('request');
const cheerio = require('cheerio');

module.exports = function FML() {
    return new Promise((resolve, reject) => {
        request('http://www.fmylife.com/random', (err1, body1, res) => {
            if(err1) reject(err1);
            let $ = cheerio.load(res);
            let link = $('figure.text-center.visible-xs').find('a').eq(0).attr('href');

            request(`http://www.fmylife.com${link}`, (err2, body2, close) => {
                if(err2) reject(err2);
                let o = cheerio.load(close);
                let fml = o('p.block.hidden-xs').text();
                if(!fml) reject('Couldn\'t not find any FMLs.');
                else resolve(fml);
            });
        });
    });
};
