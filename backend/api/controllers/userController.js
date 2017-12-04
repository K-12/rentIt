'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('Users'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken');

exports.list_all_users = function(req, res) {
    User.find({}, function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.register = function(req, res) {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hash_password = undefined;
        return res.json(user);
      }
    });
  };

  exports.sign_in = function(req, res) {
    User.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.status(401).json({ message: 'Authentication failed. User not found.' });
      } else if (user) {
        if (!user.comparePassword(req.body.password)) {
          res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        } else {
          return res.json({token: jwt.sign({ ID: user._id, name: user.name }, 'RESTFULAPIs', { expiresIn: 60*60}), name:user.name});
        }
      }
    });
  };

  exports.loginRequired = function(req, res, next) {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
    }
  };


exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.get_user = function(req, res) {
    User.findById(req.params.userId, function(err, object) {
        if (err)
            res.send(err);
        if (object==null)
            res.sendStatus(404);
        else
            res.json(object);
    });
};


exports.update_user = function(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.delete_user = function(req, res) {
    User.remove({
        _id: req.params.userId
    }, function(err, object) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};