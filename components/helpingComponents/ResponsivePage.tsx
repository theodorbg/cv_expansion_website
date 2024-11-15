import React, { useState, useEffect } from 'react';

import { ReactNode } from 'react';

interface ResponsivePageProps {
  children: ReactNode;
}

const ResponsivePage = ({ children }: ResponsivePageProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1400);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center p-4">
        <p className="text-white text-center text-lg">
          I am working on adapting the site for mobile. In the meantime, please visit on a desktop or fullscreen your window.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ResponsivePage;