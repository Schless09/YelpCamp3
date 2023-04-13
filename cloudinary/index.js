const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.cloudinaryCloudName,
  api_key: process.env.cloudinaryApiKey,
  api_secret: process.env.cloudinaryApiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "YelpCamp",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
