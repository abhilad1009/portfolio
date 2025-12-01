
import React, { useRef, useEffect } from 'react';

const AsciiSkyline: React.FC = () => {
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

    // Config
    const fontSize = 12;
    const font = `bold ${fontSize}px monospace`;
    const charWidth = fontSize * 0.6;

    // State
    let cols = 0;
    let rows = 0;
    let frame = 0;
    let spawnTimer = 0;

    type BlockType = 'wall' | 'window';
    interface Block {
      char: string;
      type: BlockType;
      active: boolean; // light on/off
      colorOffset: number;
    }
    
    let grid: (Block | null)[][] = [];
    
    interface ColumnStyle {
      char: string;
      type: BlockType;
    }
    let columnStyles: ColumnStyle[] = [];

    interface Particle {
      x: number;      // Grid X for blocks, Pixel X for debris
      y: number;      // Pixel Y
      targetRow: number; // Grid Y destination (unused for debris)
      char: string;
      type: BlockType;
      speed: number;
      // Debris specific
      isDebris?: boolean;
      vx?: number;
      vy?: number;
      life?: number;
      color?: string; // specific color override for debris
    }

    let particles: Particle[] = [];

    // --- Logic ---

    const generateMap = (c: number) => {
       const styles: ColumnStyle[] = [];
       let x = 0;
       while(x < c) {
          // Building width 3-8
          const w = Math.floor(Math.random() * 6) + 3;
          const gap = Math.random() > 0.8 ? 1 : 0; // Occasional gap
          
          // Style
          const isWindowed = Math.random() > 0.4;
          const wallChar = ["##", "||", "%%", "++","II"][Math.floor(Math.random()*5)];
          const winChar = ["[ ]", "::", "[]", "::"][Math.floor(Math.random()*4)];

          for(let i=0; i<w; i++) {
             if(x+i >= c) break;
             // Edges are walls
             if(i===0 || i===w-1 || !isWindowed) {
                styles.push({ char: wallChar, type: 'wall' });
             } else {
                // Striped windows for coherence
                if(i%2!==0) styles.push({ char: winChar, type: 'window' });
                else styles.push({ char: wallChar, type: 'wall' });
             }
          }
          x += w;
          
          // Gap
          for(let j=0; j<gap; j++) {
             if(x < c) {
                 styles.push({ char: "  ", type: 'wall' }); // Gap is just invisible wall
                 x++;
             }
          }
       }
       return styles;
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;

      cols = Math.ceil(width / charWidth);
      rows = Math.ceil(height / fontSize);

      grid = Array(rows).fill(null).map(() => Array(cols).fill(null));
      columnStyles = generateMap(cols);
      
      // Floor
      for(let c=0; c<cols; c++) {
          grid[rows-1][c] = { char: "=", type: 'wall', active: false, colorOffset: 0 };
      }
    };

    const getStackHeight = (c: number) => {
       for(let r=0; r<rows; r++) {
          if(grid[r][c]) return r;
       }
       return rows;
    };

    // Spawning
    const spawnBlock = () => {
       const c = Math.floor(Math.random() * cols);
       if(!columnStyles[c] || columnStyles[c].char === "  ") return;
       
       const h = getStackHeight(c);
       // Removed height cap to allow buildings to reach the top
       
       // Spawn above screen
       particles.push({
          x: c,
          y: -20,
          targetRow: h - 1,
          char: columnStyles[c].char,
          type: columnStyles[c].type,
          speed: 3 + Math.random() * 4,
          isDebris: false
       });
    };

    // Interaction: Destroy Blocks
    const destroyBlock = (gx: number, gy: number) => {
       if(gx >= 0 && gx < cols && gy >= 0 && gy < rows) {
          if(grid[gy][gx]) {
             const b = grid[gy][gx]!;
             grid[gy][gx] = null;
             
             // Spawn Debris
             for(let i=0; i<3; i++) {
                particles.push({
                   x: gx * charWidth + charWidth/2, // Pixel X center
                   y: gy * fontSize + fontSize/2,   // Pixel Y center
                   targetRow: 0, // unused
                   char: Math.random() > 0.5 ? "." : ",",
                   type: 'wall',
                   speed: 0,
                   isDebris: true,
                   vx: (Math.random()-0.5) * 8,
                   vy: -2 - Math.random() * 4, // Initial pop up
                   life: 40 + Math.random() * 20
                });
             }
          }
       }
    };

    const explodeWorld = () => {
        for(let r=0; r<rows; r++){
            for(let c=0; c<cols; c++){
                if(grid[r][c] && grid[r][c]!.char !== "=") { // Don't explode floor immediately
                    const b = grid[r][c]!;
                    particles.push({
                        x: c * charWidth,
                        y: r * fontSize,
                        targetRow: 0,
                        char: b.char,
                        type: b.type,
                        speed: 0,
                        isDebris: true,
                        vx: (Math.random()-0.5) * 20,
                        vy: (Math.random()-1) * 15,
                        life: 80 + Math.random() * 40
                    });
                    grid[r][c] = null;
                }
            }
        }
        // Rebuild floor
        for(let c=0; c<cols; c++) {
            if(!grid[rows-1][c]) {
                grid[rows-1][c] = { char: "=", type: 'wall', active: false, colorOffset: 0 };
            }
        }
        // Change styles for variety
        columnStyles = generateMap(cols);
    };
    
    // Input Handling
    const getGridPos = (e: MouseEvent | TouchEvent) => {
       const rect = canvas.getBoundingClientRect();
       let cx, cy;
       if('touches' in e) {
          cx = e.touches[0].clientX;
          cy = e.touches[0].clientY;
       } else {
          cx = (e as MouseEvent).clientX;
          cy = (e as MouseEvent).clientY;
       }
       return {
          gx: Math.floor((cx - rect.left) / charWidth),
          gy: Math.floor((cy - rect.top) / fontSize)
       };
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
       // Destruction on hover (move), no click required
       const {gx, gy} = getGridPos(e);
       destroyBlock(gx, gy);
       destroyBlock(gx, gy+1); // Slightly larger brush vertical
    };

    // Add listeners
    canvas.addEventListener('mousemove', handleMove as any);
    canvas.addEventListener('touchmove', handleMove as any, { passive: false });


    // --- Loop ---

    const update = () => {
       frame++;
       spawnTimer++;
       if(spawnTimer > 3) { // Rapid construction
          spawnBlock();
          if(Math.random() > 0.5) spawnBlock();
          spawnTimer = 0;
       }

       // Update Particles
       for(let i=particles.length-1; i>=0; i--) {
          const p = particles[i];
          
          if(p.isDebris) {
             p.x += p.vx!;
             p.y += p.vy!;
             p.vy! += 1; // Gravity
             p.life!--;
             if(p.life! <= 0 || p.y > height + 50) particles.splice(i, 1);
          } else {
             // Falling Block Logic
             p.y += p.speed;
             
             // Collision Detection with Grid
             const currentRow = Math.floor(p.y / fontSize);
             
             // Check if we hit something or the floor
             let landed = false;
             if(currentRow >= 0 && currentRow < rows) {
                if(grid[currentRow][p.x]) {
                   // Hit a block, land on top (currentRow - 1)
                   const landRow = currentRow - 1;
                   if(landRow >= 0 && !grid[landRow][p.x]) {
                       grid[landRow][p.x] = {
                          char: p.char,
                          type: p.type,
                          active: Math.random() > 0.7,
                          colorOffset: Math.random()
                       };
                   }
                   landed = true;
                }
             }
             
             if (currentRow >= rows - 1 && !landed) {
                 // Hit floor boundary (if floor block was missing)
                 if(!grid[rows-1][p.x]) {
                     grid[rows-1][p.x] = {
                          char: p.char,
                          type: p.type,
                          active: Math.random() > 0.7,
                          colorOffset: Math.random()
                     };
                 }
                 landed = true;
             }

             if (landed) particles.splice(i, 1);
          }
       }

       // Grid Gravity (Sand Logic)
       // Blocks fall if there is empty space below them
       for(let c=0; c<cols; c++) {
          // Start from second to last row and go up
          for(let r=rows-2; r>=0; r--) { 
             if(grid[r][c] && !grid[r+1][c]) {
                // Move down
                grid[r+1][c] = grid[r][c];
                grid[r][c] = null;
             }
          }
       }

       // Flicker Windows
       if(frame % 15 === 0) {
          const r = Math.floor(Math.random()*rows);
          const c = Math.floor(Math.random()*cols);
          if(grid[r][c] && grid[r][c]!.type === 'window') {
             grid[r][c]!.active = !grid[r][c]!.active;
          }
       }

       // Check for Reset (If any column reaches top)
       let reachedTop = false;
       for(let c=0; c<cols; c++) {
           // Check top 3 rows for safety margin
           if(grid[0][c] || grid[1][c] || grid[2][c]) {
               reachedTop = true;
               break;
           }
       }
       if(reachedTop) {
           explodeWorld();
       }
    };

    const draw = () => {
        // Clear Background (Transparent to let CSS gradient show)
        ctx.clearRect(0,0,width,height);
        
        // Matches AsciiFace gradient: from-primary via-secondary to-accent
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#619e81');   // Primary
        gradient.addColorStop(0.5, '#666b99'); // Secondary
        gradient.addColorStop(1, '#d64e29');   // Accent
        
        ctx.fillStyle = gradient;
        ctx.font = font;
        ctx.textBaseline = 'top';
        
        // Draw Grid
        for(let r=0; r<rows; r++) {
           for(let c=0; c<cols; c++) {
              const b = grid[r][c];
              if(b) {
                 // Use opacity to distinguish windows instead of color
                 if(b.type === 'wall') {
                    ctx.globalAlpha = 1.0;
                 } else {
                    // Window logic: On = full opacity, Off = dimmed
                    ctx.globalAlpha = b.active ? 1.0 : 0.3; 
                 }
                 
                 ctx.fillText(b.char, c*charWidth, r*fontSize);
              }
           }
        }
        ctx.globalAlpha = 1.0; // Reset

        // Draw Particles
        particles.forEach(p => {
           if(p.isDebris) {
              // Debris fades out
              ctx.globalAlpha = Math.max(0, (p.life || 0) / 50);
              ctx.fillText(p.char, p.x, p.y); // Debris uses pixel coords
           } else {
              // Falling block
              ctx.globalAlpha = 1.0;
              ctx.fillText(p.char, p.x * charWidth, p.y);
           }
        });
        ctx.globalAlpha = 1.0;
    };

    const loop = () => {
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
      
      canvas.removeEventListener('mousemove', handleMove as any);
      canvas.removeEventListener('touchmove', handleMove as any);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
       <div ref={containerRef} className="w-full h-full relative z-10">
          <canvas ref={canvasRef} className="block" />
       </div>
    </div>
  );
};

export default AsciiSkyline;
