import { useEffect, useRef, useState } from "react";

type UseSectionRevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

const useSectionReveal = <T extends HTMLElement = HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
}: UseSectionRevealOptions = {}) => {
  const elementRef = useRef<T>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return {
    elementRef,
    isVisible,
  };
};

export default useSectionReveal;
