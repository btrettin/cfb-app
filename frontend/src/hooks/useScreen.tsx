import { useState, useEffect } from 'react';

export const useScreen = () => {
  const [width, setWidth] = useState(window.screen.width);

  useEffect(() => {
    const handleResize = () => setWidth(window.screen.width);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { width: width - 300 };
};

export default useScreen;
