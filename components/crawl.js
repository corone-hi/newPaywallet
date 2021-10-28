const axios = require('axios');
const cheerio = require('cheerio');

let html = '';
async function getHtml(shop) {
	console.log(shop);

	try {
		return await axios.get(
			'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + encodeURI(`${shop}`)
		);
	} catch (error) {
		console.error(error);
	}
}

async function getShopname(shopname) {
	html = await getHtml(shopname);
	const $ = cheerio.load(html.data);
	let smp = {};
	$('div.biz_name_area, div._2w9xx')
		.first('dl')
		.each(function (index, elem) {
			smp = $(this).find('span._3B6hV, span.category, span.1tj6W').text();
		});

	return smp;
}

module.exports = { getShopname };
