
import { Book, Brain, Cat, Cpu, Gamepad2, Heart, Lightbulb, Network, Palette, Sparkles, ToolCase, Users } from 'lucide-react';
import React, { useState } from 'react';
import { SkillCategory } from '../types';

// Data Definitions
const techSkills: (SkillCategory & { icon: React.ElementType, desc: string })[] = [
  {
    name: "Deep Learning",
    icon: Brain,
    desc: "Architecting neural networks.",
    items: ["PyTorch", "TensorFlow", "Keras", "OpenCV","Scikit-Learn"]
  },
  {
    name: "LLM & NLP",
    icon: Network,
    desc: "Language understanding at scale.",
    items: ["HuggingFace Transformers", "LangChain", "DSPy", "Agent Lightning","RAG","Vector DBs"]
  },
  {
    name: "Frameworks & Tools",
    icon: ToolCase,
    desc: "Mastering tools in the arsenal.",
    items: ["FastAPI", "Flask", "Docker", "Git", "AWS", "GCP", "Azure", "Nvidia NIM"]
  },
  {
    name: "Foundations",
    icon: Cpu,
    desc: "Buiding up from the basics.",
    items: ["Python", "Javascript", "SQL","NoSQL", "HTML", "C/C++"]
  }
];

const humanSkills: (SkillCategory & { icon: React.ElementType, desc: string })[] = [
    {
    name: "Communication",
    icon: Heart,
    desc: "Bridging the semantic gap.",
    items: ["Presentation", "Cross-functional Collab", "Listening"]
  },
  {
    name: "Creativity",
    icon: Sparkles,
    desc: "Thinking outside the sphere.",
    items: ["Jugaad", "Methodical Problem Solving", "Rapid Prototyping",]
  },
  {
    name: "Strategy",
    icon: Lightbulb,
    desc: "Vision meets execution.",
    items: ["Product Roadmap", "Technical Feasibility", "Time Management"]
  },
  {
    name: "Teamwork",
    icon: Users,
    desc: "Moving as team to success.",
    items: ["Conflict Resolution", "Ownership & Accountability", "Outcome Delegation"]
  },

];

const vibesData: (SkillCategory & { icon: React.ElementType, desc: string })[] = [
  {
    name: "Book Reccomendations",
    icon: Book,
    desc: "A few that I cherish.",
    items: ["Lord of the Rings", "The Selfish Gene", "Art of War","Frankenstein","Thus Spoke Zarathustra"]
  },
  {
    name: "Video Games",
    icon: Gamepad2,
    desc: "All work, all play.",
    items: ["God of War", "Uncharted", "Hades", "Dead Cells", "Katana Zero"]
  },
  {
    name: "Artsy Things",
    icon: Palette,
    desc: "In touch with my creative side.",
    items: ["Painting", "Poetry", "Tabla", "Cooking", "Storytelling"]
  },
  {
    name: "Animals to Befriend",
    icon: Cat,
    desc: "All animals are good animals.",
    items: ["Cat", "Wolf", "Crow", "Owl"]
  },
];

const Attributes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tech' | 'human' | 'vibes'>('tech');

  const tabs = [
    {
      id: 'tech',
      label: 'On-Screen Skills',
      ascii: "  ====     _\n  │░░░░│   |\"|\n   ‾┴┴‾ ===|o|", // Chip
      data: techSkills
    },
    {
      id: 'human',
      label: 'Off-Screen Skills',
      ascii: "  ~ ~ ~   ?-?-?\n  (o_o)   (-_-)\n  /> <\\   |= =|", // Dancing, // Face
      data: humanSkills
    },
    {
      id: 'vibes',
      label: 'No Skills, Just Vibes',
      ascii: "    |\\__/,|   (`\\ \n  _.|o o  |_   ) )\n-(((---(((--------",
      data: vibesData
    }
  ];

  return (
    <div className="max-w-5xl mx-auto min-h-[calc(100vh-10rem)]">
      <div className="mb-12 text-center animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
          Attributes
        </h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light">
          The things that make me, well... me!
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light">
          *Subject to Change
        </p>
      </div>

      {/* Tab Navigation - Solid Card Style */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 animate-fade-in-up delay-100 max-w-3xl mx-auto">
        {tabs.map((tab) => {
           const isActive = activeTab === tab.id;
           return (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`
                 group relative flex flex-col items-center justify-center py-4 px-8 rounded-2xl transition-all duration-300 w-full sm:w-1/3 border
                 ${isActive 
                   ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-105 z-10 dark:bg-slate-100 dark:border-slate-100 dark:text-slate-900' 
                   : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/10'
                 }
               `}
             >
               {/* ASCII Icon */}
               <pre className={`font-mono text-[10px] leading-[10px] mb-3 transition-colors duration-300 whitespace-pre select-none ${
                 isActive 
                   ? 'text-primary font-bold' 
                   : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-400 dark:group-hover:text-slate-400'
               }`}>
                 {tab.ascii}
               </pre>
               
               {/* Label */}
               <span className={`font-bold tracking-wider text-xs uppercase ${
                   isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
               }`}>
                   {tab.label}
               </span>
             </button>
           );
        })}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {tabs.find(t => t.id === activeTab)?.data.map((category, index) => (
          <div 
            key={`${activeTab}-${category.name}`}
            className="group relative animate-fade-in-up opacity-0 p-8 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-black/50"
            style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="flex items-start justify-between mb-8">
               <div>
                  <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{category.desc}</p>
               </div>
               <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-900 dark:text-white group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <category.icon size={24} />
               </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {category.items.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1 text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-black/20 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attributes;
