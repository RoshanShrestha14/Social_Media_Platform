const {activeCheck, createPost, getUserPosts, getAllUsersPost, deletePost} =require('../controllers/postsControllers');

const express = require("express");
const {singleUpload} = require('../middlewares/uploads');
const { userVerification } = require('../middlewares/Auth.Middleware');
const router = express.Router();

router.get("/active",activeCheck);
router.post("/uploadPost",userVerification,singleUpload,createPost);
router.get("/getUserPosts",userVerification,getUserPosts);
router.post("/getAllPosts",userVerification,getAllUsersPost);
router.delete("/destroyPost",userVerification,deletePost)


module.exports = router; 
