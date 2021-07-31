const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/images",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadImage = multer({
  storage: storage,
  // limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image");

const multipleStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype == "application/pdf"){
      cb(null, "public/pdf")
    }else{
      cb(null, "public/images")
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadMultiple = multer({
  storage: multipleStorage,
  // limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([{ name: 'imageLogo', maxCount: 1 }, 
{ name: 'registration', maxCount: 1 }
, { name: 'imageHistory', maxCount: 1 }])

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|pdf/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}
module.exports = { uploadImage, uploadMultiple };