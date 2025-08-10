// config/passport.js
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/User.js';

const configurePassport = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log("Google Profile Received:", profile.id, profile.displayName, profile.emails[0].value);

      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        console.log("Found existing user by googleId:", user._id);
        return done(null, user);
      }

      user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        console.log("Linking Google account to existing email user:", user._id);
        if (!user.googleId) {
            user.googleId = profile.id;
            // Optionally update profile picture from Google on link
            if (profile.photos && profile.photos[0] && profile.photos[0].value && !user.profilePic) {
                user.profilePic = profile.photos[0].value;
            }
            await user.save();
        }
        return done(null, user);
      }

      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        // Set profile picture from Google on creation
        profilePic: profile.photos && profile.photos[0] && profile.photos[0].value ? profile.photos[0].value : null,
      });

      const savedUser = await newUser.save();
      console.log("New user created:", savedUser._id);
      return done(null, savedUser);
    } catch (err) {
      console.error("Passport Google Strategy Error:", err);
      return done(err, null);
    }
  }
));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

export default configurePassport;