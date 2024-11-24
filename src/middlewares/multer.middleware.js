import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) { //multer will call tis function with 3 arguments and we are calling third argument with expected two args
    cb(null, '../public')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })