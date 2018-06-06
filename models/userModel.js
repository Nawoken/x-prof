/**
 * Created by j.leflour on 4/24/18.
 */

// Inclusion de Mongoose
var mongoose = require('mongoose');

// Création du schéma pour les utilisateurs
var userSchema = new mongoose.Schema({
    roles : [{ type : String}],
    firstname : { type : String},
    name : { type : String},
    login : {type : String},
    password : {type : String}
});


// Création du Model pour les utilisateurs
var UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;