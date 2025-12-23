const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloud.Config");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "social-app",
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});


// “Before accepting a file upload, check what kind of file it is.
// If it’s an image, allow it.
// If it’s not an image, reject it and show an error.”

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = {
  singleUpload: upload.single("picture"),
};
