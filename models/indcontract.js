var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var indContract = new Schema({
    formtype: String,
    date: String,
    name: String,
    transport : [{ }],
    registration: String,
    kindofpass: String,
    chofthegoods: String
});

module.exports = {
    init: function() {
        module.exports.model = mongoose.model('indContract', indContract, 'individual_contracts');
    },
    getContract: function(id, callback) {
        mongoose.model('indContract', indContract, 'individual_contracts').findById(id ,function(err, doc){
            if (err) return console.error(err);
            callback(doc);
        });
    },
    removeContract: function(id, callback) {
        mongoose.model('indContract', indContract, 'individual_contracts').findByIdAndRemove(id ,function(err, doc){
            if (err) return console.error(err);
            console.log(doc);
            callback(doc);
        });
    },
    getContracts: function(callback) {
        mongoose.model('indContract', indContract, 'individual_contracts').find(function(err, docs){
            if (err) return console.error(err);
            callback(docs);
        });
    }
};
