import express, { Request, Response } from "express";
import { LLMModel } from "../../db/models/Llm";
import axios from "axios";

const router = express.Router();

// List all LLM models from MongoDB
router.get("/", async (req: Request, res: Response) => {
  try {
    const models = await LLMModel.find();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve models" });
  }
});

// Fetch available LLM models from Ollama and update DB
router.get("/refresh", async (req: Request, res: Response) => {
  try {
    const ollama_host = process.env.OLLAMA_HOST || "http://localhost:11434";
    const response = await axios.get(`${ollama_host}/api/tags`);
    console.log(response.data);
    const models = response.data.models.map((model: any) => ({
      model_name: model.name,
    }));

    await LLMModel.deleteMany({}); // Clear existing models
    await LLMModel.insertMany(models); // Save new models

    res.json({ message: "Model list updated", models });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch models from Ollama" });
  }
});

// Start (activate) an LLM model
router.post("/:modelName/start", async (req: Request, res: Response) => {
  const { modelName } = req.params;
  try {
    const ollama_host = process.env.OLLAMA_HOST || "http://localhost:11434";
    await axios.post(`${ollama_host}/api/start`, { model: modelName });
    await LLMModel.updateOne({ model_name: modelName }, { status: "Active" });

    res.json({ message: `Model ${modelName} started` });
  } catch (error) {
    res.status(500).json({ error: "Failed to start model" });
  }
});

// Stop (deactivate) an LLM model
router.post("/:modelName/stop", async (req: Request, res: Response) => {
  const { modelName } = req.params;
  try {
    const ollama_host = process.env.OLLAMA_HOST || "http://localhost:11434";
    await axios.post(`${ollama_host}/api/stop`, { model: modelName });
    await LLMModel.updateOne({ model_name: modelName }, { status: "Inactive" });

    res.json({ message: `Model ${modelName} stopped` });
  } catch (error) {
    res.status(500).json({ error: "Failed to stop model" });
  }
});

export default router;
