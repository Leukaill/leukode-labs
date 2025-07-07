import admin from 'firebase-admin';

// Initialize Firebase Admin (server-side)
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "leukail-tech",
    // Note: In production, use service account key or Application Default Credentials
    // For now, we'll use the project ID for basic Firestore access
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();

export default admin;