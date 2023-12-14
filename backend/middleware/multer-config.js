// Multer lib help upload file and any form-data from front end or api request

// params { dest: 'uploads/' } will create directory folder of uploads
// and all the images upload will store inside this folder
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, name + Date.now() + '.' + file.originalname);
  }
});

module.exports = multer({ storage }).single("media");