'use strict';
const { getShopname } = require('../components/crawl');
async function handleAsync(shop) {
	const text = await getShopname(shop);
	return text;
}

const getClass = async (req, res, next) => {
	try {
		//
		const shop = req.params.shop;

		const text = await handleAsync(shop);

		console.log(text);

		res.send({
			class: text,
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports = {
	getClass,
};
