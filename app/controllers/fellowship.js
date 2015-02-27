
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var FellowShip = mongoose.model('FellowShip');
var User = mongoose.model('User');
var extend = require('util')._extend;


/**
 * List
 */

exports.index = function (req, res){

    FellowShip.find({name : "莱顿团契"}, function(err, fs) {

        User.find({fs_id : fs._id}, function(err, users) {

            users = users || [];
            res.render('fellowship/index', {
                fellowship: {fs : fs, users: users}
            });
        });
    });
};

