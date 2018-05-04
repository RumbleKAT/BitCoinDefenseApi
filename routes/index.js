var utils = require('../utils');
var mail = require("../mail");
var random = require("../random");

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

    //check user's name
    app.get('/api/user/check',function(req , res){
        user.findOne({ name: req.query.name })
            .select({ name: 1 })
            .exec(function (err, user) {
            if (!user) {
                return res.status(200).json({ result : "Available username!" });
            } else {
                return res.status(404).json({ result : "Already Existed!"});
            }
        });
    });

    //check user's name by email
    app.get('/api/user/check/email', function (req, res) {
        user.findOne({ email : req.query.email})
        .select({name : 1})
        .exec(function(err,user){
            if(!user){
                return res.status(404).json(utils.successFalse(null, "No Match Data"));
            }else{
                return res.status(200).json({"name" : user.name});
            }
        });
    });

    //modify user's password
    app.get('/api/user/pw/modify', function (req, res) {
        user.findOne({ name: req.query.name })
            .select({ name: 1, email: 1, _id: 1, coin: 1, password: 1 })
            .exec(function (err, user) {
                if (!user || user.email != req.query.email) return res.json(utils.successFalse(null, "No Match Data"));
                else {
                    console.log("init user's password...");
                    let TempPW = random.getPassword();
                    user.password = TempPW;
                    console.log(user.password);

                    user.save(function (err) {
                        if (err) res.status(500).json(err);
                        else {
                            let paragraph = mail.context.context01 + TempPW + mail.context.context02;

                            let obj = {
                                to: user.email,
                                subject: mail.context.subject,
                                html: paragraph
                            };

                            mail.write(obj);
                            return res.status(200).json(utils.successTrue(null));
                        }
                    });
                }
            });
    });

    app.post('/api/user',function(req,res){
        var _user = new user();
        _user.name = req.body.name;
        _user.password = req.body.password;
        _user.email = req.body.email;
        _user.coin = 0; //0으로 코인 갯수 초기화

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

            user._id = req.params._id;
            user.name = req.body.name;
            user.password = req.body.password;
            user.email = req.body.email;

            user.save(function(err){
                if(err) res.status(500).json(err);
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