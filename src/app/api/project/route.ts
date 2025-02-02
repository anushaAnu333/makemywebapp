import { NextResponse } from "next/server";

import { z } from "zod";
import { connectDB } from "../../server/config/db";
import { Project } from "../../server/models/project.modal";

const projectSchema = z.object({
  projectType: z.string(),
  timeSpan: z.string(),
  flow: z.array(z.string()),
  frontend: z.string(),
  backend: z.string(),
  database: z.string(),
  email: z.string().email(),
  mobile: z.string().regex(/^\d{10,15}$/),
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const validatedData = projectSchema.parse(body);

    const newProject = new Project(validatedData);
    await newProject.save();

    return NextResponse.json(
      { message: "Project saved successfully", data: newProject },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof z.ZodError ? error.errors : "Server error" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find(); 

    return NextResponse.json({ data: projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof z.ZodError ? error.errors : "Server error" }, { status: 500 });
  }
}
