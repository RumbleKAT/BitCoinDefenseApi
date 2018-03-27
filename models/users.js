var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/bd");

autoIncrement.initialize(connection);

var userSchema = new schema(
  {
    name: String,
    password: String,
    email: String,
    player : {
      coin : Number,
      score : Number,
    }
  },
  {
    versionKey: false,
    toObject : {virtual : true}
  }
);

var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
var passwordRegexErrorMessage =
  "Should be minimum 8 characters of alphabet and number combination!";

userSchema.path('password').validate(function(v){
    var user = this;
    //create new
    /*
    if(user.isNew){
        if(!passwordRegex.test(user.password)){
            user.invalidate('password', passwordRegexErrorMessage)
        }
    }
    */
});


userSchema.pre('save' , function(next){
    var user = this;
    if (!user.isModified("password")) {
      return next();
    } else {
      user.password = bcrypt.hashSync(user.password);
      return next();
    }
});

userSchema.methods.authenticate = function(password){
    var user = this;
    return bcrypt.compareSync(password, user.password);
}


userSchema.plugin(autoIncrement.plugin,'Users');
module.exports = mongoose.model("Users", userSchema); //Users model을 사용 
