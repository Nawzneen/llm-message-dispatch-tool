import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Get db credentials from .env
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME || "sqa"; // Default to "sqa" if not provided

// Format MongoDB Connection URI
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.t8ptu.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`;

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
