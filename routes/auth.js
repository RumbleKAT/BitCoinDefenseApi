var utils = require('../utils');
var jwt = require('jsonwebtoken');
const secret = require("../secret");

module.exports = function (app , user){

    app.get("/auth/login", function(req, res, next) {
        var isValid = true;
        var validationError = { name: "ValidataionError", errors: {} };

        if (!req.query.name) {
          isValid = false;
          validationError.errors.name = { message: "Username is required!" };
        }
        if (!req.query.password) {
          isValid = false;
          validationError.errors.password = { message: "Password is required!" };
        }
        if (!isValid) return res.json(utils.successFalse(validationError));
        else next();
      }, function(req, res, next) {
        user.findOne({ name: req.query.name })
          .select({ password: 1, name: 1, email :1 ,coin: 1})
          .exec(function(err, user) {
            if (err) return res.json(utils.successFalse(err));
            if (!user || !user.authenticate(req.query.password)) return res.json({ result : "username or Password is in Valid" });
            /*
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
                 */
                res.json(user);
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