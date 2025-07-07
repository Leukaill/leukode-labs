import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import type { 
  User, 
  InsertUser, 
  Project, 
  InsertProject, 
  ContactSubmission, 
  InsertContact 
} from '@shared/schema';

// Collections
const COLLECTIONS = {
  USERS: 'users',
  PROJECTS: 'projects',
  CONTACTS: 'contacts'
} as const;

export class FirebaseStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    try {
      const docRef = doc(db, COLLECTIONS.USERS, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as User;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const q = query(
        collection(db, COLLECTIONS.USERS), 
        where('username', '==', username),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as User;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const userWithTimestamp = {
        ...user,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.USERS), userWithTimestamp);
      const newUser = { id: docRef.id, ...user } as User;
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.PROJECTS),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
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
      const q = query(
        collection(db, COLLECTIONS.PROJECTS),
        where('featured', '==', true),
        orderBy('createdAt', 'desc'),
        limit(6)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
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
      const docRef = doc(db, COLLECTIONS.PROJECTS, id.toString());
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: parseInt(docSnap.id),
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate() || new Date()
        } as Project;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting project:', error);
      return undefined;
    }
  }

  async createProject(project: InsertProject): Promise<Project> {
    try {
      const projectWithTimestamp = {
        ...project,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.PROJECTS), projectWithTimestamp);
      const newProject = { 
        id: parseInt(docRef.id), 
        ...project,
        createdAt: new Date()
      } as Project;
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Contact operations
  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    try {
      const contactWithTimestamp = {
        ...contact,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.CONTACTS), contactWithTimestamp);
      const newContact = { 
        id: parseInt(docRef.id), 
        ...contact,
        createdAt: new Date()
      } as ContactSubmission;
      return newContact;
    } catch (error) {
      console.error('Error creating contact submission:', error);
      throw error;
    }
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.CONTACTS),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as ContactSubmission[];
    } catch (error) {
      console.error('Error getting contact submissions:', error);
      return [];
    }
  }

  // Initialize sample data for demonstration
  async initializeSampleData(): Promise<void> {
    try {
      // Check if projects already exist
      const existingProjects = await this.getProjects();
      if (existingProjects.length > 0) {
        console.log('Sample data already exists');
        return;
      }

      const sampleProjects = [
        {
          title: "TechFlow E-commerce",
          description: "Next.js • Stripe • Headless CMS",
          imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "E-commerce",
          technologies: ["Next.js", "Stripe", "Headless CMS"],
          metrics: "300% increase in conversion rates",
          featured: true
        },
        {
          title: "DataSync Analytics",
          description: "React • D3.js • PostgreSQL",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Analytics",
          technologies: ["React", "D3.js", "PostgreSQL"],
          metrics: "Real-time data processing for 10M+ records",
          featured: true
        },
        {
          title: "MedConnect Portal",
          description: "Vue.js • Node.js • HIPAA Compliant",
          imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Healthcare",
          technologies: ["Vue.js", "Node.js", "HIPAA"],
          metrics: "Serving 50,000+ patients nationwide",
          featured: true
        },
        {
          title: "InvestPro Platform",
          description: "Angular • WebSocket • Microservices",
          imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Fintech",
          technologies: ["Angular", "WebSocket", "Microservices"],
          metrics: "$2B+ in transactions processed",
          featured: false
        },
        {
          title: "LearnHub Academy",
          description: "React • Video.js • AWS",
          imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Education",
          technologies: ["React", "Video.js", "AWS"],
          metrics: "1M+ students enrolled",
          featured: false
        },
        {
          title: "PropertyMax CRM",
          description: "React • Node.js • MongoDB",
          imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          category: "Real Estate",
          technologies: ["React", "Node.js", "MongoDB"],
          metrics: "Streamlined 500+ property transactions",
          featured: false
        }
      ];

      // Create sample projects
      for (const project of sampleProjects) {
        await this.createProject(project as InsertProject);
      }

      console.log('Sample data initialized successfully');
    } catch (error) {
      console.error('Error initializing sample data:', error);
    }
  }
}

export const firebaseStorage = new FirebaseStorage();