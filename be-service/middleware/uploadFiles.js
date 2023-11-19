const multer = require('multer');
const path = require('path')

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploaded_files');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const keyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploaded_key');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: imageStorage }).single('image')
const uploadKey = multer({ storage: keyStorage }).single('keyfile')

module.exports = { upload, uploadKey };