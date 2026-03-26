const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
    register,
    login,refresh
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]})
);

router.get("/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res, next) => {
        console.log("REQ USER:", req.user);
        console.log("RES TYPE:", typeof res.json);

  
      try {
        if (!req.user) {
          return res.status(401).json({ error: "User not found" });
        }
  
        res.status(200).json({
          message: "Google login successful",
          user: req.user
        });
  
      } catch (error) {
        next(error);
      }
  
    }
  );

module.exports = router;