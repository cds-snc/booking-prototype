const LocalStrategy = require("passport-local").Strategy;

const allUsers = [
    {username: "bob", password: "bob"},
    {username: "ted", password: "ted"},
]
const initAuth = (passport) => {
    // passport.serializeUser((user, done) => {
    //     done(null, user);
    // });
    // passport.deserializeUser((user, done) => {
    //     done(null, user);
    // });
    passport.use(new LocalStrategy(
        (username, password, done) => {
          console.log("hi")
          allUsers.forEach(x => {
            console.log("checking user", x.username)
            // if (err) { return done(err); }
            if (x.username === username && x.password === password) {
              console.log("success")
              return done(null, false)
            } 
          })
          return done(null, false);

          // allUsers.findOne({ username: username }, (err, user) => {
            // console.log("checking user", user)
            // if (err) { return done(err); }
            // if (!user) { return done(null, false); }
            // if (user.password !== password) { return done(null, false); }
            // return done(null, user);
          // });
        },
      ))

    // passport.use(new GoogleStrategy({
    //         clientID: process.env.GOOGLE_CLIENT_ID,
    //         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //         callbackURL: "/auth/google/callback",
    //     },
    //     (token, refreshToken, profile, done) => {
    //         return done(null, {
    //             profile: profile,
    //             token: token,
    //         });
    //     }));
};

const checkAuth = (req, res, next) => {
    if (!req.session.token) {
        return res.redirect(res.locals.route.get("login").url(req.locale))
    }
    next()
}

module.exports = {
    initAuth: initAuth,
    checkAuth: checkAuth,
}