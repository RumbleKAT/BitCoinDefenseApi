var utils = require('../utils');

module.exports = function (app , user)
{
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
        var users = new user();
        console.log(req.body);
        users.name = req.body.name;
        users.password = req.body.password;
        users.email = req.body.email;

        users.save(function(err){
            if(err){
                console.error(err);
                res.json({result:0});
                return;
            }
            res.json(err||!user? utils.successFalse(err) : utils.successTrue(user));
        });
    });

    app.put("/api/user/:user_id", function(req, res) {
        user.findById(req.params.user_id, function(err,user){
            if(err) return res.status(500).json({ error : 'database failure' });
            if(!user) return res.status(404).json({ error : 'user not found'});

            if(req.body.name) user.name = req.body.name;
            if (req.body.password) user.password = req.body.password;
            if (req.body.email) user.email = req.body.email;

            user.save(function(err){
                if(err) res.status(500).json(utils.successFalse(err));
                res.json(utils.successTrue(user));
            })
        });
    });

    app.delete("/api/user/:user_id", function(req, res) {
      user.remove({_id : req.params.user_id},function(err,output){
        if(err) return res.status(500).json({error : "database failure"});

        if(!output.result.n) return res.status(404).json({error : "user not found"});
        res.json(err || !user ? utils.successFalse(err) : utils.successTrue(user));
      });
    });
}

// private functions
function checkPermission(req,res,next){ //*
  user.findOne({name:req.params.name}, function(err,user){
    if(err||!user) return res.json(utils.successFalse(err));
    else if(!req.decoded || user._id != req.decoded._id)
      return res.json(utils.successFalse(null,'You don\'t have permission'));
    else next();
  });
}