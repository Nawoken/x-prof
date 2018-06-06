/**
 * Created by j.leflour on 4/11/18.
 */

var mongoose = require('mongoose');

//Récupération des models
var UserModel = require('./models/userModel');
var CourseModel = require('./models/courseModel');
var SkillModel = require('./models/skillModel');

// On se connecte à la base de données
mongoose.connect('mongodb://localhost/x-prof', function(err) {
    if (err) { throw err; }
});


var user1 = new UserModel({ firstname: 'Tanguy', name: 'Pérennou', login: 'user1', password: 'toto' });
var user2 = new UserModel({ firstname: 'Jill', name: 'Leflour', login: 'user2', password: 'titi' });

var skill1 = new UserModel({ name: 'Teamwork', description: 'Ability to work in groups' });
var skill2 = new UserModel({ name: 'Project Management', description: 'Ability to manage the project well' });

// On le sauvegarde dans MongoDB !
user1.save(function (err) {
    if (err) { throw err; }
    console.log('Utilisateur ajouté avec succès !');
});

skill1.save(function (err) {
    if (err) { throw err; }
    console.log('Compétence ajoutée avec succès !');
});

skill2.save(function (err) {
    if (err) { throw err; }
    console.log('Compétence ajoutée avec succès !');
});


user2.save(function (err) {
    if (err) { throw err; }
    console.log('Utilisateur ajouté avec succès !');
    var course1 = new CourseModel({ name: 'JAVA', skills: [skill1._id, skill2._id], teacher: [user1._id], students: [user2._id]});
    course1.save(function (err) {
        if (err) { throw err; }
        console.log('Cours ajouté avec succès !');
        // On se déconnecte de MongoDB maintenant
        mongoose.connection.close();
    });
});



