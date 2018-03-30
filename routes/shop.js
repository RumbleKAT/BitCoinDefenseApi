const utils = require("../utils");

module.exports = function(app,product){

    //show entire products in the device
    app.get('/api/products',function(req,res){
        product.find(function(err, products){
            if(err) return res.status(500).send({ error : 'database failure' });
            res.json(products);
        })
    });

    //specific product in the device
    app.get('/api/product/:title',function(req,res){
        product.findOne({ title: req.params.title },function(err,data){
            if (err) return res.status(500).json({ error: err });
            return res.json({ result : data });
        });
    })

    //upload product to server
    app.post('/api/product/',function(req,res){
        var _product = new product();
        _product.maker_id = req.body.maker_id;
        _product.tower_id = req.body.tower_id;
        _product.title = req.body.title;
        _product.price = req.body.price;
        _product.content = req.body.content;

        product.find(function(err, product) {
        if (err) return res.status(500).send({ error: "database failure" });
            _product.index = product.length;

            _product.save(function(err) {
            if (err) return res.status(500).send({ error: err });
                res.json(err || !_product ? utils.successFalse(err) : utils.successTrue(_product));
            });
        });
    });

    //modified product
    app.put('/api/product/',function(req,res){
        //index and _maker id 만든 사람만 수정이 가능함
        product.find({ $eq: [{ index: req.body.index }, { maker_id : req.body._id }]}, function(err, _user){
            if(err) return res.json({ failed : "you don't have auth" });

            product.maker_id = req.body.maker_id;
            product.tower_id = req.body.tower_id;
            product.title = req.body.title;
            product.price = req.body.price;
            product.content = req.body.content;

            product.save(function(err){
                if (err) res.status(500).json(utils.successFalse(err));
                res.json(utils.successTrue(product));
            });
        });

    })

    app.delete("/api/product/:id", function(req, res) {
      product.remove({ id: req.params.id }, function(err, output) {
        if (err) return res.status(500).json({ error: "database failure" });
        res.json(err || !product ? utils.successFalse(err) : utils.successTrue(product));
      });
    });
}