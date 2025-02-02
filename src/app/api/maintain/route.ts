import { NextResponse } from "next/server";
import { connectDB } from "../../server/config/db";
import { z } from "zod";
import { Maintain } from "@/app/server/models/maintain.modal";

const projectSchema = z.object({
  projectType: z.string(),
  managingTimePeriod: z.enum(["3 Months", "6 Months", "1 Year", "2 Years"]),
  flow: z.array(z.string()).nonempty("At least one flow is required"),
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

    const newProject = new Maintain(validatedData);
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
    const projects = await Maintain.find();
    return NextResponse.json({ data: projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof z.ZodError ? error.errors : "Server error" },
      { status: 500 }
    );
  }
}
