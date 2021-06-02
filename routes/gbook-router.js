const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
	res.send('<h1>Hello Gbook</h1>');
});

module.exports = router;