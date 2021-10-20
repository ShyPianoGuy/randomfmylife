const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function randomFML() {
  return new Promise((resolve, reject) => {
        axios.get('https://fmylife.com/random').then((response) => {
          const fml = cheerio.load(response.data)
            .root()
            .find('div.w-full.lg\\:w-2\\/3.p-2')
            .eq(0)
            .find('a.block.text-blue-500.my-4')
            .eq(0)
            .text();

          resolve(fml);
        }).catch((error) => reject(error))
  });
};
