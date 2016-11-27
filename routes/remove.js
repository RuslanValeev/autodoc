var express = require('express');
var url = require('url');
var router = express.Router();
var indcontract = require('../models/indcontract');
var legalcontract = require('../models/legalcontract');

router.get('/', function(req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	if (query.id != undefined) {
		indcontract.removeContract(query.id, function(data) {
			console.log('Document with id = ' + query.id + ' has been removed');
			res.render('successfullyremoved', { title: 'Грузовой пропуск – Договор удален', key: 'Договор был успешно удален' });
		})
	} else {
		res.render('individual', { title: 'Грузовой пропуск' });
	}
});

module.exports = router;