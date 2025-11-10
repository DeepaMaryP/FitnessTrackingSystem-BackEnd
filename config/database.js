import mongoose from "mongoose";

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(
      `${process.env.CLOUD_MONGI_URL}/${process.env.DB_NAME}`,      
    );
    
    console.log(" MongoDB connected:", mongoose.connection.name);
    isConnected = true;
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
    throw err;
  }
};

export default connectToDatabase;
