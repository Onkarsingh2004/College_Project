const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer(
  { storage: storage },
  { limits: { fileSize: 1024 * 1024 * 6 } },
  function fileFilter(req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      cb(new Error("Image Only" + file.originalname));
    } else {
      cb(null, true);
    }
  }
);

module.exports = upload;