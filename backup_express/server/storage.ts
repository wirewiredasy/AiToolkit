import { users, toolUsage, userFiles, type User, type InsertUser, type ToolUsage, type InsertToolUsage, type UserFile, type InsertUserFile } from "@shared/schema";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tool usage tracking
  createToolUsage(usage: InsertToolUsage): Promise<ToolUsage>;
  getUserToolUsage(userId: number, limit?: number): Promise<ToolUsage[]>;
  getToolUsageStats(userId: number): Promise<{
    filesProcessed: number;
    toolsUsed: number;
    totalTime: number;
  }>;
  
  // File management
  createUserFile(file: InsertUserFile): Promise<UserFile>;
  getUserFiles(userId: number): Promise<UserFile[]>;
  deleteExpiredFiles(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private toolUsage: Map<number, ToolUsage>;
  private userFiles: Map<number, UserFile>;
  private currentUserId: number;
  private currentUsageId: number;
  private currentFileId: number;

  constructor() {
    this.users = new Map();
    this.toolUsage = new Map();
    this.userFiles = new Map();
    this.currentUserId = 1;
    this.currentUsageId = 1;
    this.currentFileId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async createToolUsage(insertUsage: InsertToolUsage): Promise<ToolUsage> {
    const id = this.currentUsageId++;
    const usage: ToolUsage = {
      id,
      createdAt: new Date(),
      userId: insertUsage.userId || null,
      toolName: insertUsage.toolName,
      toolCategory: insertUsage.toolCategory,
      fileName: insertUsage.fileName || null,
      fileSize: insertUsage.fileSize || null,
      processingTime: insertUsage.processingTime || null,
      success: insertUsage.success,
      metadata: insertUsage.metadata || null,
    };
    this.toolUsage.set(id, usage);
    return usage;
  }

  async getUserToolUsage(userId: number, limit = 10): Promise<ToolUsage[]> {
    return Array.from(this.toolUsage.values())
      .filter(usage => usage.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
  }

  async getToolUsageStats(userId: number): Promise<{
    filesProcessed: number;
    toolsUsed: number;
    totalTime: number;
  }> {
    const userUsage = Array.from(this.toolUsage.values())
      .filter(usage => usage.userId === userId && usage.success);
    
    const uniqueTools = new Set(userUsage.map(usage => usage.toolName));
    const totalTime = userUsage.reduce((sum, usage) => sum + (usage.processingTime || 0), 0);

    return {
      filesProcessed: userUsage.length,
      toolsUsed: uniqueTools.size,
      totalTime,
    };
  }

  async createUserFile(insertFile: InsertUserFile): Promise<UserFile> {
    const id = this.currentFileId++;
    const file: UserFile = {
      id,
      createdAt: new Date(),
      userId: insertFile.userId || null,
      originalName: insertFile.originalName,
      storedName: insertFile.storedName,
      filePath: insertFile.filePath,
      fileSize: insertFile.fileSize,
      mimeType: insertFile.mimeType,
      toolUsageId: insertFile.toolUsageId || null,
      expiresAt: insertFile.expiresAt,
    };
    this.userFiles.set(id, file);
    return file;
  }

  async getUserFiles(userId: number): Promise<UserFile[]> {
    return Array.from(this.userFiles.values())
      .filter(file => file.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async deleteExpiredFiles(): Promise<void> {
    const now = new Date();
    const entries = Array.from(this.userFiles.entries());
    for (const [id, file] of entries) {
      if (file.expiresAt && file.expiresAt < now) {
        this.userFiles.delete(id);
      }
    }
  }
}

export const storage = new MemStorage();
