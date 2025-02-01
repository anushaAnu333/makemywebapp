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

 const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);



import { NextResponse } from "next/server";

import { z } from "zod";
import { connectDB } from "../../server/config/db";

const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(15),
});

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const newContact = new Contact(validatedData);
    await newContact.save();

    return NextResponse.json({ message: "Contact saved successfully", data:newContact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof z.ZodError ? error.errors : "Server error" }, { status: 400 });
  }
}
