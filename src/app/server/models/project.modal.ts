import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  projectType: string;
  timeSpan: string;
  flow: string[];
  frontend: string;
  backend: string;
  database: string;
  createdAt?: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    projectType: { type: String, required: true },
    timeSpan: { type: String, required: true },
    flow: { type: [String], required: true },
    frontend: { type: String, required: true },
    backend: { type: String, required: true },
    database: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
