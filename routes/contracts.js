var express = require('express');
var script = require('../script');
var indcontract = require('../models/indcontract');
var legalcontract = require('../models/legalcontract');
var router = express.Router();

router.get('/', function(req, res) {

	legalcontract.getContracts(function(legaldata){
		indcontract.getContracts(function(inddata){
			res.render('contracts', { title: 'Грузовой пропуск', legalcontracts: legaldata.reverse(), indcontract: inddata.reverse() });
		})
	});

});

module.exports = router;