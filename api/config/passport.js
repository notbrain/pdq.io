var passport       = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new BearerStrategy({
  },
  function(token, done) {
    // asynchronous validation, for effect...
    process.nextTick(function () {
      
      // Find the user by token.  If there is no user with the given token, set
      // the user to `false` to indicate failure.  Otherwise, return the
      // authenticated `user`.  Note that in a production-ready application, one
      // would want to validate the token for authenticity.
      User.findOne({auth: token}, function (err, user) {
        
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
        
      })
      
    });
  }
));

module.exports = {
  passport: passport
}