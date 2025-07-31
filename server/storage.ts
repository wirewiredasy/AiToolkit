import { User, InsertUser, ToolHistory, InsertToolHistory, FileUpload, InsertFileUpload } from "@shared/schema";

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;

  // Tool history operations
  createToolHistory(history: InsertToolHistory): Promise<ToolHistory>;
  getToolHistoryByUserId(userId: number): Promise<ToolHistory[]>;
  updateToolHistoryStatus(id: number, status: string, outputData?: string, processingTime?: number): Promise<void>;

  // File upload operations
  createFileUpload(file: InsertFileUpload): Promise<FileUpload>;
  getFileUploadById(id: number): Promise<FileUpload | null>;
  cleanupExpiredFiles(): Promise<void>;
  getFileUploadsByUserId(userId: number): Promise<FileUpload[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: User[] = [];
  private toolHistory: ToolHistory[] = [];
  private fileUploads: FileUpload[] = [];
  private nextUserId = 1;
  private nextToolHistoryId = 1;
  private nextFileUploadId = 1;

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

  async createToolHistory(history: InsertToolHistory): Promise<ToolHistory> {
    const newHistory: ToolHistory = {
      id: this.nextToolHistoryId++,
      ...history,
      createdAt: new Date(),
    };
    this.toolHistory.push(newHistory);
    return newHistory;
  }

  async getToolHistoryByUserId(userId: number): Promise<ToolHistory[]> {
    return this.toolHistory.filter(history => history.userId === userId);
  }

  async updateToolHistoryStatus(id: number, status: string, outputData?: string, processingTime?: number): Promise<void> {
    const history = this.toolHistory.find(h => h.id === id);
    if (history) {
      history.status = status;
      if (outputData) history.outputData = outputData;
      if (processingTime) history.processingTime = processingTime;
    }
  }

  async createFileUpload(file: InsertFileUpload): Promise<FileUpload> {
    const newFile: FileUpload = {
      id: this.nextFileUploadId++,
      ...file,
      createdAt: new Date(),
    };
    this.fileUploads.push(newFile);
    return newFile;
  }

  async getFileUploadById(id: number): Promise<FileUpload | null> {
    return this.fileUploads.find(file => file.id === id) || null;
  }

  async cleanupExpiredFiles(): Promise<void> {
    const now = new Date();
    this.fileUploads = this.fileUploads.filter(file => file.expiresAt > now);
  }

  async getFileUploadsByUserId(userId: number): Promise<FileUpload[]> {
    return this.fileUploads.filter(file => file.userId === userId);
  }
}