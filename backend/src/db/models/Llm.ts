import mongoose, { Schema, Document } from "mongoose";

export interface ILLM extends Document {
  model_name: string;
  status: "Active" | "Inactive";
}

const LLMSchema = new Schema<ILLM>({
  model_name: { type: String, required: true, unique: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

export const LLMModel = mongoose.model<ILLM>("LLM", LLMSchema);
