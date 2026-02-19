"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

interface Skill {
    id: number;
    name: string;
    designation: string;
    image: string;
}

function skillBar(skillLevel: number, animate: boolean) {
    let color = '';
    const widthPercent = skillLevel * 10;
    const skillDuration = 1.5 * skillLevel / 10;
    if (skillLevel < 0 || skillLevel > 10) {
        throw new Error("Skill level must be between 0 and 10");
    } else if (skillLevel < 2) {
        color = `bg-orange-400`;
    } else if (skillLevel < 4) {
        color = `bg-yellow-400`;
    } else if (skillLevel < 6) {
        color = `bg-lime-400`;
    } else if (skillLevel < 8) {
        color = `bg-green-400`;
    } else if (skillLevel < 10) {
        color = `bg-teal-400`;
    } else {
        color = `bg-cyan-400`;
    }

    return (
        <div className="w-full h-4 rounded-full overflow-hidden border-2 border-zinc-200">
            <motion.div
                className={`${color} h-full rounded-full`}
                style={{ width: `${widthPercent}%` }}
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={animate ? { clipPath: 'inset(0 0 0 0)' } : {}}
                transition={{ duration: skillDuration, ease: "linear" }}
            />
        </div>
    );
}

function skillLevelName(skillLevel: number) {
    if (skillLevel < 2) {
        return "Novice";
    } else if (skillLevel < 4) {
        return "Apprentice";
    } else if (skillLevel < 6) {
        return "Proficient";
    } else if (skillLevel < 8) {
        return "Skilled";
    } else if (skillLevel < 10) {
        return "Mastery";
    } else {
        return "Expert";
    }
}

export default function SkillCategory() {
    const [animate, setAnimate] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    if (isInView && !animate) {
        setAnimate(true);
    }

    return (
        <div className='h-full columns-2xs 2k:columns-sm ultrawide:columns-md 4k:columns-lg' ref={ref}>
            {skillArray.map((skills, index) => (
                <div className="border-[6px] border-zinc-300 rounded-2xl mb-4" key={uuidv4()} style={{ breakInside: "avoid" }}>
                    <h1 className="text-3xl font-bold text-black text-center my-6">{skillNames[index]}</h1>
                    {skills.map((skill) => (
                        <div key={skill.id} className="h-12 m-4 rounded-lg flex flex-row">
                            <div className='flex justify-center items-center w-14 h-full rounded-lg overflow-hidden border-2 border-zinc-200 bg-white'>
                                <div className='relative w-full h-full'>
                                    <Image 
                                    src={`/skillLogos/${skill.image}`} 
                                    alt={skill.name} 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  
                                    style={{ objectFit: 'contain' }} />
                                </div>
                            </div>
                            <div className='w-full h-full flex flex-col justify-between ps-2'>
                                <div className='w-full flex flex-row justify-between'>
                                    <h1 className="text-black font-bold text-md">{skill.name}</h1>
                                    <h1 className="text-black font-bold">{skillLevelName(skill.level)}</h1>
                                </div>
                                {skillBar(skill.level, isInView)}

                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}



const programming = [
    {
    id: 1,
    name: "Python",
    level: 9,
    image: "python.png",
  },
  {
    id: 6,
    name: "Matlab",
    level: 8,
    image: "matlab.png",
  },
  {
    id: 7,
    name: "Maple",
    level: 8,
    image: "maple.png",
  },
  {
    id: 9,
    name: "Gurobi",
    level: 8,
    image: "gurobi.png",
  },
  {
    id: 10,
    name: "Git",
    level: 8,
    image: "git.webp",
  },
  {
    id: 5,
    name: "RStudio",
    level: 8,
    image: "rstudio-2048x2048.png",
  },


  {
    id: 2,
    name: "Java",
    level: 4,
    image: "java.png",
  },
  {
    id: 8,
    name: "SQL",
    level: 4,
    image: "sql.jpg",
  },
  {
    id: 3,
    name: "C++",
    level: 3,
    image: "cpp.svg",
  },
  {
    id: 4,
    name: "JavaScript",
    level: 3,
    image: "javascript.png",
  },
];

const CAD = [
    {
        id: 1,
        name: "Solidworks",
        level: 5,
        image: "solidworks.png",
    },

      {
        id: 2,
        name: "AutoCAD",
        level: 5,
        image: "autocad.png",
    },
    
      {
        id: 3,
        name: "NX",
        level: 5,
        image: "nx.png",
    },

      {
        id: 4,
        name: "ParaView",
        level: 5,
        image: "paraview.jpg",
    },

      {
        id: 5,
        name: "PC SCHEMATIC",
        level: 5,
        image: "pcschematic.png",
    },
    
   
];

const Software = [
    {
        id: 1,
        name: "Simulink",
        level: 8,
        image: "Simulink.png",
    },

    {
        id: 6,
        name: "Excel",
        level: 8,
        image: "excel.svg",
    },

    {
        id: 7,
        name: "PowerPoint",
        level: 8,
        image: "powerpoint.svg",
    },

      {
        id: 2,
        name: "dSpace",
        level: 6,
        image: "dSpace.png",
    },
    
      {
        id: 3,
        name: "ASHES",
        level: 8,
        image: "ASHES.jpg",
    },
   
];

const Hardware = [
    {
        id: 1,
        name: "MicroLabBox",
        level: 8,
        image: "MicroLabBox.png",
    },

      {
        id: 2,
        name: "Arduino",
        level: 6,
        image: "Arduino.png",
    },
    
      {
        id: 3,
        name: "Power Electronics",
        level: 5,
        image: "Power Electronics.png",
    },

      {
        id: 4,
        name: "DAQ",
        level: 5,
        image: "daq.jpg",
    },  
   
];

const development = [
    {
        id: 1,
        name: "HTML",
        level: 5,
        image: "html.svg",
    },
    {
        id: 2,
        name: "CSS",
        level: 4,
        image: "css.svg",
    },
    {
        id: 3,
        name: "Tailwind",
        level: 4,
        image: "tailwind.png",
    },
    {
        id: 4,
        name: "Next.js",
        level: 4,
        image: "nextjs.webp",
    },
    {
        id: 5,
        name: "React.js",
        level: 4,
        image: "react.png",
    },

     {
    id: 5,
    name: "Power BI",
    level: 2,
    image: "powerbi.jpg",
  },
   
];

const skillArray = [programming, CAD, Software, Hardware, development];
const skillNames = ["Programming", "CAD",  "Software", "Hardware",  "Development"];