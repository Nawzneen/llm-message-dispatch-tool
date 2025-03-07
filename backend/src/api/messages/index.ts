import axios from "axios";
import { Types } from "mongoose";
import { Router, Request, Response } from "express";
import { Message } from "../../db/models/Message";
import { ResponseModel } from "../../db/models/Response";

const router = Router();

// GET /api/messages - List all messages
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/messages - Create a new message and dispatch to LLMs
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, message_content, llm } = req.body;

    if (!user_id || !message_content || !llm || !Array.isArray(llm)) {
      res.status(400).json({ error: "Missing required fields or incorrect format" });
      return;
    }

    // Create a new message entry in the database
    const newMessage = new Message({
      user_id,
      message_content,
      llm,
      status: "Processing",
      timestamp: new Date(),
    });

    const savedMessage = await newMessage.save();

    // Dispatch message to selected LLMs
    const responses = await Promise.all(
      llm.map(async (llm_id: string) => {
        return await sendToOllama(llm_id, message_content, savedMessage._id as Types.ObjectId);
      })
    );

    // Update the message status and add responses
    const responseDocs = await ResponseModel.insertMany(responses);
    await Message.findByIdAndUpdate(savedMessage._id, {
      responses: responseDocs.map((resp) => resp._id),
      status: "Completed",
    });

    res.status(201).json({ message: "Message processed", responses: responseDocs });
  } catch (error) {
    console.error("Error dispatching message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to send a message to Ollama
async function sendToOllama(llm_model: string, message_content: any, messageId: Types.ObjectId) {
  try {
    const ollamaUrl = `http://ollama:11434/api/generate`; // Ollama endpoint
    const payload = {
      model: llm_model,
      prompt: message_content.user_message,
      system: message_content.system_message,
      stream: false,
    };

    const response = await axios.post(ollamaUrl, payload);

    return {
      messageId,
      llm: llm_model,
      response_content: { text: response.data.response },
      timestamp: new Date(),
    };
  } catch (error) {
    console.error(`Error processing LLM (${llm_model}):`, error);
    return {
      messageId,
      llm: llm_model,
      response_content: { text: "Error processing request" },
      timestamp: new Date(),
    };
  }
}

export default router;
