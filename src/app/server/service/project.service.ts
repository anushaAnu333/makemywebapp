import { IProject, ProjectModel } from "../models/project.modal";

export const createProject = async (projectData: IProject) => {
  return await ProjectModel.create(projectData);
};

export const getAllProjects = async () => {
  return await ProjectModel.find().sort({ createdAt: -1 });
};
