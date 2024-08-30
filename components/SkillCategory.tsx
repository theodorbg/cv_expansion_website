import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedTooltip } from "./ui/animated-tooltip";

import AnimatedSmallHeadline from "./AnimatedSmallHeadline.tsx";

const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', duration: 1.25, delay:0 } },
  };

const renderSkillCategory = (title, items) => {
    return (
        <motion.div
        className="flex flex-col items-center -mt-14"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
      >
        <AnimatedSmallHeadline title={title} />
        <div className="flex flex-row items-center justify-center mb-6 w-full">
          <AnimatedTooltip items={items} />
        </div>
      </motion.div>
    );
  };

export default function SkillCategory() {
    return (
        <div className="grid grid-cols-2 ">
                {renderSkillCategory("Programming", programming)}
                {renderSkillCategory("General software", general)}
                {renderSkillCategory("Back-end", backEnd)}
                {renderSkillCategory("CAD-FEA-CFD", CAD)}
                {renderSkillCategory("Front-end", frontEnd)}
                {renderSkillCategory("3D-print", print)}
        </div>
    );
}



const programming = [
    {
        id: 1,
        name: "Python",
        designation: "",
        image:
            "../SkillLogos/python.png",
    },
    {
        id: 2,
        name: "Java",
        designation: "",
        image:
            "../SkillLogos/java.png",
    },
    {
        id: 3,
        name: "C++",
        designation: "",
        image:
            "../SkillLogos/cpp.png",
    },
    {
        id: 4,
        name: "JavaScript",
        designation: "",
        image:
            "../SkillLogos/javascript.png",
    },
    {
        id: 5,
        name: "TypeScript",
        designation: "",
        image:
            "../SkillLogos/typescipt.webp",
    },
    {
        id: 6,
        name: "Matlab",
        designation: "",
        image:
            "../SkillLogos/matlab.png",
    },
    {
        id: 7,
        name: "Maple",
        designation: "",
        image:
            "../SkillLogos/maple.png",
    },
];


const backEnd = [
    {
        id: 1,
        name: "SQL",
        designation: "",
        image:
            "../SkillLogos/sql.jpg",
    },
    {
        id: 2,
        name: "postgresql",
        designation: "",
        image:
            "../SkillLogos/postgres.png",
    },
    {
        id: 3,
        name: "Databricks",
        designation: "",
        image:
            "../SkillLogos/databricks.png",
    },
    {
        id: 4,
        name: "Palantir",
        designation: "",
        image:
            "../SkillLogos/palantir.png",
    },
    {
        id: 5,
        name: "Git",
        designation: "",
        image:
            "../SkillLogos/git.webp",
    },
];

const frontEnd = [
    {
        id: 1,
        name: "HTML",
        designation: "",
        image:
            "../SkillLogos/html.jpg",
    },
    {
        id: 2,
        name: "CSS",
        designation: "",
        image:
            "../SkillLogos/css.jpg",
    },
    {
        id: 3,
        name: "Tailwind",
        designation: "",
        image:
            "../SkillLogos/tailwind.png",
    },
    {
        id: 4,
        name: "Next.js",
        designation: "",
        image:
            "../SkillLogos/nextjs.webp",
    },
    {
        id: 5,
        name: "React.js",
        designation: "",
        image:
            "../SkillLogos/react.png",
    },
    {
        id: 6,
        name: "Power BI",
        designation: "",
        image:
            "../SkillLogos/powerbi.jpg",
    },
];



const general = [
    {
        id: 1,
        name: "Word",
        designation: "",
        image:
            "../SkillLogos/word.png",
    },
    {
        id: 2,
        name: "Excel",
        designation: "",
        image:
            "../SkillLogos/excel.png",
    },
    {
        id: 3,
        name: "PowerPoint",
        designation: "",
        image:
            "../SkillLogos/powerpoint.jpg",
    },
    {
        id: 4,
        name: "Photoshop",
        designation: "",
        image:
            "../SkillLogos/photoshop.png",
    },
    {
        id: 5,
        name: "Premiere Pro",
        designation: "",
        image:
            "../SkillLogos/premier.png",
    },
];

const CAD = [
    {
        id: 1,
        name: "Solidworks",
        designation: "",
        image:
            "../SkillLogos/solidworks.png",
    },
    {
        id: 2,
        name: "Autodesk Inventor",
        designation: "",
        image:
            "../SkillLogos/inventor.png",
    },
    {
        id: 3,
        name: "Creo",
        designation: "",
        image:
            "../SkillLogos/creo.svg",
    },
    {
        id: 4,
        name: "OpenSCAD",
        designation: "",
        image:
            "../SkillLogos/openscad.png",
    },
    {
        id: 5,
        name: "StarCCM+",
        designation: "",
        image:
            "../SkillLogos/starccm.png",
    },
    {
        id: 6,
        name: "Ansys",
        designation: "",
        image:
            "../SkillLogos/ansys.png",
    },
];


const print = [
    {
        id: 1,
        name: "Cura",
        designation: "",
        image:
            "../SkillLogos/cura.png",
    },
    {
        id: 2,
        name: "Bambu lab",
        designation: "",
        image:
            "../SkillLogos/bambulab.webp",
    },
    {
        id: 3,
        name: "Prusa slicer",
        designation: "",
        image:
            "../SkillLogos/prusa.png",
    },
    {
        id: 4,
        name: "Orca slicer",
        designation: "",
        image:
            "../SkillLogos/orca.png",
    },
    {
        id: 5,
        name: "Autodesk Netfabb",
        designation: "",
        image:
            "../SkillLogos/netfabb.jpg",
    },
];