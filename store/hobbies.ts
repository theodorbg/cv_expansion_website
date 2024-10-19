import { create } from 'zustand';

// Define the state interface
interface hobbies {
  id: number,
  headline: string,
  content: string,
  thumbnail: string
}

export const useHobbies = create<{
  hobbies: hobbies[]
  setHobbies: (projects: hobbies[]) => void
}>((set, get) => ({
  hobbies: [],
  setHobbies: (loadedData) => {
    const updatedData = loadedData.map(proj => ({
      ...proj
    }));
    set({ 
      hobbies: updatedData,
    });
  },
}));

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const dataUrl = new URL('/data/hobbies.json', baseUrl).toString();

fetch(dataUrl)
  .then(res => res.json())
  .then((data: hobbies[]) => {
    useHobbies.getState().setHobbies(data);
  });


  