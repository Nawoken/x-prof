/**
 * Created by j.leflour on 4/24/18.
 */

var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var UserModel = require('../models/userModel');

mongoose.connect('mongodb://localhost/x-prof', function(err) {
    if (err) { throw err; }
});



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'X-PROF' });
});

/* GET authentification. */
router.get('/auth.html', function(req, res, next) {
    res.render('auth');
});

/* GET authentification post. */
router.post('/auth.post', function(req, res, next) {
    var user = UserModel(req.body);
    UserModel.find({ login: user.login, password: user.password}).exec(function(err, foundUsers) {
        if (foundUsers.length > 0) {
            req.session.user = foundUsers[0];
            res.redirect('/evaluation.html');
        } else {
            res.render('auth', { intro: 'Failure to connect, please try again' });
        }
    });

});

module.exports = router;