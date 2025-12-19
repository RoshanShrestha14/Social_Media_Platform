const express = require("express");
const router = express.Router();
const { register, Login } = require("../controllers/auth.Controllers");
const { userVerification } = require("../middlewares/Auth.Middleware");


//routes
router.post("/register", register);
router.post("/login",Login);
router.post("/verify",userVerification);

module.exports = router;
