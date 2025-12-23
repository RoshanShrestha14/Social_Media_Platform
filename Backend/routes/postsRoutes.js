const {activeCheck, createPost, getUserPosts, getAllUsersPost, deletePost,knowPosts} =require('../controllers/postsControllers');

const express = require("express");
const {singleUpload} = require('../middlewares/uploads');
const { userVerification } = require('../middlewares/Auth.Middleware');
const router = express.Router();

router.get("/active",activeCheck);
router.post("/uploadPost",userVerification,singleUpload,createPost);
router.get("/getUserPosts",userVerification,getUserPosts);
router.get("/getAllPosts",getAllUsersPost);
router.delete("/destroyPost",userVerification,deletePost)

router.post("/knowPosts",knowPosts);



module.exports = router; 
