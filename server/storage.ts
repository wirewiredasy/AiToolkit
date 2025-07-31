import { User, InsertUser, ToolUsage, InsertToolUsage, UserFile, InsertUserFile } from "@shared/schema";

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;

  // Tool usage operations
  createToolUsage(toolUsage: InsertToolUsage): Promise<ToolUsage>;
  getToolUsageByUserId(userId: number): Promise<ToolUsage[]>;
  updateToolUsage(id: number, updates: Partial<ToolUsage>): Promise<ToolUsage>;

  // User files operations
  createUserFile(userFile: InsertUserFile): Promise<UserFile>;
  getUserFilesByUserId(userId: number): Promise<UserFile[]>;
  getUserFileById(id: number): Promise<UserFile | null>;
  deleteUserFile(id: number): Promise<void>;
  deleteExpiredFiles(): Promise<void>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: User[] = [];
  private toolUsage: ToolUsage[] = [];
  private userFiles: UserFile[] = [];
  private nextUserId = 1;
  private nextToolUsageId = 1;
  private nextUserFileId = 1;

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

  async createToolUsage(toolUsage: InsertToolUsage): Promise<ToolUsage> {
    const newToolUsage: ToolUsage = {
      id: this.nextToolUsageId++,
      userId: toolUsage.userId || null,
      toolName: toolUsage.toolName,
      toolCategory: toolUsage.toolCategory,
      fileName: toolUsage.fileName || null,
      fileSize: toolUsage.fileSize || null,
      processingTime: toolUsage.processingTime || null,
      success: toolUsage.success,
      metadata: toolUsage.metadata || null,
      createdAt: new Date(),
    };
    this.toolUsage.push(newToolUsage);
    return newToolUsage;
  }

  async getToolUsageByUserId(userId: number): Promise<ToolUsage[]> {
    return this.toolUsage.filter(usage => usage.userId === userId);
  }

  async updateToolUsage(id: number, updates: Partial<ToolUsage>): Promise<ToolUsage> {
    const index = this.toolUsage.findIndex(usage => usage.id === id);
    if (index === -1) {
      throw new Error('Tool usage not found');
    }
    this.toolUsage[index] = { ...this.toolUsage[index], ...updates };
    return this.toolUsage[index];
  }

  async createUserFile(userFile: InsertUserFile): Promise<UserFile> {
    const newUserFile: UserFile = {
      id: this.nextUserFileId++,
      userId: userFile.userId || null,
      originalName: userFile.originalName,
      storedName: userFile.storedName,
      filePath: userFile.filePath,
      fileSize: userFile.fileSize,
      mimeType: userFile.mimeType,
      toolUsageId: userFile.toolUsageId || null,
      expiresAt: userFile.expiresAt,
      createdAt: new Date(),
    };
    this.userFiles.push(newUserFile);
    return newUserFile;
  }

  async getUserFilesByUserId(userId: number): Promise<UserFile[]> {
    return this.userFiles.filter(file => file.userId === userId);
  }

  async getUserFileById(id: number): Promise<UserFile | null> {
    return this.userFiles.find(file => file.id === id) || null;
  }

  async deleteUserFile(id: number): Promise<void> {
    const index = this.userFiles.findIndex(file => file.id === id);
    if (index !== -1) {
      this.userFiles.splice(index, 1);
    }
  }

  async deleteExpiredFiles(): Promise<void> {
    const now = new Date();
    this.userFiles = this.userFiles.filter(file => file.expiresAt > now);
  }
}

export const storage = new MemStorage();