
import React from 'react';
import { WorkExperience, Education } from '../types';

import AsciiCityWalk from '../components/AsciiCityWalk';

const workHistory: WorkExperience[] = [
  {
    id: 1,
    role: "Machine Learning Engineer",
    company: "TransRe",
    period: "2024 - Present",
    description: "Creating AI Workflow Integrations for Contract Analysis, Clause Review, FAC/Treaty Data Extraction comprising complex pipelines built on domain logic.",
    technologies: ["OpenAI", "DSPy", "Flask", "Azure", "Snowflake","Docker","Rust"]
  },
  {
    id: 2,
    role: "Machine Learning Engineer",
    company: "Aktus AI",
    period: "2024 - 2024",
    description: "Developed RAG systems with fine-tuned LLMs and Embeddings. Reduced API latency by using Nvidia NIM and parallel processing. Developed automated fine-tuning data enrichment pipelines.",
    technologies: ["FastAPI", "Langchain", "GCP", "VertexAI", "Transformers", "Nvidia NIM"]
  },
  {
    id: 3,
    role: "AI Engineer",
    company: "Origin Medical",
    period: "2021 - 2022",
    description: "Built experimentation framework for AI clinical diagnosis tool. Research study presented at SPIE & FMF. Managed team of 5, developing anomaly detection and segmentation models.",
    technologies: ["Pytorch", "Scikit-learn", "AWS", "OpenCV", "WandB", "Cross-Disciplinary Research"]
  }
];

const education: Education[] = [
  {
    id: 1,
    degree: "M.S. Computer Science (ML track)",
    institution: "Columbia University",
    year: "2022 - 2023"
  }
  {
    id: 2,
    degree: "B.Tech. Computer Engineering",
    institution: "PDEU",
    year: "2016 - 2020"
  }
];

const Work: React.FC = () => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-24 h-auto md:h-[calc(100vh-14rem)] w-full">
      
      {/* Left Panel: Static AsciiCityWalk */}
      {/* Centered in its grid cell on desktop, stacked on top for mobile */}
      <div className="flex items-center justify-center md:h-full">
        <div className="animate-fade-in-up opacity-0 w-full max-w-md aspect-square relative" style={{ animationDelay: '300ms' }}>
           {/* Artistic Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[80px] animate-pulse-slow" />
           
           {/* The "Canvas" */}
           <div className="relative w-full h-full bg-white dark:bg-surface shadow-2xl dark:shadow-black/50 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-white/5 transition-transform hover:scale-[1.02] duration-700 ease-out">
              {/* Inner Frame */}
              <div className="absolute inset-4 border border-slate-100 dark:border-white/5 rounded-2xl opacity-50 pointer-events-none z-10"></div>
              
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-transparent to-slate-50/50 dark:to-black/20">
                <AsciiCityWalk />
              </div>
           </div>
        </div>
      </div>

      {/* Right Panel: Scrollable Work History */}
      {/* Independent scroll on desktop, natural flow on mobile */}
      <div className="w-full md:h-full md:overflow-y-auto md:pr-4 pb-24 md:pb-0 group scrollbar-hide">
        
        <header className="mb-16 animate-fade-in-up text-left border-b border-slate-200 dark:border-white/10 pb-8">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter mb-6">
            Work Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
            A timeline of me going places, learning things and building stuff.
          </p>
        </header>

        <div className="space-y-20">
          {workHistory.map((job, index) => (
            <div 
              key={job.id} 
              className="group/item relative animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Decorative Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 to-transparent dark:from-slate-800 -ml-6 hidden md:block"></div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white  transition-colors">
                    {job.company}
                  </h3>
                  <span className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">
                    {job.period}
                  </span>
                </div>
                
                <div className="text-primary font-medium">{job.role}</div>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 animate-fade-in-up opacity-0 delay-500 pt-12 border-t border-slate-200 dark:border-white/10">
          <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Education</h3>
          <div className="grid gap-6">
              {education.map(edu => (
                 <div key={edu.id} className="group/edu flex items-start justify-between p-6 bg-transparent rounded-2xl border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-colors">
                    <div>
                       <h4 className="font-bold text-lg text-slate-900 dark:text-white">{edu.institution}</h4>
                       <p className="text-slate-500 dark:text-slate-400 mt-1">{edu.degree}</p>
                    </div>
                    <span className="text-sm font-medium text-slate-400">{edu.year}</span>
                 </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Work;
