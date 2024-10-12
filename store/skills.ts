import { create } from 'zustand';
import { DateTime } from 'luxon';



export const useSkills = create<{
  firstTimeRendered: boolean,
  setFirstTimeRendered: (firstTimeRendered: boolean) => void
}>(set => ({
  firstTimeRendered: true,
  setFirstTimeRendered: (firstTimeRendered) => set({ firstTimeRendered }),
}));