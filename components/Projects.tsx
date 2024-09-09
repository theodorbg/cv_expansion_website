import { PinContainer } from "@/components/ui/3d-pin";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useProjects } from "@/store/projects";

interface project {
  key: number,
  title: string,
  monthYear: string,
  imagePath: string,
  image: { path: string, args: string }[],
  description: string[],
  fullImagePath: string[],
}

const fadeInAnimation = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { duration: 1, delay: 0.3 } },
};


export default function Projects() {
  const [isClient, setisClient] = useState(false);
  useEffect(() => {
    setisClient(true);
  }, []);

  const [chosenProject, setChosenProject] = useState<project | null>(null);

  const projects = useProjects.getState().projects;
  console.log(projects);

  return (
    <div className="w-[72%] h-[68%] grid grid-cols-3 grid-rows-3 gap-4 mt-10 relative">
      {isClient && projects.map((project) => (
        <motion.div
          key={project.key}
          variants={fadeInAnimation}
          initial="initial"
          whileInView="whileInView"
          onClick={() => {
            console.log(project);
            setChosenProject(project);
          }}
        >
            <div className={`w-full h-full ${chosenProject === project ? 'opacity-30' : ''}`}>
              <img src={project.fullImagePath[0]} alt="project" className="w-full h-full rounded-2xl object-cover" />
            </div>

          {chosenProject !== null && (
            <motion.div
              className="w-[1400px] h-[700px] bg-zinc-800 rounded-2xl border-zinc-500 border-4 absolute z-[60]"
              style={{ top: "47%", left: "50%" }}
              initial={{ opacity: 0, scale: 0, x: '-50%', y: "-50%" }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <div className="flex flex-row items-end w-full h-full">

                <div className="w-1/2 h-full flex flex-col justify-between">
                  <h1 className="text-slate-200 text-4xl font-bold p-8">{chosenProject.title}</h1>
                  <div className="w-full h-full p-8 flex flex-col justify-between">
                    <div className="w-1 bg-green-400 absolute" style={{ top: "142px", left: "40px", height: "508px", transform: "translateX(-50%)" }} />
                    {chosenProject.description.map((desc, i) => (
                      <div className="flex flex-row items-center">
                        <div key={i} className="w-4 h-4 rounded-full bg-green-400 me-6 flex-shrink-0" />
                        <div key={i} className="text-slate-200 text-md font-bold">{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-1/2 h-full p-8">
                  <div className="w-full h-full grid grid-cols-6 grid-rows-4 gap-4">
                    {chosenProject.fullImagePath.map((img, j) => (
                      console.log(chosenProject.image[j].args),
                      <div key={j} className={`${chosenProject.image[j].args}`}>
                        <img src={img} alt="project" className="rounded-2xl w-full h-full object-cover" />
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>


      ))}

      {chosenProject !== null && (
        <div
          className="opacity-0 w-screen h-screen bg-purple-500 absolute z-[100]"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          onClick={() => {
            console.log('cleared selection');
            setChosenProject(null);
          }}
        />
      )}
    </div>
  );

}