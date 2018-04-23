var mongoose = require('mongoose');
var schema = mongoose.Schema;
//const connection = mongoose.createConnection("mongodb://localhost/bd");
const connection = mongoose.createConnection(
  "mongodb://rumblekat:ruki9179@ds123799.mlab.com:23799/bd"
);

var productSchema = new schema(
    {   //detail data of productSchema
        index : Number, //product index
        maker_id : Number,
        tower_id : Number,
        title : String,
        description : String,
        price : Number,
        content : {

        } //detailed content
    },
    {
        versionKey: false,
        toObject : { virtual : true }
    }
)


module.exports = mongoose.model("products", productSchema);
