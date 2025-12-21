const express = require("express");
const router = express.Router();
const { singleUpload } = require("../middlewares/uploads");
const {
  updateProfilePicture,
  sendConnection,
  acceptConnection,
  rejectConnection,
  cancelConnection,
} = require("../controllers/user.Controllers");
const { userVerification } = require("../middlewares/Auth.Middleware");

router.post(
  "/updateProfile",
  userVerification,
  singleUpload,
  updateProfilePicture
);
router.post("/sendConnectionRequest", userVerification, sendConnection);
router.put("/acceptConnectionRequest", userVerification, acceptConnection);
router.put("/rejectConnectionRequest", userVerification, rejectConnection);
router.put("cancelConnectionRequest", userVerification, cancelConnection);

module.exports = router;
