const {activeCheck} =require('../controllers/postsControllers');

const express = require("express");
const {multipleUpload} = require('../middlewares/uploads');
const router = express.Router();

router.get("/active",activeCheck);
router.post("/uploadPost",multipleUpload);


module.exports = router; 
