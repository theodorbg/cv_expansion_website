import React from 'react';
import { motion } from 'framer-motion';

export default function MainHeadline() {
    return (
        <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ duration: 1, delay:0.5 }} className='me-16'>
            <div className="flex flex-col ">
            <h1 className="text-6xl 2xl:text-8xl font-bold mb-4">Marc Clausen</h1>
            <h2 className="text-4xl 2xl:text-6xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-600 to-purple-700">Mechanical Engineer</h2>
            <hr className="w-[100%] 2xl:w-[42rem] border-t-8 border-gray-100 my-8" />
            <p className="text-lg 2xl:text-xl max-w-2xl">
            Tinkering with tech and loving every minute of it. As a mechanical engineer, I'm all about designing and building cool stuff. Take a look at my portfolio and see what I've been up to. 
            </p>
        </div>
        </motion.div>
    );
}
