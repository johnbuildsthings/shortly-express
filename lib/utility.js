var request = require('request');
var db = require('../app/config');

exports.getUrlTitle = function(url, cb) {
  request(url, function(err, res, html) {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/

exports.isValidUser = function(req) {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  if (!newUser.fetchAll()) {return false;}
  else {return true;}
}




// select * from `books` where `ISBN-13` = '9780440180296'
new Book({'ISBN-13': '9780440180296'})
  .fetch()
  .then(function(model) {
    // outputs 'Slaughterhouse Five'
    console.log(model.get('title'));
  });



// var foo = Promise.method(function(jsonStr){
//     var obj = JSON.parse(jsonStr); // if this throws - you get a rejection
//     return getApi(obj.endpoint);
// });

var bcrypt   = Promise.promisifyAll(require('bcrypt'));

var Customer = bookshelf.Model.extend({

  login: Promise.method(function(email, password) {
    if (!email || !password) throw new Error('Email and password are both required');
    return new this({email: email.toLowerCase().trim()}).fetch({require: true}).tap(function(customer) {
      return bcrypt.compareAsync(customer.get('password'), password);
    });
  })

});

Customer.login(email, password)  
  .then(function(customer) {
    res.json(customer.omit('password'));
  }).catch(Customer.NotFoundError, function() {
    res.json(400, {error: email + ' not found'});
  }).catch(function(err) {
    console.error(err);
  });