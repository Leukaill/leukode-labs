import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

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
const ADMIN_FILE_PATH = path.join(process.cwd(), 'data', 'admin.json');

export class AdminAuth {
  // Ensure data directory exists
  private async ensureDataDir(): Promise<void> {
    const dataDir = path.dirname(ADMIN_FILE_PATH);
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
  }

  // Read admin data from file
  private async readAdminData(): Promise<AdminUser | null> {
    try {
      await this.ensureDataDir();
      const data = await fs.readFile(ADMIN_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return null; // File doesn't exist or is invalid
    }
  }

  // Write admin data to file
  private async writeAdminData(admin: AdminUser): Promise<void> {
    try {
      await this.ensureDataDir();
      await fs.writeFile(ADMIN_FILE_PATH, JSON.stringify(admin, null, 2));
    } catch (error) {
      console.error('Error writing admin data:', error);
      throw error;
    }
  }

  // Create the single admin user (only one allowed)
  async createAdmin(adminData: CreateAdminData): Promise<AdminUser> {
    try {
      // Check if any admin already exists
      const existingAdmin = await this.readAdminData();
      if (existingAdmin) {
        throw new Error('An admin user already exists. Only one admin is allowed.');
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

      const admin: AdminUser = {
        id: 'admin-' + Date.now(),
        username: adminData.username,
        password: hashedPassword,
        email: adminData.email,
        role: 'admin',
        createdAt: new Date()
      };

      await this.writeAdminData(admin);
      console.log('Admin user created successfully:', adminData.username);
      return admin;
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
      admin.lastLogin = new Date();
      await this.writeAdminData(admin);

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
      const admin = await this.readAdminData();
      if (admin && admin.username === username) {
        return admin;
      }
      return null;
    } catch (error) {
      console.error('Error getting admin by username:', error);
      return null;
    }
  }

  // Check if admin exists (used to determine if registration is allowed)
  async adminExists(): Promise<boolean> {
    try {
      const admin = await this.readAdminData();
      return admin !== null;
    } catch (error) {
      console.error('Error checking admin existence:', error);
      return false; // Return false to allow registration if file system fails
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