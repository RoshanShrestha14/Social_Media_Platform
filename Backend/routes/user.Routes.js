const express = require("express");
const router = express.Router();
const { singleUpload } = require("../middlewares/uploads");
const { updateProfilePicture } = require("../controllers/user.Controllers");
const { userVerification } = require("../middlewares/Auth.Middleware");

router.post("/updateProfile", userVerification, singleUpload, updateProfilePicture);

module.exports = router;
