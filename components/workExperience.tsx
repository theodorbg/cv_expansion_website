import React from 'react';

import { DateTime } from 'luxon';

import { useWorkExperience } from '@/store/workExperience';
import { motion } from 'framer-motion';
import { useState } from 'react';

const now = DateTime.now();
const present = now.toFormat('yyyy-MM-dd');

const yearSpacing = 2;
const monthSpacing = 2;
const totalDuration = 4;

export default function WorkExperience() {

    /*
    const [selected, setSelected] = useState<Card | null>(null);
    const [lastSelected, setLastSelected] = useState<Card | null>(null);

    const handleClick = (card: Card) => {
        setLastSelected(selected);
        setSelected(card);
      };
    
      const handleOutsideClick = () => {
        setLastSelected(selected);
        setSelected(null);
      };
    */

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const experienceData = useWorkExperience((state) => state.experience);
    console.log(experienceData);

    function calculateMonthDifference(startDate: string, endDate: string): number {
        const start = DateTime.fromISO(startDate);
        const end = DateTime.fromISO(endDate);

        const diffInMonths = end.diff(start, 'months').months;
        const roundedMonths = Math.round(diffInMonths);

        return roundedMonths;
    }

    const earliestDate = useWorkExperience((state) => state.earliestDate);
    const timeSinceEarliest = useWorkExperience((state) => state.timeSinceEarliest);
    const monthsToYearEnd = useWorkExperience((state) => state.monthsToYearEnd);
    const verticalYearLines = [];

    for (let i = 0; i < Math.ceil(timeSinceEarliest / 12 / yearSpacing); i++) {
        verticalYearLines.push({
            position: monthsToYearEnd / timeSinceEarliest * 100 + i * (12 * yearSpacing) / timeSinceEarliest * 100,
            year: DateTime.fromISO(earliestDate).year + i * yearSpacing + 1
        }
        );
    }

    const verticalMonthLines = [];
    for (let i = 0; i < timeSinceEarliest / monthSpacing; i++) {
        verticalMonthLines.push(
            i * monthSpacing / timeSinceEarliest * 100,
        );
    }
    verticalMonthLines.push(100);

    const dateToPosition = (date: any): number => {
        if (date === 'present') {
            date = now
        }
        const diff = calculateMonthDifference(earliestDate, date);
        return diff / timeSinceEarliest * 100;
    }

    console.log(verticalYearLines);
    return (
        <div className='w-full h-full flex flex-row'>
            <div className="relative w-full h-auto">
                {verticalYearLines.map((line) => (
                    <div key={line.year} className="absolute bottom-0 top-0 w-[5px] flex justify-center" style={{ left: `${line.position}%` }}>
                        <h1 className="text-4xl text-white">{line.year}</h1>
                        <div className="absolute bottom-0 top-14 w-full bg-white flex justify-center"></div>
                    </div>
                ))}
                {verticalMonthLines.map((line) => (
                    <div key={line} className="absolute bottom-0 top-14 w-[1px] bg-white opacity-40" style={{ left: `${line}%` }}></div>
                ))}

                <div className="absolute bottom-0 top-14 w-full h-auto flex flex-col space-y-6 mt-3">
                    {experienceData.map((exp) => (
                        <motion.div
                            onMouseEnter={() => {
                                console.log(`Hovered over item with id: ${exp.id}`);
                                setHoveredIndex(exp.id);
                            }}
                            onMouseLeave={() => {
                                console.log(`Mouse left item with id: ${exp.id}`);
                                setHoveredIndex(null);
                            }}

                            className="relative h-12 rounded-full flex flex-row items-center ps-1 bg-gradient-to-r from-emerald-400 to-cyan-400"
                            style={{ left: `${dateToPosition(exp.time[0])}%`, width: `${dateToPosition(exp.time[1]) - dateToPosition(exp.time[0])}%` }}
                            key={exp.id}
                            initial={{ clipPath: 'inset(0 100% 0 0)' }}
                            whileInView={{
                                clipPath: 'inset(0 0 0 0)',
                                transition: { duration: (dateToPosition(exp.time[1]) - dateToPosition(exp.time[0])) * totalDuration / 100, delay: dateToPosition(exp.time[0]) * totalDuration / 100, ease: "linear" }
                            }}
                        >

                            <div className='bg-white rounded-full overflow-hidden'>
                                <img src={`/experienceLogos/${exp.image}`} className="h-10 w-10" />
                            </div>

                            <h1 className="text-white ps-2">{exp.name}</h1>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}




