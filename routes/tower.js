var utils = require("../utils");

module.exports = function(app, tower){

    app.get('/api/tower',function(req,res){
        tower.findOne({ id : req.query.id },function(err,user){
            if (err) return res.status(500).send({ error: err });
            res.json(tower);
        });
    });

    app.post('/api/tower',function(req,res){
        var _tower = new tower();
        //_tower = req.body;
        _tower.name = req.body.name === undefined ? "" : req.body.name;
        _tower.face = req.body.face;
        _tower.weapon = req.body.weapon;
        _tower.cloth = req.body.cloth;
        _tower.head = req.body.head;
        _tower.hm = req.body.hm;
        _tower.aura = req.body.aura;
        _tower.bullet = req.body.bullet;
        _tower.attack = req.body.attack;
        _tower.ats = req.body.ats;
        _tower.target = req.body.target;
        _tower.dist = req.body.dist;
        _tower.grade = req.body.grade;

       tower.find(function(err, tower) {
        if (err) return res.status(500).send({ error: "database failure" });
            _tower.index = tower.length;
            //callback 으로 넘겨야 됨
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

                tower.name = req.body.name === undefined ? "" : req.body.name;
                tower.face = req.body.face;
                tower.weapon = req.body.weapon;
                tower.cloth = req.body.cloth;
                tower.head = req.body.head;
                tower.hm = req.body.hm;
                tower.aura = req.body.aura;
                tower.bullet = req.body.bullet;
                tower.attack = req.body.attack;
                tower.ats = req.body.ats;
                tower.target = req.body.target;
                tower.dist = req.body.dist;
                tower.grade = req.body.grade;

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