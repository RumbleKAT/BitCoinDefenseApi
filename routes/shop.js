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
    app.get('/api/product',function(req,res){
        product.findOne({ title: req.query.title },function(err,data){
            if (err) return res.status(500).json({ error: err });
            return res.json({ result : data });
        });
    })

    //upload product to server
    app.post('/api/product/',function(req,res){
        var _product = new product();
        _product.maker_id = req.body.maker_id;
        _product.title = req.body.title;
        _product.description = req.body.description;
        _product.price = req.body.price;
        _product.customMap = req.body.customMap;

        product.find(function(err, product) {
        if (err) return res.status(500).send({ error: "database failure" });
            _product.id = product.length;

            _product.save(function(err) {
            if (err) return res.status(500).send({ error: err });
                //res.json(err || !_product ? utils.successFalse(err) : utils.successTrue(_product));
                res.json({ product: _product.id });
            });
        });
    });

    //modified product
    app.put('/api/product/',function(req,res){
        //index and _maker id 만든 사람만 수정이 가능함
        product.find({ $eq: [{ title: req.body.title }, { maker_id : req.body.maker_id }]}, function(err, _user){
            if(err) return res.json({ failed : "you don't have auth" });

            product.maker_id = req.body.maker_id;
            product.title = req.body.title;
            product.description = req.body.description;
            product.price = req.body.price;
            product.customMap = req.body.customMap;

            product.save(function(err){
                if (err) res.status(500).json(utils.successFalse(err));
                res.json(utils.successTrue(product));
            });
        });

    })
    //수정 필요!
    app.delete("/api/product/:id", function(req, res) {
      product.remove({ id: req.query.id }, function(err, output) {
        if (err) return res.status(500).json({ error: "database failure" });
        res.json(err || !product ? utils.successFalse(err) : utils.successTrue(product));
      });
    });
}