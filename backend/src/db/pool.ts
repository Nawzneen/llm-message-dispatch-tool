import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

// Get db credentials from .env
const db_username = process.env.db_username;
const db_password = process.env.db_password;

// Format ConnectionString for MongoDB
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.t8ptu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri);

let conn: MongoClient;

async function connectToDB() {
  try {
    conn = await client.connect();
    console.log("Connected to MongoDB");
  } catch(e) {
    console.error(e);
  }
}

export async function initializeDB() {
  await connectToDB();
  let db = conn.db("sqa");
  return db;
}