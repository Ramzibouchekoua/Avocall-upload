import mongoose from "mongoose";
import config from "../config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      config.mongoose.uri,
      config.mongoose.options
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
