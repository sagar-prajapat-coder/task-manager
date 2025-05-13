import mongoose from "mongoose";

const connetDB = async (_URL) => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.set("strictPopulate", false);
    mongoose.connect(_URL);
    console.log(`DB Connected`);
  } catch (error) {
    console.log("Mongo connection error", error);
    process.exit(1);
  }
};

export default connetDB;
