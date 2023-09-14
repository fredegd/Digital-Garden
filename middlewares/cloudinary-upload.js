const cloudinary = require("cloudinary");
const upload = require("./multer-upload");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


const cloudinaryUpload = async (req, res, next) => {
  try {
    const  filepath  = req.file.path;
    const result = await cloudinary.v2.uploader.unsigned_upload(
      filepath, upload_preset = "khtxqf9d");

      console.log(result, "is the result");
        
        result.localPath = filepath;

        req.file = result;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("upload failed", err);
  }
};




module.exports = { cloudinaryUpload };
