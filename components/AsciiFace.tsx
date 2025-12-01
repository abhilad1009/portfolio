import React, { useEffect, useRef } from 'react';

const AsciiFace: React.FC = () => {
  const preRef = useRef<HTMLPreElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    // Configuration
    const cols = 80;
    const rows = 40;
    const charSet = " .:-=+*#%@"; // Brightness ramp

    // State
    let mouseX = 0;
    let mouseY = 0;

    // Handle mouse movement relative to window center
    const handleMouseMove = (e: MouseEvent) => {
      const rect = pre.getBoundingClientRect();
      // Normalize mouse -1 to 1
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      // Clamp
      mouseX = Math.max(-1.5, Math.min(1.5, mouseX));
      mouseY = Math.max(-1.5, Math.min(1.5, mouseY));
    };

    window.addEventListener('mousemove', handleMouseMove);

    // SDF primitives
    const circle = (x: number, y: number, cx: number, cy: number, r: number) => {
      const dx = x - cx;
      const dy = y - cy;
      return Math.sqrt(dx * dx + dy * dy) - r;
    };

    const render = (time: number) => {
      let output = "";

      // Animate subtle breathing
      const breath = Math.sin(time * 0.002) * 0.5;

      // Target look direction
      const lookX = mouseX * 15;
      const lookY = mouseY * 10;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Map grid to -50 to 50 coordinate space
          const u = (x / cols) * 100 - 50;
          const v = ((y / rows) * 100 - 50) * 0.55; // Aspect ratio correction

          // Face shape (Head)
          const headDist = circle(u, v, 0, 0, 28 + breath);
          
          // Eyes (moving based on mouse)
          const eyeLDist = circle(u, v, -12 + lookX * 0.3, -5 + lookY * 0.3, 5);
          const eyeRDist = circle(u, v, 12 + lookX * 0.3, -5 + lookY * 0.3, 5);
          
          // Pupils
          const pupilLDist = circle(u, v, -12 + lookX * 0.6, -5 + lookY * 0.6, 2);
          const pupilRDist = circle(u, v, 12 + lookX * 0.6, -5 + lookY * 0.6, 2);

          // Mouth
          const mouthYOffset = 10 + (mouseY * 2); 
          const mouthDist = Math.abs(circle(u, v, 0, -20, 30)) - 1.5;
          const mouthBox = v > mouthYOffset ? mouthDist : 100;

          let density = 0;
          
          if (headDist < 0) {
            // Inside head
            density = 0.4; 
            
            // Shading
            const lightX = -mouseX * 50;
            const lightY = -mouseY * 50;
            const distToLight = Math.sqrt((u - lightX)**2 + (v - lightY)**2);
            density += Math.max(0, (100 - distToLight) / 200);
            
            // Features
            if (eyeLDist < 0) density = 0.1; 
            if (eyeRDist < 0) density = 0.1;
            
            if (pupilLDist < 0) density = 0.9; 
            if (pupilRDist < 0) density = 0.9;

            if (mouthBox < 2 && v > 5) density = 0.8;
          } else {
             // Background noise
             const noise = (Math.sin(u * 0.5 + time * 0.001) + Math.cos(v * 0.5)) * 0.1;
             if (noise > 0.15) density = 0.05;
          }

          // Clamp density 0-1
          density = Math.max(0, Math.min(1, density));
          
          // Map to char
          const charIndex = Math.floor(density * (charSet.length - 1));
          output += charSet[charIndex];
        }
        output += "\n";
      }

      if (pre) pre.textContent = output;
      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden select-none transition-opacity duration-500">
      <pre 
        ref={preRef} 
        className="font-mono text-[8px] sm:text-[10px] md:text-xs leading-[8px] sm:leading-[10px] md:leading-[12px] whitespace-pre bg-clip-text text-transparent bg-gradient-to-br from-primary via-secondary to-accent"
      />
    </div>
  );
};

export default AsciiFace;