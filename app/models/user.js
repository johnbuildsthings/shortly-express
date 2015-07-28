var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users', 
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      var hash = Promise.promisify(bcrypt.hash())

    };
  }
});

module.exports = User;




bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});