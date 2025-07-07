import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupVite, serveStatic, log } from "./vite";
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';

// Initialize Firebase Admin
const app = initializeApp({
  projectId: "leukail-tech"
});
const db = getFirestore(app);

export async function registerRoutes(app: Express): Promise<Server> {
  // Projects API routes with Firebase
  app.get("/api/projects", async (req, res) => {
    try {
      const snapshot = await db.collection('arc_labs_projects').orderBy('createdAt', 'desc').get();
      const projects = snapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      
      log(`📊 Fetched ${projects.length} projects from Firestore`);
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects from Firestore:', error);
      // Fallback to the local storage
      try {
        const { storage } = await import("./storage");
        const projects = await storage.getProjects();
        log(`📊 Fallback: Fetched ${projects.length} projects from local storage`);
        res.json(projects);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        res.status(500).json({ error: 'Failed to fetch projects' });
      }
    }
  });

  app.get("/api/projects/featured", async (req, res) => {
    try {
      const snapshot = await db.collection('arc_labs_projects')
        .where('featured', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(6)
        .get();
      
      const projects = snapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      
      log(`⭐ Fetched ${projects.length} featured projects from Firestore`);
      res.json(projects);
    } catch (error) {
      console.error('Error fetching featured projects from Firestore:', error);
      // Fallback to the local storage
      try {
        const { storage } = await import("./storage");
        const projects = await storage.getFeaturedProjects();
        log(`⭐ Fallback: Fetched ${projects.length} featured projects from local storage`);
        res.json(projects);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        res.status(500).json({ error: 'Failed to fetch featured projects' });
      }
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const doc = await db.collection('arc_labs_projects').doc(id.toString()).get();
      
      if (doc.exists) {
        const project = {
          id: parseInt(doc.id),
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        };
        res.json(project);
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    } catch (error) {
      console.error('Error fetching project from Firestore:', error);
      // Fallback to the local storage
      try {
        const { storage } = await import("./storage");
        const project = await storage.getProject(parseInt(req.params.id));
        if (project) {
          res.json(project);
        } else {
          res.status(404).json({ error: 'Project not found' });
        }
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        res.status(500).json({ error: 'Failed to fetch project' });
      }
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await db.collection('arc_labs_contacts').add(contactData);
      const contact = { 
        id: parseInt(docRef.id), 
        ...req.body,
        createdAt: new Date()
      };
      
      log(`📧 Contact submission saved to Firestore`);
      res.json(contact);
    } catch (error) {
      console.error('Error saving contact to Firestore:', error);
      // Fallback to the local storage
      try {
        const { storage } = await import("./storage");
        const contact = await storage.createContactSubmission(req.body);
        log(`📧 Fallback: Contact submission saved to local storage`);
        res.json(contact);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        res.status(500).json({ error: 'Failed to save contact submission' });
      }
    }
  });

  const server = createServer(app);

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  return server;
}