import React, { useRef, useEffect } from 'react';

const AsciiBuilder: React.FC = () => {
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
    
    const fontSize = 12;
    const font = `bold ${fontSize}px monospace`;
    
    // State
    let frame = 0;
    
    // Background noise cache
    let bgGrid: {char: string, opacity: number}[][] = [];

    // Log Buffer
    const maxLogs = 14;
    let logs: string[] = [
       "> initializing environment...",
       "> loading modules...",
       "> connecting to neural net...",
    ];

    const logMessages = [
      "optimizing tensors...",
      "compressing assets...",
      "allocating memory block...",
      "linking dependencies...",
      "running unit tests...",
      "compiling src/core/ai.ts...",
      "detecting gpu...",
      "cuda kernels: OK",
      "training loss: 0.004",
      "validating model...",
      "cleaning garbage collection...",
      "refactoring legacy code...",
      "updating indexes...",
      "syncing with cloud...",
      "checking for errors...",
      "minifying bundle...",
      "generating sourcemaps...",
    ];

    const resize = () => {
      width = container.clientWidth;
      height = 340;
      canvas.width = width;
      canvas.height = height;
      
      // Re-init background grid
      const cols = Math.ceil(width / (fontSize * 0.6));
      const rows = Math.ceil(height / fontSize);
      bgGrid = [];
      for(let y=0; y<rows; y++) {
        const row = [];
        for(let x=0; x<cols; x++) {
           row.push({
             char: Math.random() > 0.9 ? (Math.random() > 0.5 ? '0' : '1') : ' ',
             opacity: Math.random() * 0.1
           });
        }
        bgGrid.push(row);
      }
    };

    const updateLogs = () => {
       // Add a new log line every 30-60 frames randomly
       if (frame % 30 === 0 && Math.random() > 0.3) { 
          const msg = logMessages[Math.floor(Math.random() * logMessages.length)];
          logs.push(`> ${msg}`);
          if (logs.length > maxLogs) logs.shift();
       }
    };

    const draw = () => {
      // Clear
      ctx.fillStyle = '#0e0f15'; // Twilight Indigo 950
      ctx.fillRect(0, 0, width, height);
      
      ctx.font = font;
      ctx.textBaseline = 'top';
      
      const cols = Math.ceil(width / (fontSize * 0.6));
      const rows = Math.ceil(height / fontSize);
      
      // 1. Draw Subtle Background Matrix
      ctx.fillStyle = '#3d405c'; // Twilight Indigo 700
      bgGrid.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell.char !== ' ') {
            // Random flicker
            if(Math.random() > 0.99) cell.opacity = Math.random() * 0.3;
            ctx.globalAlpha = cell.opacity;
            ctx.fillText(cell.char, x * (fontSize * 0.6), y * fontSize);
          }
        });
      });
      ctx.globalAlpha = 1.0;

      // SCENE COORDINATES
      // Center the composition
      const centerX = Math.floor(cols * 0.25); 
      const centerY = Math.floor(rows * 0.5);

      // 2. Draw The Engineer (Left Side)
      const engineerX = centerX;
      const engineerY = centerY - 8;

      // Updated Art: Clean shaven with goggles
      const engineerArt = [
        "         .-----.        ",
        "       /` ~~~~~`\\      ",
        "      |  |  _   |     ",
        "      |  |[<.><.>     ", // Goggles
        "      |  |   >  |     ", // Nose
        "       \\   `-' /      ", // Clean jaw
        "        `-----'       ",
        "       /`     `\\      ",
        "      / /|   |\\ \\     ",
        "     / / |   |   -  ",
        "     -   |   |   ",
        "         |___|     ",
        "                 ",
      ];

      ctx.fillStyle = '#8589ad'; // Twilight Indigo 400
      engineerArt.forEach((line, i) => {
         ctx.fillText(line, engineerX * (fontSize * 0.6), (engineerY + i) * fontSize);
      });

      // 3. Draw Console / Desk (Standalone now)
      const consoleX = engineerX + 13;
      const consoleY = engineerY + 8;
      
      ctx.fillStyle = '#3d405c'; // Twilight Indigo 700
      const consoleArt = [
          "  ____________ ",
          " / [][][][][] |", // Keyboard top
          "|_____________|",  // Side/Base
          "   |       |   ",   // Leg 1
          "   |       |   ",   // Leg 2
      ];
      consoleArt.forEach((line, i) => {
          ctx.fillText(line, consoleX * (fontSize * 0.6), (consoleY + i + 1) * fontSize);
      });

      // 4. Animated Arms / Hands Typing
      const typingSpeed = frame * 0.15;
      
      // Calculate hand positions (0 is up, 0.5 is down)
      const leftHandOffset = Math.sin(typingSpeed) > 0 ? 0 : 0.4;
      const rightHandOffset = Math.cos(typingSpeed) > 0 ? 0 : 0.4;

      ctx.fillStyle = '#c2c4d6'; // Twilight Indigo 200
      
      const armY = engineerY + 10;
      
      // Left Arm
      ctx.fillText("", (engineerX + 6) * (fontSize * 0.6), armY * fontSize); 
      ctx.fillText("===", (engineerX + 7) * (fontSize * 0.6), (armY + leftHandOffset * 0.5) * fontSize);
      ctx.fillText("m", (engineerX + 10) * (fontSize * 0.6), (armY + 0.2 + leftHandOffset) * fontSize); // Hand
      
      // Right Arm
      ctx.fillText("", (engineerX + 17) * (fontSize * 0.6), armY * fontSize);
      ctx.fillText("=", (engineerX + 14) * (fontSize * 0.6), (armY + rightHandOffset * 0.5) * fontSize);
      ctx.fillText("m", (engineerX + 13) * (fontSize * 0.6), (armY + 0.2 + rightHandOffset) * fontSize); // Hand

      // 5. Draw Coding Progress Messages (Replacing the Machine)
      const logsX = consoleX + 20; 
      const logsY = centerY - 10;

      // Draw Header
      ctx.fillStyle = '#e4971b'; // Apricot Cream 500 (Amber)
      ctx.fillText(":: SYSTEM BUILD LOGS ::", logsX * (fontSize * 0.6), (logsY - 2) * fontSize);
      
      // Draw Separator
      ctx.fillStyle = '#52567a'; // Twilight Indigo 600
      ctx.fillText("-----------------------", logsX * (fontSize * 0.6), (logsY - 1) * fontSize);

      // Draw Logs
      ctx.fillStyle = '#619e81'; // Muted Teal 500 (Green text equivalent)
      logs.forEach((log, i) => {
          // Fade out oldest logs
          const alpha = Math.max(0.3, (i + 1) / logs.length);
          ctx.globalAlpha = alpha;
          
          // Highlight latest log
          if (i === logs.length - 1) {
            ctx.fillStyle = '#f9f7ec'; // Eggshell 50 (White for latest)
            ctx.fillText(log + (frame % 20 < 10 ? "_" : ""), logsX * (fontSize * 0.6), (logsY + i) * fontSize);
          } else {
            ctx.fillStyle = '#619e81';
            ctx.fillText(log, logsX * (fontSize * 0.6), (logsY + i) * fontSize);
          }
      });
      ctx.globalAlpha = 1.0;

      // Draw Status Bar below logs
      const progress = (frame % 400) / 400;
      const barWidth = 24;
      const filled = Math.floor(progress * barWidth);
      const barStr = "[" + "=".repeat(filled) + "-".repeat(barWidth - filled) + "]";
      
      const statusY = logsY + maxLogs + 2;
      
      ctx.fillStyle = '#666b99'; // Twilight Indigo 500
      ctx.fillText(`STATUS: ${Math.floor(progress * 100)}%`, logsX * (fontSize * 0.6), statusY * fontSize);
      ctx.fillStyle = '#52567a';
      ctx.fillText(barStr, logsX * (fontSize * 0.6), (statusY + 1) * fontSize);

      updateLogs();
    };

    const loop = () => {
      frame++;
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
    <div ref={containerRef} className="w-full mb-8 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative bg-dark h-[340px]">
      <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500 z-10 bg-dark/50 px-2 py-1 rounded border border-slate-800">
        &gt; workspace: dev_environment_v3
      </div>
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Vignette & Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] z-20"></div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-20 opacity-50"></div>
    </div>
  );
};

export default AsciiBuilder;