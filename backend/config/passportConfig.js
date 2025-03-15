const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.models.js")

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/auth/google/callback'
        },
        async (token, profile, done) => {
            const { id, displayName, emails } = profile;

            try {
                const user = await User.findOne({ googleId: id });

                if (!user) {
                    user = await User.create({
                        googleId: id,
                        name: displayName,
                        email: emails[0].value,
                    })
                }

                return done(null, user);

            } catch (error) {
                return done(error, null)
            }
        }
    )
)