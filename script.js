var fs = require('fs');
var Docxtemplater = require('docxtemplater');

 function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'-'+month+'-'+day+'-'+hour+'-'+minute;   
     return dateTime;
}

time = getDateTime();

var fileOne = function(data) {
	var name = 'Договор аренды Физ.лицо ' + time;
	var content = fs.readFileSync(__dirname + "/documents/doc1.docx", "binary");
	var doc = new Docxtemplater(content);
	doc.setData(data);
	doc.render();

	var buf = doc.getZip().generate({type:"nodebuffer"});

	fs.writeFileSync(__dirname + "/public/" + name + ".docx",buf);
	var path = "/" + name + ".docx";
	return path;

};

var fileTwo = function(data) {
	var name = 'Договор аренды Юр.лицо ' + time;
	var content = fs.readFileSync(__dirname + "/documents/doc2.docx", "binary");
	var doc = new Docxtemplater(content);
	doc.setData(data);
	doc.render();

	var buf = doc.getZip().generate({type:"nodebuffer"});

	fs.writeFileSync(__dirname + "/public/" + name + ".docx",buf);
	var path = "/" + name + ".docx";
	return path;

};

var fileThree = function(data) {
	console.log(data.transport.length);
	arrPath = [];
	for (i = 0; i < data.transport.length; i++) {
		if (data.transport[i].type.toLowerCase() != 'полуприцеп' && data.transport[i].type.toLowerCase() != 'прицеп') {
			objInput={};
			objInput['kindofpass'] = data.kindofpass;
			objInput['chofthegoods'] = data.chofthegoods;
			objInput['markmodel'] = data.transport[i].markmodel;
			objInput['carlicenseplate'] = data.transport[i].carlicenseplate;
			objInput['distbetweenaxes'] = data.transport[i].distbetweenaxes;
			objInput['axleloads'] = data.transport[i].axleloads;
			objInput['fullmass'] = data.transport[i].fullmass;
			objInput['dimensions'] = data.transport[i].dimensions;
			var name = 'Заявление ' + time + ' ' + data.transport[i].type;
			var content = fs.readFileSync(__dirname + "/documents/doc3.docx", "binary");
			var doc = new Docxtemplater(content);
			doc.setData(objInput);
			doc.render();

			var buf = doc.getZip().generate({type:"nodebuffer"});
			fs.writeFileSync(__dirname + "/public/" + name + ".docx",buf);
			var path = "/" + name + ".docx";
			arrPath.push(path);
		}
	}
	console.log(arrPath);
	return arrPath;
};

var fileFour = function(data) {
	// console.log(data);
	var name = 'Сопроводительное письмо ' + time;
	var content = fs.readFileSync(__dirname + "/documents/doc4.docx", "binary");
	var doc = new Docxtemplater(content);
	doc.setData(data);
	doc.render();

	var buf = doc.getZip().generate({type:"nodebuffer"});
	fs.writeFileSync(__dirname + "/public/" + name + ".docx",buf);
	var path = "/" + name + ".docx";
	return path;
};

module.exports.fileOne = fileOne;
module.exports.fileTwo = fileTwo;
module.exports.fileThree = fileThree;
module.exports.fileFour = fileFour;