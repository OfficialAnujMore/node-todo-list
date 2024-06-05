import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_CONNECTION_STRING}/${process.env.DB_NAME}`
    );

    console.log(
      `MongoDB connected SUCCESSFULLY ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection FAILED", error);
    process.exit();
  }
};

export { connectDB };
