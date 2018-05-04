var mongoose = require('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection(
  "mongodb://rumblekat:ruki9179@ds123799.mlab.com:23799/bd"
);
autoIncrement.initialize(connection);

var towerSchema = new schema(
  {
    fullData: String,
    id : Number
  }, //index is auto increment
  {
    versionKey: false,
    toObject: { virtual: true }
  }
);


towerSchema.plugin(autoIncrement.plugin,'towers');
module.exports = mongoose.model('towers',towerSchema);