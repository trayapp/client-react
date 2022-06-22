import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();
  const [scroll, setScroll] = useState(false);
  const previousLocation = localStorage.getItem("prev");
  useEffect(() => {
    if (previousLocation && previousLocation !== undefined) {
      if (previousLocation !== window.location) {
        setScroll(true);
        localStorage.setItem("prev", window.location);
      }
    } else {
      localStorage.setItem("prev", window.location);
    }
    if (scroll) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, previousLocation, scroll]);

  return children;
};

export default ScrollToTop;
