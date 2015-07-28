var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users', 
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      var hash = Promise.promisify(bcrypt.hash(model.get('password'), null, null));
      return hash;
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