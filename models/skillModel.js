/**
 * Created by j.leflour on 4/24/18.
 */

// Inclusion de Mongoose
var mongoose = require('mongoose');

// Création du schéma pour les utilisateurs
var skillSchema = new mongoose.Schema({
    name : { type : String},
    description : { type : String}
});


// Création du Model pour les utilisateurs
var SkillModel = mongoose.model('skills', skillSchema);
module.exports = SkillModel;