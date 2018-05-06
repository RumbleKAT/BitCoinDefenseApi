var mongoose = require('mongoose');
var schema = mongoose.Schema;
const connection = mongoose.createConnection(
  "mongodb://rumblekat:ruki9179@ds123799.mlab.com:23799/bd"
);

var productSchema = new schema(
    {   //detail data of productSchema
        id : Number, //product index
        maker_id : Number,
        title : String,
        description : String,
        customMap : String
    },
    {
        versionKey: false,
        toObject : { virtual : true }
    }
)


module.exports = mongoose.model("products", productSchema);
