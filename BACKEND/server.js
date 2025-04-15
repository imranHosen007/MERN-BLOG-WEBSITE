import { DbConnect } from "./Database/DbConnect.js";
import { app } from "./index.js";
import cloudinary from "cloudinary";
// Handling uncaught Exception
process.on("uncaughtException", err => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});
// -----Conncect-DataBase-----
DbConnect();
const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
  console.log(`Server Working ${PORT}`);
});

// cloudnairy-Config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
