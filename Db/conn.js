import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const conn = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error.", err);
      process.exit();
    });
  } catch (err) {
    console.log(err);
  }
};

export default conn;
