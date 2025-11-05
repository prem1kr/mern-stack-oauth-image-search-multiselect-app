import passport from "../config/passport.js";



export const authUser = (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, msg: "Not authenticated" });
  const { _id, name, email, avatar, provider } = req.user;
  res.json({ success: true, user: { id: _id, name, email, avatar, provider } });
};

export const logout = (req, res) => {
  req.logout(() => {
    req.session = null;
    res.redirect(process.env.FRONTEND_URL || "/");
  });
};
