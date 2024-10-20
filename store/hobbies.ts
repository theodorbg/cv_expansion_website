import { create } from 'zustand';
import hobbiesData from '../public/data/hobbies.json'; // Import the JSON file

// Define the state interface
interface hobbies {
  id: number;
  headline: string;
  content: string;
  thumbnail: string;
}

export const useHobbies = create<{
  hobbies: hobbies[];
  setHobbies: (projects: hobbies[]) => void;
}>((set) => ({
  hobbies: hobbiesData, // Use the imported data
  setHobbies: (loadedData) => {
    const updatedData = loadedData.map((proj) => ({
      ...proj,
    }));
    set({ hobbies: updatedData });
  },
}));