const fs = require("fs");
const path = require("path");
const port = 5000; // 3000
const appUrl = "https://www.api.xs-anime.me"; // http://127.0.0.1

exports.uploadBase64Image = async (req, res, next) => {
  console.log(req.body);

  try {
    //console.log(req.body);
    const encoded = req.body.image;
    const base64ToArray = encoded.split(";base64,");
    const prefix = base64ToArray[0];
    const extension = prefix.replace(/^data:image\//, "");
    //const extension = 'txt';

    if (extension === "jpeg" || extension === "jpg" || extension === "png") {
      const imageData = base64ToArray[1];
      const fileName = ((new Date().getTime() / 1000) | 0) + "." + extension;
      const imagePath =
        path.join(__dirname, "../public/uploads/images/") + fileName;
      fs.writeFileSync(imagePath, imageData, { encoding: "base64" });

      return res.status(201).json({
        error: false,
        message: "Base64 Image was successfully uploaded.",
        url: `${appUrl}/public/uploads/images/${fileName}`,
      });
    } else {
      return res.status(403).json({
        error: true,
        message: "Base64 data not valid!",
      });
    }
  } catch (e) {
    return res.status(403).json({
      error: true,
      message: e.message,
    });
  }
};
