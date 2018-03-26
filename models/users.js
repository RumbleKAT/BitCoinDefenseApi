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
    email: String
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
    if(user.isNew){
        /*
        if(!user.passwordConfirmation){
            user.invalidate('passwordConfirmation','Password Confirmation is required!');
        }*/
        if(!passwordRegex.test(user.password)){
            user.invalidate('password', passwordRegexErrorMessage)
        }
    }

     // update user
  if(!user.isNew){
    if(!user.currentPassword){
      user.invalidate('currentPassword', 'Current Password is required!');
    }
    if(user.currentPassword && !bcrypt.compareSync(user.currentPassword, user.originalPassword)){
      user.invalidate('currentPassword', 'Current Password is invalid!');
    }
    if(user.newPassword && !passwordRegex.test(user.newPassword)){
      user.invalidate('newPassword', passwordRegexErrorMessage);
    }
  }
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
module.exports = mongoose.model("Users", userSchema);
