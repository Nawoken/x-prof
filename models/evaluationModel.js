/**
 * Created by j.leflour on 4/25/18.
 */

// Inclusion de Mongoose
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

// Création du schéma pour les évaluations
var evaluationSchema = new mongoose.Schema({
    name : { type : String },
    mark : {type: Number },
    skill : {type: ObjectId, ref: 'skills' },
    student : {type: ObjectId, ref: 'users' },
    session : {type: ObjectId, ref: 'sessions' },
});


// Création du Model pour les utilisateurs
var EvaluationModel = mongoose.model('evaluation', evaluationSchema);
module.exports = EvaluationModel;