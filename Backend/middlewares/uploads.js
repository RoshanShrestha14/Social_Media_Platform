const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloud.Config.js');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'social-app',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 7 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed'), false);
    }
  }
});

module.exports = {
  singleUpload: upload.single('picture'), 
  multipleUpload: upload.array('pictures', 10), 
  uploadInstance: upload 
};