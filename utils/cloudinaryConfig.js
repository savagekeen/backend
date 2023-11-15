const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'drkrjicsu', 
    api_key: '491742688329264', 
    api_secret: '-lZV7qLa6baOy5LHwEinhcCdWPs' 
  });

  module.exports = {cloudinary}