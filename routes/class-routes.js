const express = require('express');
const { getClass } = require('../controllers/classController');

const router = express.Router();

router.get('/crawl/:shop', getClass);

module.exports = {
	routes: router,
};
