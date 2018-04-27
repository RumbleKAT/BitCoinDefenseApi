var mongoose = require('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
//const connection = mongoose.createConnection("mongodb://localhost/bd");
const connection = mongoose.createConnection(
  "mongodb://rumblekat:ruki9179@ds123799.mlab.com:23799/bd"
);
//autoIncrement.initialize(connection);

/*
    Face: Number,
    weapon: Number,
    Cloth: Number,
    Hair: Number,
    HairMtr: Number,
    Aura: Number,
    Bullet: Number,
    Striking: Number,
    Speed: Number,
    TargetCount: Number,
    Downrange: Number,
    Grade: Number,
    HairColor: Number,
    BulletMtr: Number,
    maker_id: Number
*/

var towerSchema = new schema({
    fulldata : String
  }, //index is auto increment
  {
    versionKey: false,
    toObject: { virtual: true }
  }
);


towerSchema.plugin(autoIncrement.plugin,'towers');
module.exports = mongoose.model('towers',towerSchema);