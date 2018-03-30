var utils = require('../utils');

module.exports = function (app , user)
{
    app.get('/',function(req,res){
        res.end("hello!");
    });

    app.get('/api/users',function(req,res){
        user.find(function(err, users){
            if(err) return res.status(500).send({ error : 'database failure' });
            res.json(users);
        })
    });
    //check user's detail data
    app.get('/api/user', function(req,res){
        user.findOne({ name: req.query.name , password: req.query.password}, function(err, user) {
          if (err) return res.status(500).json({ error: err });
          if (!user) return res
              .status(404)
              .json({ error: "user not found" });
          res.json(utils.successTrue(user));
        });
    });

    app.post('/api/user',function(req,res){
        var _user = new user();
        _user.name = req.body.name;
        _user.password = req.body.password;
        _user.email = req.body.email;
        _user.player.coin = 0; //0으로 코인 갯수 초기화

        _user.save(function(err) {
          if (err) {
            console.error(err);
            return res.json({ result: 0 });
          }
          res.json(err || !_user ? utils.successFalse(err) : utils.successTrue(_user));
        });
    });

    app.put("/api/user/:_id", function(req, res) {
        user.findOne({_id : req.params._id}, function(err,user){
            if(err) return res.status(500).json({ error : 'database failure' });
            if(!user) return res.status(404).json({ error : 'user not found'});

            if(req.body.name) user.name = req.body.name;
            if (req.body.password) user.password = req.body.password;
            if (req.body.email) user.email = req.body.email;

            user.save(function(err){
                if(err) res.status(500).json(err);
                //res.json(utils.successTrue(user));
                else{
                    res.status(200).json({ success : 'update success!'})
                }
            })
        });
    });

    app.delete("/api/user/:_id", function(req, res) {
      user.remove({_id : req.params._id},function(err,output){
        if(err) return res.status(500).json({error : "database failure"});
        res.json(err || !user ? utils.successFalse(err) : utils.successTrue(user));
      });
    });
}

// private functions
function checkPermission(req,res,next){ //*
  user.findOne({name:req.query.name}, function(err,user){
    if(err||!user) return res.json(utils.successFalse(err));
    else if(!req.decoded || user._id != req.decoded._id)
      return res.json(utils.successFalse(null,'You don\'t have permission'));
    else next();
  });
}