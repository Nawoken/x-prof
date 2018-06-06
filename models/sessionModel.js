/**
 * Created by j.leflour on 4/24/18.
 */

// Inclusion de Mongoose
var mongoose = require('mongoose');

// Création du schéma pour les utilisateurs
var sessionSchema = new mongoose.Schema({
    date : { type : Date},
    description : { type : String}
});


// Création du Model pour les utilisateurs
var SessionModel = mongoose.model('sessions', sessionSchema);
module.exports = SessionModel;