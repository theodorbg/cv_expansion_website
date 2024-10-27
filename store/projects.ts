import { create } from 'zustand';
import projectsData from '@/public/data/projects.json';

// Define the state interface
interface project {
  key: number,
  title: string,
  monthYear: string,
  imagePath: string,
  image: {path:string}[],
  description: string[],
  fullImagePath: string[], 
  model?: string,
  fullModelPath: string,
  modelScale?: number,
}

export const useProjects = create<{
  projects: project[]
  setProjects: (projects: project[]) => void
}>((set, get) => ({
  projects: [],
  setProjects: (loadedData) => {
    set({ 
      projects: loadedData,
    });
  },
}));

const transformedProjectsData = projectsData.map(proj => ({
  ...proj,
  fullImagePath: proj.image.map(img => `${proj.imagePath}${img.path}`),
  fullModelPath: proj.model ? `${proj.imagePath}${proj.model}` : "null",
}));

useProjects.getState().setProjects(transformedProjectsData);



  