import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send('<a href="/auth/google">Google 로그인</a>');
});

export default router;
