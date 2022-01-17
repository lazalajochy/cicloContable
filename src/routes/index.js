const express = require('express');
const router = express.Router();
const { isNoLoggedIn } = require('../lib/auth');

router.get('/', isNoLoggedIn, async (req, res) => {
	res.render('index');
});

module.exports = router;