
import React, { useRef, useEffect } from 'react';

const AsciiCityWalk: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const fontSize = 14;
    const font = `bold ${fontSize}px monospace`;
    const charWidth = fontSize * 0.6;

    // --- Assets ---

    // Side-scrolling walking cycle (Walking Right)
    // 0: Contact (Right leg fwd) - Low
    // 1: Passing (Right leg planted) - High
    // 2: Contact (Left leg fwd) - Low
    // 3: Passing (Left leg planted) - High
    const walkerFrames = [
      [
        "   O   ", 
        "  /|\\ ", // Left arm back, Right arm fwd
        "  / \\  "  // Legs stride
      ],
      [
        "   O   ",
        "  /|\\  ", // Right arm back, Left arm fwd
        "  / \\  "
      ],
      [
        "   O   ",
        "  /|\\  ", // Right arm back, Left arm fwd
        "  / \\  "
      ],
      [
        "   O   ",
        "   |   ", // Arms at side
        "   |   "  // Legs together (passing)
      ],[
        "   O   ",
        "   |   ", // Arms at side
        "   |   "  // Legs together (passing)
      ],
      [
        "   O   ",
        "   |   ", // Arms at side
        "   |   "  // Legs together (passing)
      ],

    ];

    const buildingTextures = [
      ['[]', '[]', '[]'],
      ['**', '**', '**'],
      ['##', '##', '##'],
      ['||', '||', '||'],
      ['++', '++', '++'],
    ];

    // --- State ---

    let frame = 0;
    let cols = 0;
    let rows = 0;

    interface Building {
      x: number;
      w: number;
      h: number;
      textureIndex: number;
      hasSign: boolean;
      signText?: string;
    }

    let buildings: Building[] = [];
    let clouds: { x: number, y: number, speed: number, shape: string }[] = [];
    
    const signPool = ["PDEU", "Origin Medical", "Columbia", "TransRe"];

    // --- Logic ---

    const initWorld = () => {
      buildings = [];
      let currentX = 0;
      
      // Fill screen + buffer
      while (currentX < cols + 20) {
        const w = 6 + 2 * Math.floor(Math.random() * 3);
        const gap = 3 + Math.floor(Math.random() * 4);
        const h = 10 + Math.floor(Math.random() * 15);
        
        buildings.push({
          x: currentX,
          w: w,
          h: h,
          textureIndex: Math.floor(Math.random() * buildingTextures.length),
          hasSign: Math.random() > 0.65,
          signText: signPool[Math.floor(Math.random() * signPool.length)]
        });
        
        currentX += w + gap;
      }
      
      // Init Clouds
      clouds = [];
      for(let i=0; i<5; i++) {
        clouds.push({
          x: Math.random() * cols,
          y: Math.random() * (rows / 2),
          speed: 0.05 + Math.random() * 0.1,
          shape: Math.random() > 0.5 ? "  (~~)  " : " (~~~~) "
        });
      }
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.ceil(width / charWidth);
      rows = Math.ceil(height / fontSize);
      initWorld();
    };

    const update = () => {
      // Scroll Speed
      const speed = 0.07; 
      
      // Update Buildings
      for (let b of buildings) {
        b.x -= speed;
      }
      
      // Remove off-screen buildings and add new ones
      if (buildings.length > 0 && buildings[0].x + buildings[0].w < -5) {
        buildings.shift();
        
        // Add new building at the end
        const lastB = buildings[buildings.length - 1];
        const gap = 3 + Math.floor(Math.random() * 4);
        const startX = lastB.x + lastB.w + gap;
        
        const w = 6 + 2 * Math.floor(Math.random() * 3);
        const h = 10 + Math.floor(Math.random() * 15);
        
        buildings.push({
          x: startX,
          w: w,
          h: h,
          textureIndex: Math.floor(Math.random() * buildingTextures.length),
          hasSign: Math.random() > 0.65,
          signText: signPool[Math.floor(Math.random() * signPool.length)]
        });
      }

      // Update Clouds
      clouds.forEach(c => {
        c.x -= c.speed;
        if (c.x < -10) c.x = cols + 5;
      });
    };

    const draw = () => {
      // Detect Theme
      const isDark = document.documentElement.classList.contains('dark');

      // Clear Background (Transparent)
      ctx.clearRect(0, 0, width, height);

      // Matches AsciiFace gradient: from-primary via-secondary to-accent
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#619e81');   // Primary
      gradient.addColorStop(0.5, '#666b99'); // Secondary
      gradient.addColorStop(1, '#d64e29');   // Accent
      
      // Contrast Color for Walker and Signs
      // Eggshell 50 (#f9f7ec) for Dark Mode
      // Twilight Indigo 900 (#14151f) for Light Mode
      const inkColor = isDark ? '#f9f7ec' : '#14151f';

      ctx.fillStyle = gradient;
      ctx.font = font;
      ctx.textBaseline = 'top';

      // 1. Draw Sun/Moon
      const celestialChar = isDark ? " .--. " : " \\|/ ";
      const celestialBody = isDark ? "(    )" : "--O--";
      const celestialEnd = isDark ? " `--' " : " /|\\ ";
      
      ctx.fillText(celestialChar, (cols - 10) * charWidth, 2 * fontSize);
      ctx.fillText(celestialBody, (cols - 10) * charWidth, 3 * fontSize);
      ctx.fillText(celestialEnd, (cols - 10) * charWidth, 4 * fontSize);

      // 2. Draw Clouds
      ctx.globalAlpha = 0.3; // Uniform transparency for clouds
      clouds.forEach(c => {
        ctx.fillText(c.shape, c.x * charWidth, c.y * fontSize);
      });
      ctx.globalAlpha = 1.0;

      // 3. Draw Buildings
      buildings.forEach(b => {
        const buildingBottom = rows - 2; // Floor level
        const buildingTop = buildingBottom - b.h;
        
        // Reset to gradient for building structure
        ctx.fillStyle = gradient;

        // Draw Roof
        ctx.fillText(" ".repeat(b.w), b.x * charWidth, (buildingTop - 1) * fontSize);
        ctx.fillText("_".repeat(b.w), b.x * charWidth, (buildingTop - 1) * fontSize);

        // Draw Body
        for (let y = 0; y < b.h; y++) {
          const currentRow = buildingTop + y;
          // Simple texture tiling
          const texture = b.textureIndex;
          const rowStr = Array(Math.ceil(b.w )).fill(buildingTextures[texture][0]).join('').slice(0, b.w);
          
          // Leave space for door at bottom center
          let finalStr = rowStr;
          if (y > b.h - 4) { // Bottom 3 rows
             const mid = Math.floor(finalStr.length/2)-1;
             // Door frame
             const chars = finalStr.split('');
            //  if (mid >= 0 && mid < chars.length) chars[mid] = (y === b.h-4) ? '^' : '|';
            //  if (mid+1 < chars.length) chars[mid+1] = (y === b.h-4) ? '^' : '|';
            chars[mid-1]='|' ;
             chars[mid+2]='|' ;
             chars[mid]=' ' ;
             chars[mid+1]=' ' ;
             finalStr = chars.join('');
          }

          ctx.fillText(finalStr, b.x * charWidth, currentRow * fontSize);
        }

        // Sign - Use contrast color
        if (b.hasSign && b.signText) {
           // Move sign above the building (floating)
           const signY = buildingTop - 3;
           
           // Center the sign text relative to the building width
           const fullText = `[${b.signText}]`;
           const textLen = fullText.length;
           const centerOffset = Math.floor((b.w - textLen) / 2);
           const signX = b.x + centerOffset;

           ctx.fillStyle = inkColor;
           ctx.fillText(fullText, signX * charWidth, signY * fontSize);
           ctx.fillStyle = gradient; // Reset
        }
      });

      // 4. Draw Floor
      ctx.fillStyle = gradient;
      const floorY = (rows - 2) * fontSize;
      ctx.fillText("=".repeat(cols), 0, floorY);
      // Street markings
      for(let c=0; c<cols; c+=8) {
         const offset = -(frame * 0.25) % 8; // Move with scroll
         const x = c + offset;
         if(x > 0 && x < cols) ctx.fillText("--", x * charWidth, floorY + fontSize);
      }

      // 5. Draw Walker (Centered) - Use contrast color
      ctx.fillStyle = inkColor;

      const walkerX = Math.floor(cols / 2) - 2;
      const walkerY = rows - 5; // Just above floor

      // Animate legs: 0, 1, 2, 3
      const animationSpeed = 10; // Lower is faster
      const walkCycleIndex = Math.floor(frame/animationSpeed) % 6; 
      const currentFrame = walkerFrames[walkCycleIndex];

      // Physics Bobbing: Up on passing frames (1, 3), Down on stride frames (0, 2)
      const bob = (walkCycleIndex % 2 === 1) ? -2 : 0;
      
      currentFrame.forEach((line, i) => {
         ctx.fillText(line, walkerX * charWidth, (walkerY + i) * fontSize + bob);
      });
    };

    const loop = () => {
      frame++;
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative transition-colors duration-500">
       {/* Glow Effect - Adaptive */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent blur-[50px] pointer-events-none"></div>
       
       <div ref={containerRef} className="w-full h-full relative z-10">
          <canvas ref={canvasRef} className="block" />
       </div>
    </div>
  );
};

export default AsciiCityWalk;
