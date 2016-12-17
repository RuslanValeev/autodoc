var express = require('express');
var multer  =   require('multer');
var fse = require('fs-extra')
var router = express.Router();


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './documents');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '.docx');
  }
});
var upload = multer({ storage : storage}).fields([{ name: 'doc1' }, { name: 'doc2' }, { name: 'doc3' }, { name: 'doc4' }]);

router.get('/', function(req, res, next) {
  res.render('newtemplates', { title: 'Грузовой пропуск' });
});

router.post('/add', function(req, res, next) {
	fse.copy('./documents', './documents' + Date.now(), function (err) {
	  if (err) throw err;
	  upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
      console.log('New template was added');
			res.render('successfullyupdated', { title: 'Грузовой пропуск',  key: 'Шаблоны были успешно обновлены'});
    });
	});
});

module.exports = router;