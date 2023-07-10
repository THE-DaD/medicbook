import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const ScreenSize ={
    phone: 1,
    tablet: 2,
    laptop: 3,
    computer: 4,
    predetermined: 5,
}

export default ScreenSize


export function getCSS(){
    const windowWidth = useWindowDimensions().width
    let currentScreenSize = ScreenSize.predetermined
    if(windowWidth < 480) currentScreenSize = ScreenSize.phone
    else if(windowWidth < 768) currentScreenSize = ScreenSize.tablet
    else if(windowWidth < 1025) currentScreenSize = ScreenSize.laptop
    else currentScreenSize = ScreenSize.computer
    return currentScreenSize
}

export function ScreenWidth(){
  return useWindowDimensions().width
}

export function ScreenHeight(){
  return useWindowDimensions().height
}



