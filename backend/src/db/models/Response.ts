import mongoose, { Schema, Document, Types } from "mongoose";

export interface IResponse extends Document {
  messageId: Types.ObjectId;
  llm: string;
  response_content: { text: string };
  timestamp: Date;
}

const ResponseSchema = new Schema<IResponse>({
  messageId: { type: Schema.Types.ObjectId, ref: "Message", required: true },
  llm: { type: String, required: true },
  response_content: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const ResponseModel = mongoose.model<IResponse>("Response", ResponseSchema);
