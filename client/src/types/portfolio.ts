export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  technologies: string[];
  metrics?: string;
  featured: boolean;
  createdAt: Date;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  projectType: string;
  projectDetails: string;
}
