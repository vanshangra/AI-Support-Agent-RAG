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
    passport.authenticate("google", {session: false}),
    (res, req) => {
        res.json({message: "Google login Successful", user: req.user});
    }
);

module.exports = router;