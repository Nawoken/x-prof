/**
 * Created by j.leflour on 4/25/18.
 */

// Inclusion de Mongoose
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

// Création du schéma pour les cours
var courseSchema = new mongoose.Schema({
    name : { type : String },
    skills : [{type: ObjectId, ref: 'skills' }],
    teacher : [{type: ObjectId, ref: 'users' }],
    students : [{type: ObjectId, ref: 'users' }],
    sessions : [{type: ObjectId, ref: 'sessions' }],
});


// Création du Model pour les utilisateurs
var CourseModel = mongoose.model('course', courseSchema);
module.exports = CourseModel;