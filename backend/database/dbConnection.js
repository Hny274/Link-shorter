import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGOURL);
    console.log(`DB Connected !${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("DB connection failed");
  }
};
