var express = require('express');
var router = express.Router();
var indcontract = require('../models/indcontract');
var legalcontract = require('../models/legalcontract');

function getinitials(str) {
	firstname = str.substring(0, str.indexOf(' '));
	lastname = str.substring(str.indexOf(' ') + 1, str.lastIndexOf(' '));
	patronymic = str.substring(str.lastIndexOf(' ') + 1, str.length);
	initials = firstname + ' ' + lastname[0] + '.' + patronymic[0] + '. ';
	return initials;
}

router.post('/', function(req, res, next) {

	var path = '';
	if (req.body.formtype == 'Физ. лицо') {

		var transport = findPropertyNameByRegex(req.body, /(type)\w+/g, /(markmodel)\w+/g, /(carlicenseplate)\w+/g, /(year)\w+/g, /(distbetweenaxes)\w+/g, /(axleloads)\w+/g, /(fullmass)\w+/g, /(dimensions)\w+/g);
		indcontract.removeContract(req.body.id, function(){
			console.log('Document with id = ' + req.body.id + ' has been removed');
		});
		indcontract.init();
  	var currentIndcontract = new indcontract.model({ formtype: req.body.formtype, date: req.body.date, name: req.body.name, transport: transport, registration: req.body.registration, kindofpass: req.body.kindofpass, chofthegoods: req.body.chofthegoods});
	  currentIndcontract.save(function (err) {
	      if (err) {
	          return next(err);
	      }
	  });

 		res.render('successfullyupdated', { title: 'Грузовой пропуск – Договор обновлен', key: 'Договор был успешно обновлен'});

	} else if (req.body.formtype == 'Юр. лицо') {

		var transport = findPropertyNameByRegex(req.body, /(type)\w+/g, /(markmodel)\w+/g, /(carlicenseplate)\w+/g, false, /(distbetweenaxes)\w+/g, /(axleloads)\w+/g, /(fullmass)\w+/g, /(dimensions)\w+/g);
		legalcontract.removeContract(req.body.id, function(){
			console.log('Document with id = ' + req.body.id + ' has been removed');
		});

		legalcontract.init();
  	var currentLegcontract = new legalcontract.model({ formtype: req.body.formtype, contractnunumber: req.body.contractnunumber, date: req.body.date, company: req.body.company, director: req.body.director, transport: transport, mailindex: req.body.mailindex, adress: req.body.adress, inn: req.body.inn, kpp: req.body.kpp, checkingaccount: req.body.checkingaccount, kindofpass: req.body.kindofpass, chofthegoods: req.body.chofthegoods});
	  currentLegcontract.save(function (err) {
	      if (err) {
	          return next(err);
	      }
	  });
  	
		res.render('successfullyupdated', { title: 'Грузовой пропуск – Договор обновлен', key: 'Договор был успешно обновлен'});

	}	else console.log('error');

});

var findPropertyNameByRegex = function(o, r1, r2, r3, r4, r5, r6, r7, r8) {
  var key, n=0, 
  		arr = {}, 
  		fullarr = [];
  for (key in o) {
    if (key.match(r1)) {
    	arr['type'] = o[key];
    }
    if (key.match(r2)) {
    	arr['markmodel'] = o[key];
    }
    if (key.match(r3)) {
    	arr['carlicenseplate'] = o[key];
    	// if (r4 == false) {
    	// 	fullarr.push(arr);
	    // 	n++;
  			// arr = {};
    	// }
    }
    if (key.match(r4)) {
    	arr['year'] = o[key];
    }
    if (key.match(r5)) {
      arr['distbetweenaxes'] = o[key];
    }
    if (key.match(r6)) {
      arr['axleloads'] = o[key];
    }
    if (key.match(r7)) {
      arr['fullmass'] = o[key];
    }
    if (key.match(r8)) {
      arr['dimensions'] = o[key];
      fullarr.push(arr);
      n++;
      arr = {};
    }
  }
  return fullarr;
};

module.exports = router;