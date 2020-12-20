var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

require('dotenv').config();
const User = require('./models/user');

//Exporting the middleware for LocalStrategy 
//req.user contains the authenticated user, if the authentication was successful
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Used for token generation after login
exports.getToken = function(user) {
    return jwt.sign(user, process.env.secretKey, {expiresIn: 3600});
}

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretKey;

//Configuration of JwtStrategy
//jwt_payload is an object literal containing the decoded JWT payload
exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT Payload: ", jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user) => {
        if(err) {
            return done(err, false);
        }
        else if(user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));

// Exporting the middleware for JwtStrategy for User Verification
exports.verifyUser = passport.authenticate('jwt', {session: false});

// Middleware which verifies an ADMIN
exports.verifyAdmin = (req, res, next) => {
    if(req.user.admin) next();
    else {
        res.statusCode = 403;
        var err = new Error('You are not authorized.');
        return next(err);
    }
}

exports.verifyForProfile = (req, res, next) => {
    console.log("req.user:-", req.user);
    console.log("req.params.userID:-", req.params.userId);

    if(req.user._id == req.params.userId) next();
    else {
        res.statusCode = 403;
        var err = new Error('You are not authorized.');
        return next(err);
    }
}