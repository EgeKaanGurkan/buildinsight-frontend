'use client';

import { useEffect, useState } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const BreakpointIndicator = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('');
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      let breakpoint = 'xs';
      
      if (width >= breakpoints['2xl']) breakpoint = '2xl';
      else if (width >= breakpoints.xl) breakpoint = 'xl';
      else if (width >= breakpoints.lg) breakpoint = 'lg';
      else if (width >= breakpoints.md) breakpoint = 'md';
      else if (width >= breakpoints.sm) breakpoint = 'sm';

      setCurrentBreakpoint(breakpoint);
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  if (typeof window === 'undefined' || !window.location.hostname.includes('localhost')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-mono z-50">
      {currentBreakpoint} ({screenWidth}px)
    </div>
  );
}; 