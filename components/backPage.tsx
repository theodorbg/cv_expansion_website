import React from 'react';
import { useState, useEffect } from 'react';

import { MapPin, Mail, BrandGithub, BrandLinkedin, Books } from 'tabler-icons-react';


interface iconItem {
  icon: React.ReactNode,
  text: string,
  href?: string,
}
const iconsize = 24;
const iconContainerSize = 32;

const iconItems: iconItem[] = [
  { icon: <MapPin size={iconsize} />, text: 'Copenhagen, Denmark', href: 'https://maps.app.goo.gl/Sy4UewkYC8GePGfPA' },
  { icon: <Mail size={iconsize} />, text: 'Marc.clausen00@gmail.com', href: 'mailto:Marc.clausen00@gmail.com' },
  { icon: <BrandGithub size={iconsize} />, text: 'Github.com/Marcowich0', href: 'https://github.com/Marcowich0' },
  { icon: <BrandLinkedin size={iconsize} />, text: 'Linkedin.com/in/marc-clausen/', href: 'https://www.linkedin.com/in/marc-clausen/' },
  { icon: <Books size={iconsize} />, text: 'Goodreads.com/user/show/156322902-marc', href: 'https://www.goodreads.com/user/show/156322902-marc' }
]



interface BackPageProps {
  elementHeight: number;
}



export default function BackPage({ elementHeight }: BackPageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-screen h-[250px] bg-slate-500 z-[60] fixed flex flex-row"
      style={{
        top: `${elementHeight - scrollY}px`,
        left: "0px",
        backgroundImage: `url("/mechanical_engineering.jpeg")`,
        backgroundSize: "cover", // Adjust as needed
        backgroundPosition: "center", // Adjust as needed
      }}>

      <div className='w-[600px] h-full p-4 flex flex-col justify-between'>
          {iconItems.map((item, index) => (
            <div key={index} className='flex flex-row items-center space-x-4'>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <div className='flex justify-center items-center rounded-xl transition duration-200 hover:bg-teal-600 cursor-pointer'
                  style={{ height: iconContainerSize, width: iconContainerSize }}
                >
                  {item.icon}
                </div>
              </a>
              {item.href ? (
                <a href={item.href} className="text-white text-lg font-bold transition duration-200 hover:text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  {item.text}
                </a>
              ) : (
                <h1 className="text-white text-2xl font-bold">{item.text}</h1>
              )}
            </div>
          ))}


      </div>

      <div className='w-[400px] h-full  p-4'>

      </div>


    </div>


  )
}