import express from "express";
import passport from "passport";
import { authUser, logout } from "../controllers/authController.js";

const router = express.Router();


router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL || "/"}?auth=fail`,
    session: true,
  }),
  (req, res) => {
        req.session.touch();       

    res.redirect(process.env.FRONTEND_URL || "/");
  }
);


router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] })); 

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${process.env.FRONTEND_URL || "/"}?auth=fail`,
    session: true,
  }),
  (req, res) => {
        req.session.touch();      

    res.redirect(process.env.FRONTEND_URL || "/");
  }
);

router.get("/auth/user", authUser);
router.post("/auth/logout", logout);

export default router;
