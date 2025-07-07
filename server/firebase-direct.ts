// Direct Firebase operations to ensure data is written to Firestore
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
  projectId: "leukail-tech"
});

const db = getFirestore(app);

export async function writeProjectsToFirestore() {
  const projects = [
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
    }
  ];

  try {
    const batch = db.batch();
    
    projects.forEach(project => {
      const docRef = db.collection('arc_labs_projects').doc(project.id.toString());
      batch.set(docRef, project);
    });
    
    await batch.commit();
    console.log('Successfully wrote 9 projects to Firestore!');
    
    // Verify
    const snapshot = await db.collection('arc_labs_projects').get();
    console.log(`Verified: ${snapshot.size} projects in Firestore`);
    
    snapshot.forEach(doc => {
      console.log(`Project: ${doc.data().title} - Category: ${doc.data().category}`);
    });
    
  } catch (error) {
    console.error('Error writing to Firestore:', error);
  }
}

// Call this function
writeProjectsToFirestore();