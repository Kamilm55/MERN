const { createName } = require('../utils/uniqueFilename');
const multer  = require('multer');
const path = require('path');

const multerHandler = () =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          const destinations = [
            path.join(__dirname,"../uploads/"),
            path.join(__dirname, '../../frontend/public/img'),
          ];
          cb(null, destinations[0]); // Specify the directory where uploaded files will be stored
          cb(null, destinations[1]); // Specify the directory where uploaded files will be stored
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