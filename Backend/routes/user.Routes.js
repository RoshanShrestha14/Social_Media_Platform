const express = require("express");
const router = express.Router();
const { singleUpload } = require("../middlewares/uploads");
const {
  updateProfilePicture,
  sendConnection,
  acceptConnection,
  rejectConnection,
  cancelConnection,
  updateProfile,
  allConnections
} = require("../controllers/user.Controllers");
const { userVerification } = require("../middlewares/Auth.Middleware");

router.post(
  "/updateProfile",
  userVerification,
  singleUpload,
  updateProfilePicture
);
router.put("/editProfile",userVerification,updateProfile)
router.post("/sendConnectionRequest", userVerification, sendConnection);
router.put("/acceptConnectionRequest", userVerification, acceptConnection);
router.put("/rejectConnectionRequest", userVerification, rejectConnection);
router.put("/cancelConnectionRequest", userVerification, cancelConnection);
router.get("/getAllConnections",userVerification,allConnections);


module.exports = router;
