import { adminDb } from './firebase-admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface AdminUser {
  id: string;
  username: string;
  password: string;
  email: string;
  role: 'admin';
  createdAt: Date;
  lastLogin?: Date;
}

interface CreateAdminData {
  username: string;
  password: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'arc-labs-luxury-admin-secret-2025';
const ADMIN_COLLECTION = 'admin_users';

export class AdminAuth {
  // Create the single admin user (only one allowed)
  async createAdmin(adminData: CreateAdminData): Promise<AdminUser> {
    try {
      // Check if any admin already exists
      const snapshot = await adminDb.collection(ADMIN_COLLECTION).limit(1).get();
      if (!snapshot.empty) {
        throw new Error('An admin user already exists. Only one admin is allowed.');
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

      const admin: Omit<AdminUser, 'id'> = {
        username: adminData.username,
        password: hashedPassword,
        email: adminData.email,
        role: 'admin',
        createdAt: new Date()
      };

      const docRef = await adminDb.collection(ADMIN_COLLECTION).add(admin);
      return { id: docRef.id, ...admin };
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  // Authenticate admin login
  async authenticateAdmin(username: string, password: string): Promise<string | null> {
    try {
      const admin = await this.getAdminByUsername(username);
      if (!admin) {
        return null;
      }

      // Verify password
      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) {
        return null;
      }

      // Update last login
      await adminDb.collection(ADMIN_COLLECTION).doc(admin.id).update({
        lastLogin: new Date()
      });

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: admin.id, 
          username: admin.username,
          role: admin.role 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return token;
    } catch (error) {
      console.error('Error authenticating admin:', error);
      return null;
    }
  }

  // Verify JWT token
  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  // Get admin by username
  private async getAdminByUsername(username: string): Promise<AdminUser | null> {
    try {
      const snapshot = await adminDb
        .collection(ADMIN_COLLECTION)
        .where('username', '==', username)
        .limit(1)
        .get();

      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as AdminUser;
    } catch (error) {
      console.error('Error getting admin by username:', error);
      return null;
    }
  }

  // Check if admin exists (used to determine if registration is allowed)
  async adminExists(): Promise<boolean> {
    try {
      const snapshot = await adminDb.collection(ADMIN_COLLECTION).limit(1).get();
      return !snapshot.empty;
    } catch (error) {
      console.error('Error checking admin existence:', error);
      return true; // Return true to prevent registration on error
    }
  }
}

// Middleware to protect admin routes
export function requireAdminAuth(req: any, res: any, next: any) {
  const token = req.headers.authorization?.replace('Bearer ', '') || 
                req.cookies?.admin_token ||
                req.body?.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const adminAuth = new AdminAuth();
  adminAuth.verifyToken(token)
    .then(decoded => {
      if (!decoded || decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }
      req.admin = decoded;
      next();
    })
    .catch(() => {
      res.status(401).json({ message: 'Invalid token' });
    });
}

export const adminAuth = new AdminAuth();