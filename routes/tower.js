var utils = require("../utils");

module.exports = function(app, tower){

    app.get('/api/towers',function (req,res) {
        tower.find(function (err,user){
            if (err) return res.status(500).send({ error: err });
            res.json(user);
        })
    })

    app.get('/api/tower',function(req,res){
        tower.findOne({ _id : req.query._id },function(err,user){
            if (err) return res.status(500).send({ error: err });
            res.json(user);
        });
    });

    app.post('/api/tower',function(req,res){
        var _tower = new tower();
        _tower.fulldata = req.body.fulldata;

       tower.find(function(err, tower) {
        if (err) return res.status(500).send({ error: "database failure" });
            _tower.index = tower.length;

            _tower.save(function(err) {
            if (err) {
                return res.status(500).send({ error: err });
            }
             res.json(err || !_tower ? utils.successFalse(err) : utils.successTrue(_tower));
            });
        });
    });

    app.put('/api/tower/:id',function(req,res){
        tower.find({ id : req.params.id }, function(err,tower){
            if(err) return res.status(500).json({ error : 'database failure' });

            _tower = req.body;

            tower.save(function(err){
                if(err) res.status(500).json(utils.successFalse(err));
                res.json(utils.successTrue(tower));
            });
        });
    });

    app.delete('/api/tower/:id',function(req,res){
        tower.remove({id : req.params.id},function(err,output){
            if(err) return res.status(500).json({ error : 'database failure' });
            res.json(err|| !tower ? utils.successFalse(err) : utils.successTrue(tower));
        });
    });

}