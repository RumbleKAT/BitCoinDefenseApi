const utils = require("../utils");

module.exports = function(app, user){
    //id를 매개체로 전송
    //return 현재 존재하는 coin 양
    app.get('/api/user/coin/:_id' , function(req,res){
        user.findOne({ _id : req.params._id }, function(err,user){
            if(err) return res.status(500).json({error : err});
            return res.json({ coin : user.coin});
         });
    });

    app.post('/api/user/coin/reward',function(req,res){
        //reward coins
        user.findOne({ _id : req.body._id},function(err, user){
            if(err){
                return res.json({error : err});
            }
            if(req.body.coin) user.coin += req.body.coin;

            user.save(function(err){
                if(err) res.status(500).json(utils.successFalse(err));
                res.json(utils.successTrue(user));
            });
        });
    });

    app.post('/api/user/coin/transaction',function(req,res){
        //transaction each other origin_id , target_id , coin
        if( !req.body.origin_id || !req.body.target_id){
            return res.status (404).json({error : "Transaction can't operated!"});
        }

        var origin = 0;
        var target = 0;

        user.find({ $or: [{ _id: req.body.origin_id }, { _id: req.body.target_id }]}, function(err, _user){
            //use callback
            if(err){
             //if target_id is not existed
                origin = _user[0].coin;
                origin -= coin;

                 //origin_id action
                user.findOne({ _id: req.body.origin_id },function(err,data){
                    data.coin = origin;

                    data.save(function(err){
                        if(err) res.status(500).json({error: err});
                        else res.status(200).json({success: "Success!"});
                    });
                });
            }
            else{
                origin = _user[0].coin;
                target = _user[1].coin;
                const coin = req.body.coin;

                origin -= coin;
                target += coin;

                //origin_id action
                user.findOne({ _id: req.body.origin_id },function(err,data){
                    data.coin = origin;

                    data.save(function(err){
                        if(err) res.status(500).json({error: err});
                    });
                });

                //target_id action
                user.findOne({_id: req.body.target_id},function(err,data){
                    data.coin = target;

                    data.save(function(err){
                    if(err) res.status(500).json({error:err});
                    else{
                        res.status(200).json({success: "Success!"});
                    }
                });
            });
            }
        });

    });
}