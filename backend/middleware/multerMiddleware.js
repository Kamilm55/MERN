const { createName } = require('../utils/uniqueFilename');
const multer  = require('multer');
const path = require('path');

const multerHandler = () =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname,"../uploads/")); // Specify the directory where uploaded files will be stored
        },
        filename: function (req, file, cb) {
          const uniqueFilename = createName(file);
          cb(null,uniqueFilename); // Set the file name to be unique
        },
      });
     const upload = multer({ storage: storage });
     return upload;
}

 module.exports = {
    multerHandler
 }