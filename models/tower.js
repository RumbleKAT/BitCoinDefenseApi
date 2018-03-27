var mongoose = require('mongoose');
var schema = mongoose.Schema;
//var autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection("mongodb://localhost/bd");

//autoIncrement.initialize(connection);

var towerSchema = new schema(
    {
        name : String,
        face: Number,
        weapon : Number,
        cloth : Number,
        head : Number,
        hm : Number,
        aura : Number ,
        bullet : Number,
        attack : Number,
        ats : Number,
        target : Number,
        dist : Number,
        grade : Number,
        id : Number,
    }, //index is auto increment
    {
        versionKey: false,
        toObject : { virtual : true }
    }
);


//towerSchema.plugin(autoIncrement.plugin,'towers');
module.exports = mongoose.model('towers',towerSchema);