const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phoneNo: {
        type: Number
    },
    rollNo: {
        type: String,
        default: ''
    },
    linkedIn: {
        type: String,
        default: ''
    },
    gitHub: {
        type: String,
        default: ''
    },
    pastAcademic: {
        ssc: {
            type: Number
        },
        hsc: {
            type: Number
        },
        diploma: {
            type: Number
        }
    },
    certificates: {
        type: Number,
        default: ''
    },
    projects: [{
        title: {
            type: String,
            default: ''
        },
        link: {
            type: String,
            default: ''
        }
    }],
    internships: [{
        type: String,
        default: ''
    }],
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);