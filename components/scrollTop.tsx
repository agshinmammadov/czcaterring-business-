"use client"
import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    // Show scroll to top button after scrolling past 25% of screen height
    if (scrollTop > (windowHeight * 0.25)) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const handleScrollToTop = () => {
    // Scroll to top
    window.scrollTo(0, 0);
    setShowScrollToTop(false);
  };

  useEffect(() => {
    // Attach scroll event listener on mount
    window.addEventListener('scroll', handleScroll);

    // Remove scroll event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Your page content goes here */}
      <button
        onClick={handleScrollToTop}
        style={{ display: showScrollToTop ? 'block' : 'none' }}
      >
        Scroll to Top
      </button>
    </div>
  );
}
