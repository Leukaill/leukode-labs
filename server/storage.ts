import { 
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
  updateProject(id: number, project: InsertProject): Promise<Project | null>;
  deleteProject(id: number): Promise<boolean>;
  
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class FallbackStorage implements IStorage {
  private projects: Map<number, Project>;
  private contacts: Map<number, ContactSubmission>;
  private users: Map<number, User>;
  private currentId: number = 1;

  constructor() {
    this.projects = new Map();
    this.contacts = new Map();
    this.users = new Map();
    this.initializePortfolioProjects();
  }

  private initializePortfolioProjects() {
    const portfolioProjects: Project[] = [
      {
        id: 1,
        title: "TechFlow E-commerce Platform",
        description: "Advanced e-commerce solution with AI-powered recommendations",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "E-commerce",
        technologies: ["Next.js", "Stripe", "AI/ML", "PostgreSQL"],
        metrics: "300% increase in conversion rates",
        featured: true,
        createdAt: new Date()
      },
      {
        id: 2,
        title: "DataSync Analytics Dashboard",
        description: "Real-time data analytics platform for enterprise clients",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Analytics",
        technologies: ["React", "D3.js", "Python", "BigQuery"],
        metrics: "Processing 10M+ records daily",
        featured: true,
        createdAt: new Date()
      },
      {
        id: 3,
        title: "MedConnect Telemedicine Portal",
        description: "HIPAA-compliant telehealth platform connecting patients and doctors",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Healthcare",
        technologies: ["Vue.js", "Node.js", "WebRTC", "AWS"],
        metrics: "Serving 50,000+ patients nationwide",
        featured: true,
        createdAt: new Date()
      },
      {
        id: 4,
        title: "InvestPro Trading Platform",
        description: "Real-time cryptocurrency and stock trading platform",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Fintech",
        technologies: ["Angular", "WebSocket", "Blockchain", "Redis"],
        metrics: "$2B+ in transactions processed",
        featured: false,
        createdAt: new Date()
      },
      {
        id: 5,
        title: "EduHub Learning Management System",
        description: "Interactive online learning platform with virtual classrooms",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Education",
        technologies: ["React", "Video.js", "Socket.io", "MongoDB"],
        metrics: "1M+ students enrolled globally",
        featured: false,
        createdAt: new Date()
      },
      {
        id: 6,
        title: "PropertyMax Real Estate CRM",
        description: "Comprehensive property management and CRM solution",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Real Estate",
        technologies: ["Next.js", "Maps API", "CRM Integration", "MySQL"],
        metrics: "500+ properties managed efficiently",
        featured: false,
        createdAt: new Date()
      },
      {
        id: 7,
        title: "FoodieConnect Restaurant Network",
        description: "Multi-restaurant ordering and delivery management platform",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Food & Beverage",
        technologies: ["React Native", "Node.js", "GPS Tracking", "Payment APIs"],
        metrics: "200+ restaurants, 50K+ orders monthly",
        featured: false,
        createdAt: new Date()
      },
      {
        id: 8,
        title: "TravelPro Booking Management",
        description: "Complete travel booking and itinerary management system",
        imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Travel & Tourism",
        technologies: ["Vue.js", "Travel APIs", "Payment Gateway", "PostgreSQL"],
        metrics: "10K+ bookings, 98% customer satisfaction",
        featured: true,
        createdAt: new Date()
      },
      {
        id: 9,
        title: "GameVerse Entertainment Hub",
        description: "Multiplayer gaming platform with social features and tournaments",
        imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Gaming & Entertainment",
        technologies: ["Unity", "Node.js", "Socket.io", "Redis"],
        metrics: "500K+ active gamers, 1M+ tournaments",
        featured: true,
        createdAt: new Date()
      },
      {
        id: 9,
        title: "Denyse AI Assistant",
        description: "Enterprise-grade AI assistant with complete data privacy through local LLM deployment",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Enterprise Solutions",
        technologies: ["Local LLM", "Document Analysis", "Enterprise Security", "Knowledge Management"],
        metrics: "100% data privacy with enterprise-grade AI capabilities",
        featured: true,
        createdAt: new Date()
      }
    ];

    portfolioProjects.forEach(project => {
      this.projects.set(project.id, project);
    });
    this.currentId = portfolioProjects.length + 1;
    
    console.log(`Initialized ${portfolioProjects.length} portfolio projects`);
    
    // Categories: E-commerce, Analytics, Healthcare, Fintech, Education, Real Estate, Food & Beverage, Travel & Tourism, Gaming & Entertainment
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { id, ...insertUser };
    this.users.set(id, user);
    return user;
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 6);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const project: Project = { 
      id, 
      ...insertProject,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, insertProject: InsertProject): Promise<Project | null> {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      return null;
    }
    
    const updatedProject: Project = {
      ...existingProject,
      ...insertProject,
      id: existingProject.id, // Keep original ID
      createdAt: existingProject.createdAt // Keep original creation date
    };
    
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Contact operations
  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = this.currentId++;
    const contact: ContactSubmission = { 
      id, 
      ...insertContact,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new FallbackStorage();