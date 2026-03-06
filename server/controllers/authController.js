import passport from "../config/passport.js";



export const authUser = (req, res) => {
  console.log("SESSION:", req.session);
  console.log("USER:", req.user);

  if (!req.user) {
    return res.status(401).json({ success: false });
  }

  res.json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  req.logout(() => {
    req.session = null;
    res.redirect(process.env.FRONTEND_URL || "/");
  });
};
