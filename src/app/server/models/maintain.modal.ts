import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  projectType: string;
  managingTimePeriod: "3 Months" | "6 Months" | "1 Year" | "2 Years";
  flow: string[];
  frontend: string;
  backend: string;
  database: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    projectType: { type: String, required: true },
    managingTimePeriod: { 
      type: String, 
      enum: ["3 Months", "6 Months", "1 Year", "2 Years"], 
      required: true 
    },
    flow: { type: [String], required: true },
    frontend: { type: String, required: true },
    backend: { type: String, required: true },
    database: { type: String, required: true },
  },
  { timestamps: true }
);

export const Maintain = mongoose.models.Project || mongoose.model<IProject>("Maintain", ProjectSchema);
