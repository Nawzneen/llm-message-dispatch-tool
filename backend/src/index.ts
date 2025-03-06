import express, { Request, Response } from "express";
import { initializeDB } from "./db/pool";
import messages from "./api/messages";
import llms from "./api/llms";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/api", (req: Request, res: Response) => {
  res.send("Hello");
});

app.use("/api/messages", messages);
app.use("/api/llms", llms);

// Start the server only after database connection
async function startServer() {
  try {
    await initializeDB(); // Ensure DB is initialized before starting the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to initialize the server:", error);
    process.exit(1); // Exit if database fails to connect
  }
}

startServer();
