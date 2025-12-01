
import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface WorkExperience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  link?: string;
  repo?: string;
}

export interface LayoutProps {
  children: ReactNode;
}
