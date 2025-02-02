import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  email: string;
  phone: string;
}

const ContactSchema = new Schema<IContact>(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

 export const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
