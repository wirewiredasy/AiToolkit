import { User, ToolUsage, UserFile, InsertUser, InsertToolUsage, InsertUserFile } from "@shared/schema";

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;

  // Tool usage operations
  createToolUsage(usage: InsertToolUsage): Promise<ToolUsage>;
  getToolUsageByUserId(userId: number): Promise<ToolUsage[]>;
  getToolUsageStats(): Promise<{ toolName: string; count: number }[]>;

  // User file operations
  createUserFile(file: InsertUserFile): Promise<UserFile>;
  getUserFilesByUserId(userId: number): Promise<UserFile[]>;
  deleteExpiredFiles(): Promise<void>;
  deleteFileById(id: number): Promise<void>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: User[] = [];
  private toolUsages: ToolUsage[] = [];
  private userFiles: UserFile[] = [];
  private nextUserId = 1;
  private nextToolUsageId = 1;
  private nextFileId = 1;

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: this.nextUserId++,
      ...user,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async createToolUsage(usage: InsertToolUsage): Promise<ToolUsage> {
    const newUsage: ToolUsage = {
      id: this.nextToolUsageId++,
      userId: usage.userId || null,
      toolName: usage.toolName,
      toolCategory: usage.toolCategory,
      fileName: usage.fileName || null,
      fileSize: usage.fileSize || null,
      processingTime: usage.processingTime || null,
      success: usage.success,
      metadata: usage.metadata || null,
      createdAt: new Date(),
    };
    this.toolUsages.push(newUsage);
    return newUsage;
  }

  async getToolUsageByUserId(userId: number): Promise<ToolUsage[]> {
    return this.toolUsages.filter(usage => usage.userId === userId);
  }

  async getToolUsageStats(): Promise<{ toolName: string; count: number }[]> {
    const stats = new Map<string, number>();
    this.toolUsages.forEach(usage => {
      const count = stats.get(usage.toolName) || 0;
      stats.set(usage.toolName, count + 1);
    });
    
    return Array.from(stats.entries()).map(([toolName, count]) => ({
      toolName,
      count
    }));
  }

  async createUserFile(file: InsertUserFile): Promise<UserFile> {
    const newFile: UserFile = {
      id: this.nextFileId++,
      userId: file.userId || null,
      originalName: file.originalName,
      storedName: file.storedName,
      filePath: file.filePath,
      fileSize: file.fileSize,
      mimeType: file.mimeType,
      toolUsageId: file.toolUsageId || null,
      expiresAt: file.expiresAt,
      createdAt: new Date(),
    };
    this.userFiles.push(newFile);
    return newFile;
  }

  async getUserFilesByUserId(userId: number): Promise<UserFile[]> {
    return this.userFiles.filter(file => file.userId === userId);
  }

  async deleteExpiredFiles(): Promise<void> {
    const now = new Date();
    this.userFiles = this.userFiles.filter(file => file.expiresAt > now);
  }

  async deleteFileById(id: number): Promise<void> {
    this.userFiles = this.userFiles.filter(file => file.id !== id);
  }
}

// Global storage instance
export const storage = new MemStorage();