var express = require('express');
var url = require('url');
var indcontract = require('../models/indcontract');
var script = require('../script');
var router = express.Router();

function getinitials(str) {
	firstname = str.substring(0, str.indexOf(' '));
	lastname = str.substring(str.indexOf(' ') + 1, str.lastIndexOf(' '));
	patronymic = str.substring(str.lastIndexOf(' ') + 1, str.length);
	initials = firstname + ' ' + lastname[0] + '.' + patronymic[0] + '. ';
	return initials;
}

router.get('/', function(req, res) {
	res.render('individual', { title: 'Грузовой пропуск' });
});

router.get('/edit', function(req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	if (query.id != undefined) {
		indcontract.getContract(query.id, function(data) {
			res.render('individual-update', { title: 'Грузовой пропуск', indcontract: data });
		})
	} else {
		res.render('individual', { title: 'Грузовой пропуск' });
	}
});

router.get('/download', function(req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	if (query.id != undefined) {
		indcontract.getContract(query.id, function(data) {
			data.initials = getinitials(data.name);
			path1 = script.fileOne(data);
			path2 = script.fileThree(data);
			console.log(path2);
			res.render('download', { title: 'Грузовой пропуск – Скачать договор аренды и заявление', firstlink: path1, secondlink: path2, title1: 'Дог аренды Физ.лицо', title2: 'Заявление' });
		})
	} else {
		res.render('individual', { title: 'Грузовой пропуск' });
	}
});

router.get('/remove', function(req, res) {
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