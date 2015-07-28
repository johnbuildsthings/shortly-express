var db = require('../config');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

var User = db.Model.extend({
  tableName: 'users', 
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      bcrypt.hashAsync(model.get('password'), null, null)
        .then(function(hash){
          model.set('password', hash);
          return true;
        });
    });
  }
});

module.exports = User;


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// var Promise = require('bluebird');
// var fs = Promise.promisifyAll(require('fs'));

// module.exports = function getPost(){
//   return fs.readFileAsync(file, 'utf8').then(function(content){
//         return {
//             excerpt: content.substr(0, 100)
//         }
//     });
// }