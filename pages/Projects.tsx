
import React from 'react';
import { Project } from '../types';
import AsciiSkyline from '../components/AsciiSkyline';
import { ExternalLink, Github } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "Replicated Tinkering",
    category: "Research and Deployment",
    description: "A simplified orchestration pipeline to train custom HF models using Tinker API and deploying them using Replicate Cog service.",
    technologies: ["Replicate", "Tinker", "Hugging Face"],
    repo: "https://github.com/abhilad1009/replicated_tinkering"
  },
    {
    id: 2,
    title: "GPT Fine-Tuning & Distillation",
    category: "Efficient Deployment",
    description: "Scripts and framework for GPT fine-tuning and knowledge distillation using Student-Teacher training and AWS Sagemaker deployment.",
    technologies: ["Transformers", "Pytorch", "AWS Sagemaker"],
    repo: "https://github.com/abhilad1009/GPT2-finetune-distillation"
  },
  {
    id: 3,
    title: "Model Quantization: Pytorch vs Tensorflow support for PTQ and QAT",
    category: "Efficient Deployment",
    description: "An empirical evaluation of quantization support in Pytorch and Tensorflow using Post Training Quantization and Quantization Aware Training.",
    technologies: ["Tensorflow", "Pytorch", "GPU Profiler"],
    repo: "https://github.com/abhilad1009/Pytorch_vs_Tensorflow"
  },
  {
    id: 4,
    title: "Storyboard - AI assisted Writer's Platform",
    category: "AI Social Platform",
    description: "A writer's plaform with AI support for auto language & audio translation, graphic novel creation and marketplace.",
    technologies: ["AWS Lambda", "API Gateway", "ElasticSearch", "Javascript"],
    repo: "https://github.com/abhilad1009/StoryBoard"
  },
  {
    id: 5,
    title: "Perceived Image Reconstruction from fMRI",
    category: "Cross Disciplinary Research",
    description: "A multitask leaerning based approach to training GAN for perceived image reconstruction from fMRI signals.",
    technologies: ["Tensorflow", "fMRI", "H5Py", "Neuroscience"],
    repo :"https://github.com/abhilad1009/NNRegressionforfMRIdecoding",
    link: "https://ieeexplore.ieee.org/abstract/document/9573575"
  },
  {
    id: 6,
    title: "Supervised Learning with Clinical Constraints for Sonographic Measurements",
    category: "Cross Disciplinary Research",
    description: "A biometrically constrained neural network regression training to accurately measure fetal brain in sonographic images.",
    technologies: ["Pytorch", "Constrained SL", "Sonographic Image Processing"],
    link: "https://ieeexplore.ieee.org/abstract/document/9761493"
  },
  {
    id: 7,
    title: "Global Wheat Detection Challenge - ICCV 2021",
    category: "Cross Disciplinary Research",
    description: "A pseudo-labeling and domain varience reduction based approach to improving dense wheat head detection.",
    technologies: ["YOLO", "Pytorch", "Domain Adaptation", "OpenCV"],
    repo: "https://github.com/abhilad1009/Global-Wheat-Challenge-2021",
    link: "https://dl.acm.org/doi/abs/10.1145/3477314.3507190"
  }
];

const Projects: React.FC = () => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-24 h-auto md:h-[calc(100vh-14rem)] w-full">
      
      {/* Left Panel: Static AsciiSkyline */}
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
                <AsciiSkyline />
              </div>
           </div>
        </div>
      </div>

      {/* Right Panel: Scrollable Project List */}
      <div className="w-full md:h-full md:overflow-y-auto px-6 pb-24 md:pb-6 pt-4 group scrollbar-hide">
        
        <header className="mb-16 animate-fade-in-up text-left border-b border-slate-200 dark:border-white/10 pb-8">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter mb-6">
            Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
             Build, Break, Contemplate, Repeat.
          </p>
        </header>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="group relative animate-fade-in-up opacity-0 p-8 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-black/50"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs font-bold tracking-widest uppercase text-primary mb-2 block">
                            {project.category}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">
                            {project.title}
                        </h3>
                    </div>
                    <div className="flex gap-3">
                        {project.repo && (
                            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all" aria-label="GitHub Repo">
                                <Github size={18} />
                            </a>
                        )}
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all" aria-label="Link">
                                <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-black/20 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Projects;
