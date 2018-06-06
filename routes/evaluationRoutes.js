/**
 * Created by j.leflour on 4/25/18.
 */

/* Pour la suite :
- créer des liens sur chaque cours qui redirigent vers evaluation?id= l'id du cours
- afficher les sessions et les students en fonction de l'id de la page
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserModel = require('../models/userModel');
var SkillModel = require('../models/skillModel');
var CourseModel = require('../models/courseModel');
var SessionModel = require('../models/sessionModel');
var EvaluationModel = require('../models/evaluationModel');

mongoose.connect('mongodb://localhost/x-prof', function(err) {
    if (err) { throw err; }
});

/* GET home page. */


router.get('/evaluation.html', function(req, res, next) {

    if (req.query.course_id == null) {

        CourseModel.find({teacher: req.session.user._id}).populate({path: 'sessions', model: SessionModel}).populate({path: 'students', model: UserModel}).exec(function (err, courses) {
            res.render('evaluation', {firstname: req.session.user.firstname, name: req.session.user.name, courses: courses});
        });

    } else {

        if (req.query.session_id == null)  {

            CourseModel.find({teacher: req.session.user._id}).populate({path: 'sessions', model: SessionModel}).populate({path: 'students', model: UserModel}).exec(function (err, courses) {
                CourseModel.find({teacher: req.session.user._id, _id: req.query.course_id}).populate({path: 'sessions', model: SessionModel}).populate({path: 'students', model: UserModel}).exec(function (err, course) {
                    res.render('evaluation', {
                        firstname: req.session.user.firstname,
                        name: req.session.user.name,
                        course: course[0],
                        courses: courses,
                        sessions: course[0].sessions,
                        students: course[0].students
                    });
                });
            });

        } else if (req.query.session_id != null)  {

            req.session.session_id = req.query.session_id;

            if (req.query.student_id != null) {

                req.session.student_id = req.query.student_id;

                CourseModel.find({teacher: req.session.user._id}).populate({path: 'sessions', model: SessionModel}).populate({path: 'students', model: UserModel}).exec(function (err, courses) {
                    CourseModel.find({teacher: req.session.user._id, _id: req.query.course_id}).populate({path: 'sessions', model: SessionModel}).populate({path: 'students', model: UserModel}).exec(function (err, course) {
                        EvaluationModel.find({student: req.query.student_id, session: req.query.session_id}).populate({path: 'skills', model: SkillModel}).exec(function (err, evaluations) {

                            if (evaluations.length == 0) {

                                SkillModel.find({}).exec(function (err, skills) {

                                    for (i=0; i<skills.length; i++) {

                                        var evaluation = new EvaluationModel({
                                            name: skills[i].name,
                                            mark: -1,
                                            skill: skills[i],
                                            student: req.query.student_id,
                                            session: req.query.session_id
                                        });

                                        evaluation.save(function (err) {
                                            if (err) { throw err; }
                                            console.log('Evaluation ajoutée avec succès !');

                                        });

                                    }

                                    EvaluationModel.find({student: req.query.student_id, session: req.query.session_id}).populate({path: 'skills', model: SkillModel}).exec(function (err, evaluations_new) {

                                        res.render('evaluation', {
                                            firstname: req.session.user.firstname,
                                            name: req.session.user.name,
                                            courses: courses,
                                            course: course[0],
                                            sessions: course[0].sessions,
                                            students: course[0].students,
                                            session: req.query.session_id,
                                            student: req.query.student_id,
                                            evaluations: evaluations_new,
                                            notes: [-1, 1, 2, 3, 4]
                                        });

                                    });

                                });

                            } else {

                                res.render('evaluation', {
                                    firstname: req.session.user.firstname,
                                    name: req.session.user.name,
                                    courses: courses,
                                    course: course[0],
                                    sessions: course[0].sessions,
                                    students: course[0].students,
                                    session: req.query.session_id,
                                    student: req.query.student_id,
                                    evaluations: evaluations,
                                    notes: [-1, 1, 2, 3, 4]
                                });
                            }
                        });

                    });
                });

            } else {

                CourseModel.find({teacher: req.session.user._id}).populate({path: 'sessions', model: SessionModel}).populate({path: 'students', model: UserModel}).exec(function (err, courses) {
                    CourseModel.find({teacher: req.session.user._id, _id: req.query.course_id}).populate({path: 'sessions', model: SessionModel}).populate({path: 'students', model: UserModel}).exec(function (err, course) {
                        res.render('evaluation', {
                            firstname: req.session.user.firstname,
                            name: req.session.user.name,
                            course: course[0],
                            courses: courses,
                            sessions: course[0].sessions,
                            students: course[0].students,
                            session_id: req.query.session_id,
                            notes: [-1, 1, 2, 3, 4]
                        });
                    });
                });

            }

        }

    }

});


router.post('/evaluation.post', async function(req, res, next) {

    for (var skill in req.body) {
        await EvaluationModel.update({student: req.session.student_id, session: req.session.session_id, skill: skill}, { mark : req.body[skill] }, { multi : true }, function (err) {
            if (err) { throw err; }
            console.log('Evaluation modifiée !');
        });
    }

    res.redirect('/evaluation.html');



});


module.exports = router;