var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');
var bcrypt = require('bcrypt');
var q = require('q');

// define the schema for our user model
var userSchema = mongoose.Schema({

    // local            : {
        username     : String,
        password     : String,
    // },
    // facebook         : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // },
    // twitter          : {
    //     id           : String,
    //     token        : String,
    //     displayName  : String,
    //     username     : String
    // },
    // google           : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // }

});

// methods ======================
// generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };

userSchema.methods.validPassword = function(givenPassword) {
    var dfd = q.defer();
    bcrypt.compare(givenPassword, this.password, function(err, result) {
        if(result) {
            dfd.resolve(true);
        }
        else {
            dfd.reject(false);
        }
    });
    return dfd.promise;
};

userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(user.password.salt, function(err, hash) {
            user.password = hash;
            next();
        })
    });
});





// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);