import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  user_id: string;
  message_content: {
    user_message: string;
    system_instructions?: string;
  };
  llm: string[];
  responses: Types.ObjectId[];
  status: "Pending" | "Processing" | "Completed";
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  user_id: { type: String, required: true },
  message_content: { type: Object, required: true },
  llm: { type: [String], required: true },
  responses: { type: [Schema.Types.ObjectId], ref: "Response", default: [] },
  status: { type: String, enum: ["Pending", "Processing", "Completed"], default: "Pending" },
  timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
