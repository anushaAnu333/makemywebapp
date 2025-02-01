import { handleCreateProject, handleGetProjects } from "../controllers/project.controller";

export async function GET() {
  return handleGetProjects();
}

export async function POST(req: Request) {
  return handleCreateProject(req);
}
