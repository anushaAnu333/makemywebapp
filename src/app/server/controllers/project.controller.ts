import { NextResponse } from "next/server";
import { connectDB } from "../config/db";
import { createProject, getAllProjects } from "../service/project.service";
import { z } from "zod";

export async function handleCreateProject(req: Request) {
  await connectDB();

  try {
    const projectData = await req.json();

    const requiredFields = ["projectType", "timeSpan", "flow", "frontend", "backend", "database"];
    for (const field of requiredFields) {
      if (!projectData[field]) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 });
      }
    }

    const newProject = await createProject(projectData);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof z.ZodError ? error.errors : "Server error" }, { status: 500 });
  }
}

export async function handleGetProjects() {
  await connectDB();

  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof z.ZodError ? error.errors : "Server error" }, { status: 500 });
  }
}
