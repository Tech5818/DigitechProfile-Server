import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { config } from "dotenv";

config();

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_PASSWORD!,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    (accessToken, refrechToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj!);
});

export default passport;
