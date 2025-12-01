
import React from 'react';
import { Github, Linkedin, GraduationCap, Mail } from 'lucide-react';

const SocialLinks: React.FC = () => {
  const links = [
    { icon: Github, href: "https://github.com/abhilad1009?tab=repositories", label: "GitHub", color: "hover:text-white" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/abhi-lad-a3543b130/", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: GraduationCap, href: "https://scholar.google.com/citations?hl=en&user=Ul2rgYsAAAAJ", label: "Google Scholar", color: "hover:text-blue-500" },
    { icon: Mail, href: "mailto:abhinlad@gmail.com", label: "Email", color: "hover:text-accent" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full md:w-auto md:top-1/2 md:-translate-y-1/2 md:left-6 z-50 animate-slide-in-right">
      <div className="flex md:flex-col justify-center items-center gap-6 p-4 md:p-0 bg-transparent md:bg-transparent dark:bg-transparent backdrop-blur-lg md:backdrop-blur-none border-t md:border-t-0 border-slate-200 dark:border-slate-800 md:border-none shadow-lg md:shadow-none">
        {links.map((LinkItem, index) => (
          <a
            key={index}
            href={LinkItem.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={LinkItem.label}
            className={`group relative p-2 rounded-lg transition-all duration-300 hover:scale-125 ${LinkItem.color}`}
          >
            <LinkItem.icon 
              size={24} 
              className="text-slate-400 dark:text-slate-500 transition-colors duration-300 hover:text-primary dark:hover:text-primary" 
            />
            {/* Tooltip for Desktop */}
            <span className="hidden md:block absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-surface text-white text-xs rounded opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 pointer-events-none transition-all duration-300 whitespace-nowrap border border-slate-700 shadow-xl">
              {LinkItem.label}
            </span>
          </a>
        ))}
        
        {/* Decorative line for desktop */}
        <div className="hidden md:block w-px h-24 bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-700" />
      </div>
    </div>
  );
};

export default SocialLinks;
