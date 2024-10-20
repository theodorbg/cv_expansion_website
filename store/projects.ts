import { create } from 'zustand';
import projectsData from '@/public/data/projects.json';

// Define the state interface
interface project {
  key: number,
  title: string,
  monthYear: string,
  imagePath: string,
  image: {path:string, args:string}[],
  description: string[],
  fullImagePath: string[], 
}

export const useProjects = create<{
  projects: project[]
  setProjects: (projects: project[]) => void
}>((set, get) => ({
  projects: [],
  setProjects: (loadedData) => {
    const updatedData = loadedData.map(proj => ({
      ...proj,
      fullImagePath: proj.image.map(img => `${proj.imagePath}${img["path"]}`), // Concatenate imagePath and image
    }));
    set({ 
      projects: updatedData,
    });
  },
}));

const transformedProjectsData = projectsData.map(proj => ({
  ...proj,
  fullImagePath: proj.image.map(img => `${proj.imagePath}${img.path}`),
}));

useProjects.getState().setProjects(transformedProjectsData);



  