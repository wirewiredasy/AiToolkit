
import fs from 'fs';
import path from 'path';
import { SitemapRobotsGenerator } from './sitemap-generator';

export class AutoUpdater {
  private sitemapGenerator: SitemapRobotsGenerator;
  private watchedDirectories: string[] = [];
  private isUpdating = false;

  constructor() {
    this.sitemapGenerator = new SitemapRobotsGenerator('https://suntyn-ai.com');
    this.initializeWatchers();
  }

  private initializeWatchers() {
    // Watch for changes in important directories
    this.watchedDirectories = [
      path.join(process.cwd(), 'client', 'src', 'pages'),
      path.join(process.cwd(), 'client', 'src', 'pages', 'tool'),
      path.join(process.cwd(), 'server')
    ];

    this.watchedDirectories.forEach(directory => {
      if (fs.existsSync(directory)) {
        this.setupDirectoryWatcher(directory);
      }
    });
  }

  private setupDirectoryWatcher(directory: string) {
    fs.watch(directory, { recursive: true }, (eventType, filename) => {
      if (filename && (filename.endsWith('.tsx') || filename.endsWith('.ts'))) {
        console.log(`📝 File changed: ${filename}`);
        this.scheduleUpdate();
      }
    });
  }

  private scheduleUpdate() {
    if (this.isUpdating) return;

    // Debounce updates - wait 5 seconds after last change
    setTimeout(async () => {
      if (!this.isUpdating) {
        this.isUpdating = true;
        await this.performUpdate();
        this.isUpdating = false;
      }
    }, 5000);
  }

  public startWatching() {
    console.log('🎯 Auto-updater started - monitoring file changes...');
    console.log('📁 Watching directories:', this.watchedDirectories);
  }

  private async performUpdate() {
    try {
      console.log('🔄 Auto-updating sitemap and robots.txt...');
      await this.sitemapGenerator.generateAllFiles();
      console.log('✅ Auto-update completed successfully');
    } catch (error) {
      console.error('❌ Auto-update failed:', error);
    }
  }

  public start() {
    console.log('🎯 Auto-updater started - monitoring file changes...');
    console.log(`📁 Watching directories:`, this.watchedDirectories);
  }
}
