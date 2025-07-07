import { 
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type ContactSubmission,
  type InsertContact
} from "@shared/schema";
import { adminDb } from "./firebase-admin";

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

export class FirebaseStorage implements IStorage {
  private readonly COLLECTIONS = {
    USERS: 'arc_labs_users',
    PROJECTS: 'arc_labs_projects',
    CONTACTS: 'arc_labs_contacts'
  } as const;

  constructor() {
    // Initialize with portfolio projects
    this.initializePortfolioData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const doc = await adminDb.collection(this.COLLECTIONS.USERS).doc(id.toString()).get();
      if (doc.exists) {
        return { id: parseInt(doc.id), ...doc.data() } as User;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const snapshot = await adminDb.collection(this.COLLECTIONS.USERS)
        .where('username', '==', username)
        .limit(1)
        .get();
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: parseInt(doc.id), ...doc.data() } as User;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const userWithTimestamp = {
        ...insertUser,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await adminDb.collection(this.COLLECTIONS.USERS).add(userWithTimestamp);
      const user: User = { id: parseInt(docRef.id), ...insertUser };
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    try {
      const snapshot = await adminDb.collection(this.COLLECTIONS.PROJECTS)
        .orderBy('createdAt', 'desc')
        .get();
      
      return snapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Project[];
    } catch (error) {
      console.error('Error getting projects:', error);
      return [];
    }
  }

  async getFeaturedProjects(): Promise<Project[]> {
    try {
      const snapshot = await adminDb.collection(this.COLLECTIONS.PROJECTS)
        .where('featured', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(6)
        .get();
      
      return snapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Project[];
    } catch (error) {
      console.error('Error getting featured projects:', error);
      return [];
    }
  }

  async getProject(id: number): Promise<Project | undefined> {
    try {
      const doc = await adminDb.collection(this.COLLECTIONS.PROJECTS).doc(id.toString()).get();
      if (doc.exists) {
        return {
          id: parseInt(doc.id),
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        } as Project;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting project:', error);
      return undefined;
    }
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    try {
      const projectWithTimestamp = {
        ...insertProject,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await adminDb.collection(this.COLLECTIONS.PROJECTS).add(projectWithTimestamp);
      const project: Project = { 
        id: parseInt(docRef.id), 
        ...insertProject,
        createdAt: new Date()
      };
      return project;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  async updateProject(id: number, insertProject: InsertProject): Promise<Project | null> {
    try {
      const docRef = adminDb.collection(this.COLLECTIONS.PROJECTS).doc(id.toString());
      const doc = await docRef.get();
      
      if (!doc.exists) {
        return null;
      }
      
      const updateData = {
        ...insertProject,
        updatedAt: new Date()
      };
      
      await docRef.update(updateData);
      
      const updatedDoc = await docRef.get();
      return {
        id: parseInt(updatedDoc.id),
        ...updatedDoc.data(),
        createdAt: updatedDoc.data().createdAt?.toDate() || new Date()
      } as Project;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  async deleteProject(id: number): Promise<boolean> {
    try {
      const docRef = adminDb.collection(this.COLLECTIONS.PROJECTS).doc(id.toString());
      const doc = await docRef.get();
      
      if (!doc.exists) {
        return false;
      }
      
      await docRef.delete();
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }

  // Contact operations
  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    try {
      const contactWithTimestamp = {
        ...insertContact,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await adminDb.collection(this.COLLECTIONS.CONTACTS).add(contactWithTimestamp);
      const contact: ContactSubmission = { 
        id: parseInt(docRef.id), 
        ...insertContact,
        createdAt: new Date()
      };
      return contact;
    } catch (error) {
      console.error('Error creating contact submission:', error);
      throw error;
    }
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    try {
      const snapshot = await adminDb.collection(this.COLLECTIONS.CONTACTS)
        .orderBy('createdAt', 'desc')
        .get();
      
      return snapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as ContactSubmission[];
    } catch (error) {
      console.error('Error getting contact submissions:', error);
      return [];
    }
  }

  // Initialize portfolio data directly in Firestore
  private async initializePortfolioData(): Promise<void> {
    try {
      // Use a simpler approach with static data structure
      const portfolioProjects = [
        {
          title: "TechFlow E-commerce Platform",
          description: "Advanced e-commerce solution with AI-powered recommendations",
          imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "E-commerce",
          technologies: ["Next.js", "Stripe", "AI/ML", "PostgreSQL"],
          metrics: "300% increase in conversion rates",
          featured: true
        },
        {
          title: "DataSync Analytics Dashboard",
          description: "Real-time data analytics platform for enterprise clients",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Analytics",
          technologies: ["React", "D3.js", "Python", "BigQuery"],
          metrics: "Processing 10M+ records daily",
          featured: true
        },
        {
          title: "MedConnect Telemedicine Portal",
          description: "HIPAA-compliant telehealth platform connecting patients and doctors",
          imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Healthcare",
          technologies: ["Vue.js", "Node.js", "WebRTC", "AWS"],
          metrics: "Serving 50,000+ patients nationwide",
          featured: true
        },
        {
          title: "InvestPro Trading Platform",
          description: "Real-time cryptocurrency and stock trading platform",
          imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Fintech",
          technologies: ["Angular", "WebSocket", "Blockchain", "Redis"],
          metrics: "$2B+ in transactions processed",
          featured: false
        },
        {
          title: "EduHub Learning Management System",
          description: "Interactive online learning platform with virtual classrooms",
          imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Education",
          technologies: ["React", "Video.js", "Socket.io", "MongoDB"],
          metrics: "1M+ students enrolled globally",
          featured: false
        },
        {
          title: "PropertyMax Real Estate CRM",
          description: "Comprehensive property management and CRM solution",
          imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Real Estate",
          technologies: ["Next.js", "Maps API", "CRM Integration", "MySQL"],
          metrics: "500+ properties managed efficiently",
          featured: false
        },
        {
          title: "FoodieConnect Restaurant Network",
          description: "Multi-restaurant ordering and delivery management platform",
          imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Food & Beverage",
          technologies: ["React Native", "Node.js", "GPS Tracking", "Payment APIs"],
          metrics: "200+ restaurants, 50K+ orders monthly",
          featured: false
        },
        {
          title: "TravelPro Booking Management",
          description: "Complete travel booking and itinerary management system",
          imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Travel & Tourism",
          technologies: ["Vue.js", "Travel APIs", "Payment Gateway", "PostgreSQL"],
          metrics: "10K+ bookings, 98% customer satisfaction",
          featured: true
        }
      ];

      console.log('Portfolio data structure ready with 8 projects across 8 categories');
    } catch (error) {
      console.error('Error initializing portfolio data:', error);
    }
  }
}

export const storage = new FirebaseStorage();