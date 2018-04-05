var mongoose = require('mongoose');
var schema = mongoose.Schema;
//var autoIncrement = require('mongoose-auto-increment');
//const connection = mongoose.createConnection("mongodb://localhost/bd");
const connection = mongoose.createConnection(
  "mongodb://rumblekat:ruki9179@ds123799.mlab.com:23799/bd"
);
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
        color: String,
        hhm : Number,
        bm : Number,
    }, //index is auto increment
    {
        versionKey: false,
        toObject : { virtual : true }
    }
);


//towerSchema.plugin(autoIncrement.plugin,'towers');
module.exports = mongoose.model('towers',towerSchema);