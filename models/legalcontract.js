var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var legContract = new Schema({
    formtype: String,
    contractnunumber: String,
    date: String,
    company: String,
    director: String,
    transport : [{ }],
    mailindex: String,
    adress: String,
    inn: String,
    kpp: String,
    checkingaccount: String,
    kindofpass: String,
    chofthegoods: String
});

module.exports = {
    init: function() {
        module.exports.model = mongoose.model('legContract', legContract, 'legalentity_contracts');
    },
    getContract: function(id, callback) {
        mongoose.model('legContract', legContract, 'legalentity_contracts').findById(id ,function(err, doc){
            if (err) return console.error(err);
            callback(doc);
        });
    },
    removeContract: function(id, callback) {
        mongoose.model('legContract', legContract, 'legalentity_contracts').findOneAndRemove(id ,function(err, doc){
            if (err) return console.error(err);
            callback(doc);
        });
    },
    getContracts: function (callback) {
        mongoose.model('legContract', legContract, 'legalentity_contracts').find(function(err, docs){
            if (err) return console.error(err);
            callback(docs);
        });
    }
};
