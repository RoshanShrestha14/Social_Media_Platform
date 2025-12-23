const express = require("express");
const { userVerification } = require("../middlewares/Auth.Middleware");
const { createComment, editComment, destroyComment, fetchComment } = require("../controllers/comment.Controllers");
const router = express.Router();



router.post("/createComment",userVerification,createComment);
router.put("/editcomment",userVerification,editComment);
router.delete("/destroyComment",userVerification,destroyComment)
router.get("/getAllComments",fetchComment);




module.exports = router