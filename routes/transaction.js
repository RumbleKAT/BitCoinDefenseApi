var utils = require("../utils");

module.exports = function(app, user){
    //id를 매개체로 전송
    //return 현재 존재하는 coin 양
    app.get('/api/user/coin/:_id' , function(req,res){
        user.findOne({ _id : req.params._id }, function(err,user){
            if(err) return res.status(500).json({error : err});
            if(!user) return res
                .status(404).json ({error: "user not found"})

            //console.log("coin : " +  user.player.coin);
            return res.json({ coin : user.player.coin});
         });
    });

    app.post('/api/user/coin/reward',function(req,res){
        //reward coins
        user.findOne({ _id : req.body._id},function(err, user){
            if(err){
                console.error(err);
                return res.json({result : 0});
            }

            if(req.body.coin) user.player.coin += req.body.coin;

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
                return res.status(404).json({error : "Not Founded!"});
            }
            origin = _user[0].player.coin;
            target = _user[1].player.coin;
            const coin = req.body.coin;

            origin -= coin;
            target += coin;

            //origin_id action
            user.findOne({ _id: req.body.origin_id },function(err,data){
                data.player.coin = origin;

                data.save(function(err){
                    if(err) res.status(500).json({error: err});
                });
            });

            //target_id action
            user.findOne({_id: req.body.target_id},function(err,data){
                data.player.coin = target;

                data.save(function(err){
                if(err) res.status(500).json({error:err});
                else{
                    res.status(200).json({success: "Success!"});
                }
            });
        });
    });

    });
}