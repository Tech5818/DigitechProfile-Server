import express from "express";
import passport from "../auth/passportConfig";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/auth/access");
  }
);

router.get("/access", (req, res) => {
  res.json(req.user);
});

export default router;
