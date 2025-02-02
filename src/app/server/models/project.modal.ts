import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  projectType: string;
  timeSpan: string;
  flow: string[];
  frontend: string;
  backend: string;
  database: string;
  email: string;
  mobile: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    projectType: { type: String, required: true },
    timeSpan: { type: String, required: true },
    flow: { type: [String], required: true },
    frontend: { type: String, required: true },
    backend: { type: String, required: true },
    database: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  
    },
    mobile: { 
      type: String, 
      required: true, 
      match: /^\d{10,15}$/ 
    }
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
