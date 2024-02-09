import express from "express";
import passport from "../auth/passportConfig";
import { JWTRequest, authJWT, generateJwtToken } from "../util/jwt-util";
import { oauthUser } from "../util/interface/oauth";
const router = express.Router();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const user = req.user as oauthUser;
    console.log(req.user);
    const token = generateJwtToken(user);
    res.json({ token });
  }
);

router.get("/access", authJWT, (req: JWTRequest, res) => {
  console.log(req.decoded);

  res.json(req.decoded);
});

export default router;
