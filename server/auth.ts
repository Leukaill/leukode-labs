// Fallback auth storage for development
const adminUsers = new Map<string, any>();
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
  // Create the single admin user (run once during setup)
  async createAdmin(adminData: CreateAdminData): Promise<AdminUser> {
    try {
      // Check if admin already exists
      const existingAdmin = await this.getAdminByUsername(adminData.username);
      if (existingAdmin) {
        throw new Error('Admin user already exists');
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

      const admin: AdminUser = {
        id: 'admin-1',
        username: adminData.username,
        password: hashedPassword,
        email: adminData.email,
        role: 'admin',
        createdAt: new Date()
      };

      adminUsers.set(adminData.username, admin);
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
      adminUsers.set(admin.username, admin);

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
      return adminUsers.get(username) || null;
    } catch (error) {
      console.error('Error getting admin by username:', error);
      return null;
    }
  }

  // Initialize default admin if none exists
  async initializeDefaultAdmin(): Promise<void> {
    try {
      if (adminUsers.size === 0) {
        console.log('Creating default admin user...');
        await this.createAdmin({
          username: 'admin',
          password: 'ArcLabs2025!',
          email: 'lucienshungofficial@gmail.com'
        });
        console.log('Default admin created: username=admin, password=ArcLabs2025!');
      }
    } catch (error) {
      console.error('Error initializing default admin:', error);
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