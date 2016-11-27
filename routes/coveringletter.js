var express = require('express');
var indcontract = require('../models/indcontract');
var legalcontract = require('../models/legalcontract');
var script = require('../script');
var router = express.Router();


router.post('/', function(req, res) {
	var allContracts = [], contractslist=[];
	allContracts['number'] = req.body.number;
	console.log(req.body);
	function getCatalog(data, callback) {
		if(data.checkbox.length == 25) {
			id = data.checkbox.slice(1);
			if (data.checkbox[0] == 'i') {
				indcontract.getContract(id, function(note) {
					callback(note, 1);
			  });
			} else if (data.checkbox[0] == 'l') {
				legalcontract.getContract(id, function(note) {
					callback(note, 1);
				});
			}
		} else {
			count = data.checkbox.length;
			for (i = 0; i < count; i++) {
				if (data.checkbox[i][0] == 'i') {
					id = data.checkbox[i].slice(1);
					indcontract.getContract(id, function(note) {
						callback(note, count);
				  });
				} else if (data.checkbox[i][0] == 'l') {
					id = data.checkbox[i].slice(1);
					legalcontract.getContract(id, function(note) {
						callback(note, count);
					});
				}
			}
		}
	}
	getCatalog(req.body, function(data, count){
		contractslist.push(data);
		if (count == contractslist.length) {
				var rec = [], mas={}, npp = 1;
				contractslist.forEach(function(item, i, arr) {
					mas={};
					if (item.company == undefined) {
						company = item.name;
					} else {
						company = item.company;
					}
					item.transport.forEach(function(item, i, arr) {
						mas={};
						mas['company'] = company;
						mas['markmodel'] = item.markmodel;
						mas['carlicenseplate'] = item.carlicenseplate;
						mas['npp'] = npp;
						if (item.type == "прицеп" || item.type == "полуприцеп") {
							mas['npp'] = '';
							npp = npp - 1;
						}
						npp = npp + 1;
						rec.push(mas);
					});
				});
				allContracts['contracts'] =  rec;
				path = script.fileFour(allContracts);
				res.render('coveringletter', { title: 'Грузовой пропуск – Скачать сопроводительное письмо', firstlink: path, title1: 'Сопроводительное письмо'});
		}
	})
});

module.exports = router;