import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();


passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean();
    done(null, user);
  } catch (err) {
    done(err);
  }
});


const findOrCreateUser = async ({ provider, providerId, profileData }) => {
  let user = await User.findOne({ provider, providerId });
  if (!user) {
    user = await User.create(profileData);
  }
  return user;
};


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const profileData = {
          name: profile.displayName,
          email: profile.emails?.[0]?.value || null,
          avatar: profile.photos?.[0]?.value || null,
          provider: "google",
          providerId: profile.id,
        };
        const user = await findOrCreateUser({
          provider: "google",
          providerId: profile.id,
          profileData,
        });
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/github/callback`,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const profileData = {
          name: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value || null,
          avatar: profile.photos?.[0]?.value || null,
          provider: "github",
          providerId: profile.id,
        };
        const user = await findOrCreateUser({
          provider: "github",
          providerId: profile.id,
          profileData,
        });
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

export default passport;
