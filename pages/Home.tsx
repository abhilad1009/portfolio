
import React from 'react';
import AsciiFace from '../components/AsciiFace';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
      
      {/* Text Content */}
      <div className="flex-1 order-2 md:order-1 text-center md:text-left z-10">
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '100ms' }}>
          <span className="inline-block mb-6 text-sm font-bold tracking-widest text-primary uppercase">
            Heuristics Aficionado
          </span>
        </div>
        
        <h1 className="animate-fade-in-up opacity-0 text-6xl md:text-8xl font-bold mb-8 tracking-tighter text-slate-900 dark:text-white leading-[0.9]" style={{ animationDelay: '200ms' }}>
          Hello,<br />
          I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Abhi.</span>
        </h1>
        
        <p className="animate-fade-in-up opacity-0 text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-md mx-auto md:mx-0 font-light leading-relaxed" style={{ animationDelay: '300ms' }}>
          I use creative hacks with domain knowledge to build things that <span className="text-slate-900 dark:text-white font-medium">just work</span>.
        </p>
        
        {/* Buttons Container */}
        <div className="animate-fade-in-up opacity-0 flex flex-col sm:flex-row gap-6 justify-center md:justify-start" style={{ animationDelay: '400ms' }}>
          <Link 
            to="/projects" 
            className="group inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all bg-slate-900 dark:bg-white dark:text-black rounded-full hover:scale-105 hover:shadow-xl"
          >
            View Projects
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="/Abhi_Lad_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-slate-600 dark:text-slate-300 transition-all bg-transparent border border-slate-200 dark:border-slate-700 rounded-full hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary"
          >
            Resume
            <Download size={18} className="ml-2 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* ASCII Visual - Framed Art Style (No Terminal Chrome) */}
      <div className="animate-fade-in-up opacity-0 flex-1 order-1 md:order-2 w-full max-w-md aspect-square relative" style={{ animationDelay: '300ms' }}>
         {/* Artistic Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[80px] animate-pulse-slow" />
         
         {/* The "Canvas" */}
         <div className="relative w-full h-full bg-white dark:bg-surface shadow-2xl dark:shadow-black/50 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-white/5 transition-transform hover:scale-[1.02] duration-700 ease-out">
            {/* Inner Frame */}
            <div className="absolute inset-4 border border-slate-100 dark:border-white/5 rounded-2xl opacity-50 pointer-events-none z-10"></div>
            
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-transparent to-slate-50/50 dark:to-black/20">
              <AsciiFace />
            </div>
         </div>
      </div>

    </div>
  );
};

export default Home;
