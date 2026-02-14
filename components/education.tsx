import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface Education {
  key: number;
  img: string;
  title: string;
  subtitle: string;
  year: string;
  location?: string;
  description: string;
  GPA: string;
}

interface CardProps {
  education: Education;
  delay: number;
  onClick: (position: { x: number; y: number; width: number; height: number }) => void;
}


const Card: React.FC<CardProps> = ({ education, delay, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const parentRect = cardRef.current.parentElement?.getBoundingClientRect();
      if (parentRect) {
        onClick({
          x: rect.left - parentRect.left,
          y: rect.top - parentRect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    }
  };

  return (
    <div className="w-full h-[400px] overflow-hidden transform transition-transform duration-200 hover:scale-105" ref={cardRef} onClick={handleClick}>
      <motion.div
        className="relative flex justify-center items-center h-full rounded-2xl shadow-md border-[6px] border-zinc-300 cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 2, delay: delay }}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="absolute h-full w-full flex flex-col justify-center items-center"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 2, delay: delay }}
          style={{ perspective: 1000 }}
        >
          <div className='h-[60%] w-[80%] relative mb-8'>
            <Image
              src={`/experienceLogos/${education.img}`}
              alt="DTU logo"
              fill style={{ objectFit: 'contain' }}
            />
          </div>

          <h1 className='absolute bottom-8 text-zinc-700 font-bold text-xl text-center'>{education.subtitle}</h1>

        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FlippingCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [chosenEducation, setChosenEducation] = useState<Education | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const delay_time = 0.4;

  const handleCardClick = (education: Education, position: { x: number; y: number; width: number; height: number }) => {
    setChosenEducation(education);
    setPopupPosition(position);
  };

  return (
    <div className='w-full h-full grid grid-cols-3 gap-8 relative'>
      <Card
        education={education_data[0]}
        delay={isFlipped ? delay_time : delay_time * 3}
        onClick={(position) => handleCardClick(education_data[0], position)}
      />
      <Card
        education={education_data[1]}
        delay={isFlipped ? delay_time * 2 : delay_time * 2}
        onClick={(position) => handleCardClick(education_data[1], position)}
      />
      <Card
        education={education_data[2]}
        delay={isFlipped ? delay_time * 3 : delay_time}
        onClick={(position) => handleCardClick(education_data[2], position)}
      />

      <AnimatePresence>
        {chosenEducation && popupPosition && (
          <motion.div
            className="bg-zinc-50 rounded-2xl border-zinc-500 border-4 overflow-hidden absolute"
            initial={{ left: popupPosition.x, top: popupPosition.y, width: popupPosition.width, height: popupPosition.height }}
            animate={{ width: '900px', height: '500px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            exit={{ left: popupPosition.x, top: popupPosition.y, width: popupPosition.width, height: popupPosition.height, transform: 'translate(0%, 0%)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full h-full absolute z-50 flex flex-col"
              initial={{ opacity: 0, scale: 0.7, }}
              animate={{ opacity: 1, scale: 1, }}
              exit={{ opacity: 0, scale: 0.7, }}
              transition={{ duration: 0.3 }}
            >

              <div className="p-8 flex flex-row w-full">
                <div className='flex flex-col items-start w-2/3'>
                  <h1 className='text-black font-bold text-3xl'>{chosenEducation.title}</h1>
                  <h2 className='text-red-600 font-bold text-xl opacity-80 mt-2'>{chosenEducation.subtitle}</h2>
                </div>
                <div className='flex flex-col w-1/3 items-end'>
                  <h1 className='text-black font-bold text-3xl opacity-80'>{chosenEducation.year}</h1>
                  <h2 className='text-black font-bold text-[20px] opacity-60 mt-2'>{chosenEducation.location}</h2>
                </div>
              </div>

              <div className='w-full h-full flex flex-row px-8 pb-8'>

                <div className='w-full h-full relative'>
                  <p className='text-zinc-800 font-bold text-lg'>{chosenEducation.description}</p>

                  <div className='absolute bottom-0 left-0 flex flex-col'>
                    <h3 className='text-zinc-600 font-semibold text-sm mb-1'>Academic Performance</h3>
                    <p className='text-zinc-800 font-bold text-2xl'>GPA: {chosenEducation.GPA}</p>
                  </div>
                </div>

                <div className='w-[350px] h-full rounded-xl flex justify-center items-center p-6 ms-8 bg-white border-4 border-zinc-300'>
                  <div className='relative w-full h-full'>
                    <Image src={`/experienceLogos/${chosenEducation.img}`} alt="education" fill style={{ objectFit: "contain" }} />
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {chosenEducation && popupPosition && (
          <div className='w-screen h-screen z-40 opacity-0 bg-purple-200 absolute cursor-default'
            style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
            onClick={() => setChosenEducation(null)}>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const education_data = [
  {
    key: 0,
    img: "boag.jpg",
    title: "Borupgaard Gymnasium",
    subtitle: "STX - Math A | Physics A | Chemistry B",
    year: "2016-2019",
    location: "Ballerup, Denmark",
    description: "During my time in gymnasium I focused on the natural sciences, as those were my favourite subjects. I also got a general foundation through a broad range of subjects like history, social science, religion, philosophy and more. I graduated with a high GPA, resulting from my dedication to my studies and my passion for learning, despite not needing a high GPA for my further education plans.",
    GPA: "10.6",
  },
  {
    key: 1,
    img: "dtu.png",
    title: "Technical University of Denmark",
    subtitle: "B.Sc. Design of Sustainable Energy Systems",
    year: "2021-2025",
    location: "Kongens Lyngby, Denmark",
    description: "Following my graduation project (SRP) in Gymnasium, where I collaborated with DTU on a PV Solar project, I was hooked on studying Energy technologies at DTU. The BSc program consists of many mandatory courses to get a broad multidisciplinary foundation. Therefore, and because I like to get a deep understanding of things, I chose to prioritize courses related to wind energy. I also prioritized my elite sport career and made time for a student job to invest in future job opportunities, by prolonging my studies by half a year.",
    GPA: "10.3",
  },
  {
    key: 2,
    img: "dtu.png",
    title: "Technical University of Denmark",
    subtitle: "M.Sc. Wind Energy",
    year: "2025-2027",
    location: "Kongens Lyngby, Denmark",
    description: "I am still studying for my masters degree. I have chosen courses in the electrical, mechanical and aerodynamic fields, as those interest me the most. Current courses include Aerotechnology, Electrical Drivetrains, Aeroelasticity, Aerodynamics, Scientific Programming, and Measurement Technology.  I also prioritized my elite sport career and made time for a student job to invest in future job opportunities, by prolonging my studies by half a year.",
    GPA: "10.0",
  },
];