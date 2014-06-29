var mongoose         = require('mongoose');
// var bcrypt           = require('bcrypt');

var mongoose_uri = process.env.ngExp4Seed_MONGOOSE_URI || 'mongodb://localhost/ngExp4Seed'
mongoose.connect(mongoose_uri)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// db.once('open', function callback () {
  // console.log('[db connection opened]')
  
  //var User = require("../models/User").User;
  
  // bcrypt.genSalt(10, function(err, salt) {
  //   bcrypt.hash("Mel7E5slaD3wuJ1um9Jick7aRb5on1", salt, function(err, hash) {
  //       // Store hash:
        
        // var u = new User({
        //   email: 'brian@pdq.io',
        //   pwh: hash,
        //   auth: 'ha5hiT2nooV9bec2afT0uc4kEk3yOw',
        //   name: 'Brian Ross',
        //   xp: 99
        // })
        
  //       // u.save(function(err, user){
  //       //   if (err) return console.error(err)
          
  //       //   console.dir(user)
          
  //       // })
        
  //   });
  // });
  
// });

module.exports = {
  db: db
}