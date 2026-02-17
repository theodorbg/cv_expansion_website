import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useHobbies } from "@/store/hobbies";

export default function HobbyFrames() {
    const [selectedHobby, setSelectedHobby] = React.useState<{
        id: number;
        headline: string;
        content: string;
        thumbnail: string;
    } | null>(null);

    const hobbyInformation = useHobbies((state) => state.hobbies);

    return (
        <div className="w-full h-full relative">
            {/* Clean Grid Layout */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {hobbyInformation.map((hobby, index) => (
                    <motion.div
                        key={index}
                        className="aspect-square border-4 border-zinc-300 rounded-xl overflow-hidden cursor-pointer relative group"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedHobby(hobby)}
                    >
                        <Image 
                            src={`/hobbies/${hobby.thumbnail}`} 
                            alt={hobby.headline}
                            fill 
                            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw" 
                            style={{ objectFit: "cover" }} 
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                            <h1 className="relative text-lg md:text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 px-2 text-center">
                                {hobby.headline}
                            </h1>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Expanded Modal */}
            <AnimatePresence>
                {selectedHobby && (
                    <>
                        {/* Modal */}
                        <motion.div
                            className="fixed top-1/2 left-1/2 rounded-2xl overflow-hidden border-4 border-zinc-300 z-[70]"
                            style={{
                                width: window.innerWidth > 2400 ? "850px" : "600px",
                                height: window.innerHeight > 1300 ? "450px" : "300px",
                            }}
                            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                            exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image 
                                src={`/hobbies/${selectedHobby.thumbnail}`} 
                                alt={selectedHobby.headline}
                                fill 
                                sizes="850px"
                                style={{ objectFit: "cover" }} 
                            />
                            {/* Info panel */}
                            <motion.div
                                className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-70 text-white w-full"
                                initial={{ opacity: 0, y: "100%" }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: "100%" }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold">{selectedHobby.headline}</h2>
                                <p className="mt-2">{selectedHobby.content}</p>
                            </motion.div>
                        </motion.div>

                        {/* Background overlay to close */}
                        <motion.div
                            className="fixed inset-0 bg-black z-[60]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedHobby(null)}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
