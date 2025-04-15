import mongoose from "mongoose";

export const DbConnect = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(data => console.log(`MongoDb Connect SuccesFull `))
    .catch(error => console.log(`MongoDb Connect ${error}`));
};
