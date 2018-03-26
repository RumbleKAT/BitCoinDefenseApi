var utils = require('../utils');
var jwt = require('jsonwebtoken');
const secret = require("../secret");

module.exports = function (app , user){

    app.post("/auth/login", function(req, res, next) {
        var isValid = true;
        var validationError = { name: "ValidataionError", errors: {} };

        if (!req.body.name) {
          isValid = false;
          validationError.errors.name = { message: "username is required!" };
        }
        if (!req.body.password) {
          isValid = false;
          validationError.errors.password = { message: "Password is required!" };
        }
        if (!isValid) return res.json(utils.successFalse(validationError));
        else next();
      }, function(req, res, next) {
        //console.log(req.body.name);
        user.findOne({ name: req.body.name })
          .select({ password: 1, name: 1, email :1})
          .exec(function(err, user) {
           // if (err) return res.json(utils.successFalse(err));
            if (!user || !user.authenticate(req.body.password)) return res.json(utils.successFalse(null, "username or Password is in Valid"));
                 else {
                   var payload = { _id: user.id, name: user.name };
                   var secretOrPrivateKey = secret;
                   var options = { expiresIn: 60 * 60 * 2 };
                   jwt.sign(
                     payload,
                     secret,
                     options,
                     function(err, token) {
                       console.log("error:" + err);
                       if (err)
                         return res.json(
                           utils.successFalse(err)
                         );
                       res.json(utils.successTrue(token));
                     }
                   );
                 }
          });
      });

    app.get("/auth/me", utils.isLoggedin, function(req, res, next) {
      user.findById(req.decoded._id).exec(function(err, user) {
        if (err || !user) return res.json(utils.successFalse(err));
        res.json(utils.successTrue(user));
      });
    });

    app.get("/auth/refresh", utils.isLoggedin, function(req, res, next) {
      user.findById(req.decoded._id).exec(function(err, user) {
        if (err || !user) return res.json(utils.successFalse(error));
        else {
          var payload = { _id: user._id, name: user.name };
          var secretOrPrivateKey = secret;
          var options = { expiresIn: 60 * 60 * 2 };
          jwt.sign(payload, secretOrPrivateKey, options, function(
            err,
            token
          ) {
            if (err) return res.json(utils.successFalse(err));
            res.json(utils.successTrue(token));
          });
        }
      });
    });
}