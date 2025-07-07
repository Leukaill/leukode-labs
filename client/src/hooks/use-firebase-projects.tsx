import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Project } from '@/types/portfolio';

export const useFirebaseProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Try Firebase first
        const projectsRef = collection(db, 'arc_labs_projects');
        const q = query(projectsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const firebaseProjects = snapshot.docs.map(doc => ({
            id: parseInt(doc.id),
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          })) as Project[];
          
          setProjects(firebaseProjects);
          console.log(`✅ Loaded ${firebaseProjects.length} projects from Firebase`);
        } else {
          // Fallback to API
          throw new Error('No projects found in Firebase');
        }
      } catch (firebaseError) {
        console.log('Firebase not available, using API fallback');
        
        try {
          const response = await fetch('/api/projects');
          if (!response.ok) throw new Error('API request failed');
          
          const apiProjects = await response.json();
          setProjects(apiProjects);
          console.log(`✅ Loaded ${apiProjects.length} projects from API`);
        } catch (apiError) {
          setError('Failed to load projects from both Firebase and API');
          console.error('Error loading projects:', apiError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

export const useFirebaseFeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        // Try Firebase first
        const projectsRef = collection(db, 'arc_labs_projects');
        const q = query(
          projectsRef, 
          where('featured', '==', true),
          orderBy('createdAt', 'desc'),
          limit(6)
        );
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const firebaseProjects = snapshot.docs.map(doc => ({
            id: parseInt(doc.id),
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          })) as Project[];
          
          setProjects(firebaseProjects);
          console.log(`✅ Loaded ${firebaseProjects.length} featured projects from Firebase`);
        } else {
          throw new Error('No featured projects found in Firebase');
        }
      } catch (firebaseError) {
        console.log('Firebase not available, using API fallback');
        
        try {
          const response = await fetch('/api/projects/featured');
          const apiProjects = await response.json();
          setProjects(apiProjects);
          console.log(`✅ Loaded ${apiProjects.length} featured projects from API`);
        } catch (apiError) {
          console.error('Error loading featured projects:', apiError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return { projects, loading };
};

// Function to seed Firebase with projects from client-side
export const seedFirebaseProjects = async () => {
  try {
    const projectsToSeed = [
      {
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
        title: "GameVerse Entertainment Hub",
        description: "Multiplayer gaming platform with social features and tournaments",
        imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Gaming & Entertainment",
        technologies: ["Unity", "Node.js", "Socket.io", "Redis"],
        metrics: "500K+ active gamers, 1M+ tournaments",
        featured: true,
        createdAt: new Date()
      }
    ];

    // This would require admin privileges which we don't have in client-side
    // For now, we'll rely on the fallback system
    console.log('Client-side seeding not implemented (requires admin privileges)');
    return false;
  } catch (error) {
    console.error('Error seeding Firebase:', error);
    return false;
  }
};