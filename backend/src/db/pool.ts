import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db_username = process.env.DB_USERNAME || "admin";
const db_password = process.env.DB_PASSWORD || "password";
const db_host = process.env.DB_HOST || "mongodb";
const db_port = process.env.DB_PORT || "27017";
const db_name = process.env.DB_NAME || "sqa";

// Format MongoDB Connection URI
const uri = `mongodb://${db_username}:${db_password}@${db_host}:${db_port}/${db_name}?authSource=admin`;

// Function to connect to MongoDB
export async function initializeDB(): Promise<void> {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions);
    
    console.log("Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit process if connection fails
  }
}