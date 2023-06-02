import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

// const getMobileDetect = (userAgent: NavigatorID['userAgent']) => {
//   const isAndroid = () => Boolean(userAgent.match(/Android/i))
//   const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
//   const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
//   const isWindows = () => Boolean(userAgent.match(/IEMobile/i))
//   const isSSR = () => Boolean(userAgent.match(/SSR/i))
//   const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows())
//   const isDesktop = () => Boolean(!isMobile() && !isSSR())
//   return {
//     isMobile,
//     isDesktop,
//     isAndroid,
//     isIos,
//     isSSR,
//   }
// }
const useDeviceDetect = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const defineMobileScreen = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
    };

    defineMobileScreen();

    window.addEventListener("resize", debounce(defineMobileScreen, 200));
  }, []);
  return {
    isMobileView,
  }
}

export default useDeviceDetect