var express = require('express');
const bosyParser = require('body-parser');
const passport = require('passport');

const bodyParser = require('body-parser');
const User = require('../models/user');
var authenticate = require('../authenticate');
const cors = require('./cors');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// GET and DELETE users listing.  @/users
router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, function(req, res, next) {
  User.find({})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
    console.log(users);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /users');
})
// Only ADMIN is authorized:-
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.remove({})
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

//Signup, login and logout Routes 
router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  //we use the password with the User.Register() which is a passport-local-mongoose function
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      if (req.body.email)
        user.email = req.body.email;
      if (req.body.phoneNo)
        user.phoneNo = req.body.phoneNo;
      if (req.body.linkedIn)
        user.linkedIn = req.body.linkedIn;
      if (req.body.gitHub)
        user.gitHub = req.body.gitHub;
      if (req.body.pastAcademic)
        user.pastAcademic = req.body.pastAcademic;
      if (req.body.certificates)
        user.certificates = req.body.certificates;
      if (req.body.projects)
        user.projects = req.body.projects;
      if (req.body.internships)
        user.internships = req.body.internships;
      if (req.body.rollNo)
        user.rollNo = req.body.rollNo;
      user.save((err, user) => {
        if(err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, status: 'Registration Successful!', user: user });
        });
      });
    }
  });
});

router.post('/login', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      return next(err);
    }
    //Handles errors like username or password incorrect depending upon if the user exists.
    if(!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Unsuccessfull', err: info});
    }
    //logIn method is added by passport to log the user in
    req.logIn(user, (err) => {
      if(err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessfull', err: 'Could not log the user in.'});        
      }
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, token: token, status: 'You are successfully logged in!'});      
    });
  }) (req, res, next);
});

/********************************************************/
/********************************************************/

//LOGOUT isn't working.....

/********************************************************/
/********************************************************/
router.post('/logout', (req, res, next) => {
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/login');
  }
  else {
    var err = new Error("You are not logged in");
    res.statusCode = 403;
    next(err);
  }
});
/********************************************************/
/********************************************************/

//LOGOUT isn't working.....

/********************************************************/
/********************************************************/

//GET, PUT, POST and DELETE  @ /users/:userId
router.route('/:userId')
.get((req, res, next) => {
  User.findById(req.params.userId)
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
    console.log(user);
  }, (err) => next(err));
})
// A middleware (authenticate.verifyUser) which checks if the user is authenticated,
// defined in authenticate.js 
// 'req.user' contains the authenticated user 
.post(authenticate.verifyUser, authenticate.verifyForProfile, (req, res, next) => {
  res.statusCode = 200;
  res.end('POST operation not supported on /users/'+req.params.userId);
})
.put(authenticate.verifyUser, authenticate.verifyForProfile, (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, {
    $set: req.body
  }, {new: true})
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyForProfile, (req, res, next) => {
  User.findByIdAndRemove(req.params.userId)
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = router;
