
import React, { useEffect, useRef, useState } from 'react';

const CursorBlob: React.FC = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const blob = blobRef.current;
    const cursor = cursorRef.current;
    if (!blob || !cursor) return;

    // State for interpolation
    let mouseX = -100;
    let mouseY = -100;
    let blobX = -100;
    let blobY = -100;
    
    // Velocity for potential squash/stretch effects (optional, keeping simple for now)
    // let velX = 0;
    // let velY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instant update for the small cursor dot to prevent lag
      if (cursorRef.current) {
         cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target is interactive
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Animation Loop
    const animate = () => {
      // Linear interpolation (Lerp) for the blob to follow smoothly
      const speed = 0.15;
      const dx = mouseX - blobX;
      const dy = mouseY - blobY;
      
      blobX += dx * speed;
      blobY += dy * speed;

      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${blobX}px, ${blobY}px, 0) translate(-50%, -50%)`;
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  // Calculate scale based on state
  const getScale = () => {
    if (isClicked) return 'scale-75';
    if (isHovering) return 'scale-150';
    return 'scale-100';
  };

  return (
    <>
      {/* Main precise cursor (dot) */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference transition-opacity duration-300 hidden md:block ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className={`w-2.5 h-2.5 bg-white rounded-full transition-transform duration-200 ${isHovering ? 'scale-0' : 'scale-100'}`} />
      </div>
      
      {/* Trailing "Liquid" Blob */}
      <div 
        ref={blobRef}
        className={`fixed top-0 left-0 pointer-events-none z-[90] hidden md:block transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div 
          className={`
            relative w-12 h-12 
            rounded-full 
            transition-all duration-300 ease-out
            ${getScale()}
          `}
        >
          {/* Inner Gradient Blob with Morphing Shape */}
          <div className={`
            absolute inset-0 
            bg-gradient-to-tr from-primary/60 to-secondary/60 
            backdrop-blur-[1px]
            animate-morph
            rounded-full
            ${isHovering ? 'opacity-40 blur-sm' : 'opacity-80 blur-[2px]'}
            transition-all duration-300
          `}/>
          
          {/* Outer Glow */}
          <div className={`
            absolute inset-[-10px] 
            bg-gradient-to-tr from-primary to-secondary
            rounded-full blur-xl opacity-20
            animate-pulse-slow
            transition-opacity duration-300
            ${isHovering ? 'opacity-40' : 'opacity-20'}
          `} />
        </div>
      </div>
    </>
  );
};

export default CursorBlob;
