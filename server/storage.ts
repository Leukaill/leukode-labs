import { 
  users, 
  projects, 
  contactSubmissions,
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type ContactSubmission,
  type InsertContact
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentContactId = 1;
    
    // Initialize with sample projects
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleProjects: Omit<Project, 'id'>[] = [
      {
        title: "TechFlow E-commerce",
        description: "Next.js • Stripe • Headless CMS",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "E-commerce",
        technologies: ["Next.js", "Stripe", "Headless CMS"],
        metrics: "300% increase in conversion rates",
        featured: true,
        createdAt: new Date(),
      },
      {
        title: "DataSync Analytics",
        description: "React • D3.js • PostgreSQL",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Analytics",
        technologies: ["React", "D3.js", "PostgreSQL"],
        metrics: "Real-time data processing for 10M+ records",
        featured: true,
        createdAt: new Date(),
      },
      {
        title: "MedConnect Portal",
        description: "Vue.js • Node.js • HIPAA Compliant",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Healthcare",
        technologies: ["Vue.js", "Node.js", "HIPAA"],
        metrics: "Serving 50,000+ patients nationwide",
        featured: true,
        createdAt: new Date(),
      },
      {
        title: "InvestPro Platform",
        description: "Angular • WebSocket • Microservices",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Fintech",
        technologies: ["Angular", "WebSocket", "Microservices"],
        metrics: "$2B+ in transactions processed",
        featured: false,
        createdAt: new Date(),
      },
      {
        title: "LearnHub Academy",
        description: "React • Video.js • AWS",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Education",
        technologies: ["React", "Video.js", "AWS"],
        metrics: "1M+ students enrolled",
        featured: false,
        createdAt: new Date(),
      },
      {
        title: "PropertyMax CRM",
        description: "Next.js • Maps API • CRM Integration",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Real Estate",
        technologies: ["Next.js", "Maps API", "CRM"],
        metrics: "40% faster property searches",
        featured: false,
        createdAt: new Date(),
      },
    ];

    sampleProjects.forEach(project => {
      const fullProject: Project = {
        ...project,
        id: this.currentProjectId++,
      };
      this.projects.set(fullProject.id, fullProject);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id,
      createdAt: new Date(),
      metrics: insertProject.metrics ?? null,
      featured: insertProject.featured ?? null,
    };
    this.projects.set(id, project);
    return project;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const contact: ContactSubmission = { 
      ...insertContact, 
      id,
      createdAt: new Date(),
      company: insertContact.company ?? null,
      status: "new",
    };
    this.contactSubmissions.set(id, contact);
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }
}

export const storage = new MemStorage();
