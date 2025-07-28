
import type { Express } from "express";
import fs from "fs/promises";
import path from "path";

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export class SitemapRobotsGenerator {
  private baseUrl: string;
  private toolRoutes: string[] = [];
  private staticPages: string[] = [];

  constructor(baseUrl = 'https://suntyn-ai.com') {
    this.baseUrl = baseUrl;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Static pages
    this.staticPages = [
      '/',
      '/about',
      '/contact',
      '/help',
      '/privacy',
      '/terms',
      '/all-tools',
      '/toolkit/pdf',
      '/toolkit/image', 
      '/toolkit/media',
      '/toolkit/government',
      '/toolkit/developer'
    ];

    // All 108+ tool routes
    this.toolRoutes = [
      // PDF Tools
      'pdf-merger', 'pdf-splitter', 'pdf-compressor', 'pdf-to-word', 'word-to-pdf',
      'pdf-to-excel', 'excel-to-pdf', 'pdf-to-powerpoint', 'powerpoint-to-pdf',
      'pdf-to-image', 'image-to-pdf', 'pdf-unlock', 'pdf-lock', 'pdf-rotate',
      'pdf-watermark', 'pdf-page-extractor', 'pdf-page-numberer', 'pdf-text-extract',
      'text-to-pdf', 'pdf-metadata', 'pdf-ocr', 'pdf-sign', 'pdf-repair',
      'pdf-organize', 'pdf-bookmark',

      // Image Tools
      'image-resizer', 'image-compressor', 'image-converter', 'bg-remover',
      'image-cropper', 'image-rotator', 'image-flipper', 'image-filter',
      'image-enhance', 'image-upscale', 'watermark-add', 'watermark-remover',
      'image-blur', 'image-sharpen', 'image-border', 'image-metadata',
      'meme-generator', 'image-colorizer', 'image-merge', 'image-split',

      // Audio/Video Tools
      'audio-converter', 'video-converter', 'audio-trimmer', 'video-trimmer',
      'audio-merger', 'video-merger', 'audio-extractor', 'video-compressor',
      'audio-compressor', 'volume-changer', 'speed-changer', 'audio-normalizer',
      'noise-reducer', 'vocal-remover', 'audio-reverser', 'pitch-changer',
      'video-resizer', 'video-rotator', 'video-to-gif', 'gif-to-video',

      // Government Tools
      'pan-validator', 'gst-validator', 'aadhaar-validator', 'aadhaar-masker',
      'voter-id-extractor', 'income-certificate', 'caste-certificate',
      'birth-certificate', 'death-certificate', 'ration-card-status',
      'passport-photo', 'rent-agreement', 'affidavit-generator',
      'police-verification', 'gazette-formatter',

      // Developer Tools
      'json-formatter', 'xml-formatter', 'csv-to-json', 'json-to-csv',
      'base64-encoder', 'url-encoder', 'hash-generator', 'password-generator',
      'qr-generator', 'barcode-generator', 'color-picker', 'lorem-ipsum',
      'regex-tester', 'timestamp-converter', 'unit-converter',
      'markdown-to-html', 'html-to-pdf', 'css-minifier', 'js-minifier',
      'image-to-base64', 'url-shortener', 'meta-tag-generator',
      'favicon-generator', 'logo-generator', 'color-palette-generator',
      'text-to-speech', 'speech-to-text', 'unicode-converter'
    ];
  }

  private generateRobotsTxt(): string {
    const currentDate = new Date().toISOString().split('T')[0];
    
    return `# Robots.txt for Suntyn AI - Neural Intelligence Platform
# Generated automatically on ${currentDate}
# Visit: ${this.baseUrl}

User-agent: *
Allow: /

# Important pages
Allow: /all-tools
Allow: /toolkit/
Allow: /tool/

# API endpoints - restricted for crawlers
Disallow: /api/
Disallow: /auth/
Disallow: /uploads/

# Allow specific tool endpoints for better SEO
${this.toolRoutes.map(tool => `Allow: /tool/${tool}`).join('\n')}

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemap-tools.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Contact info
# Contact: support@suntynai.com
# For more info: ${this.baseUrl}/contact
`;
  }

  private generateMainSitemap(): string {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const staticEntries: SitemapEntry[] = this.staticPages.map(page => ({
      url: `${this.baseUrl}${page}`,
      lastmod: currentDate,
      changefreq: page === '/' ? 'daily' : 'weekly',
      priority: page === '/' ? '1.0' : '0.8'
    }));

    return this.generateSitemapXML(staticEntries);
  }

  private generateToolsSitemap(): string {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const toolEntries: SitemapEntry[] = this.toolRoutes.map(tool => ({
      url: `${this.baseUrl}/tool/${tool}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    }));

    return this.generateSitemapXML(toolEntries);
  }

  private generateSitemapIndex(): string {
    const currentDate = new Date().toISOString();
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${this.baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${this.baseUrl}/sitemap-tools.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;
  }

  private generateSitemapXML(entries: SitemapEntry[]): string {
    const currentDate = new Date().toISOString();
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Sitemap for Suntyn AI - Generated automatically on ${currentDate} -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  }

  public async generateAllFiles(): Promise<void> {
    try {
      const publicDir = path.join(process.cwd(), 'client', 'public');
      
      // Ensure public directory exists
      await fs.mkdir(publicDir, { recursive: true });

      // Generate robots.txt
      const robotsTxt = this.generateRobotsTxt();
      await fs.writeFile(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');

      // Generate main sitemap
      const mainSitemap = this.generateMainSitemap();
      await fs.writeFile(path.join(publicDir, 'sitemap.xml'), mainSitemap, 'utf-8');

      // Generate tools sitemap
      const toolsSitemap = this.generateToolsSitemap();
      await fs.writeFile(path.join(publicDir, 'sitemap-tools.xml'), toolsSitemap, 'utf-8');

      // Generate sitemap index
      const sitemapIndex = this.generateSitemapIndex();
      await fs.writeFile(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex, 'utf-8');

      console.log('✅ Successfully generated:');
      console.log('  - robots.txt');
      console.log('  - sitemap.xml');
      console.log('  - sitemap-tools.xml');
      console.log('  - sitemap-index.xml');
      
    } catch (error) {
      console.error('❌ Error generating sitemap/robots files:', error);
      throw error;
    }
  }

  public setupAutoGeneration(app: Express): void {
    // Auto-generate on server start
    this.generateAllFiles();

    // API endpoint to manually trigger regeneration
    app.get('/api/generate-sitemap', async (req, res) => {
      try {
        await this.generateAllFiles();
        res.json({ 
          success: true, 
          message: 'Sitemap and robots.txt regenerated successfully',
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          message: 'Failed to regenerate sitemap',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    });

    // Serve robots.txt
    app.get('/robots.txt', async (req, res) => {
      try {
        const robotsPath = path.join(process.cwd(), 'client', 'public', 'robots.txt');
        const robotsContent = await fs.readFile(robotsPath, 'utf-8');
        res.setHeader('Content-Type', 'text/plain');
        res.send(robotsContent);
      } catch (error) {
        res.status(404).send('robots.txt not found');
      }
    });

    // Serve sitemaps
    app.get('/sitemap.xml', async (req, res) => {
      try {
        const sitemapPath = path.join(process.cwd(), 'client', 'public', 'sitemap.xml');
        const sitemapContent = await fs.readFile(sitemapPath, 'utf-8');
        res.setHeader('Content-Type', 'application/xml');
        res.send(sitemapContent);
      } catch (error) {
        res.status(404).send('sitemap.xml not found');
      }
    });

    app.get('/sitemap-tools.xml', async (req, res) => {
      try {
        const sitemapPath = path.join(process.cwd(), 'client', 'public', 'sitemap-tools.xml');
        const sitemapContent = await fs.readFile(sitemapPath, 'utf-8');
        res.setHeader('Content-Type', 'application/xml');
        res.send(sitemapContent);
      } catch (error) {
        res.status(404).send('sitemap-tools.xml not found');
      }
    });

    app.get('/sitemap-index.xml', async (req, res) => {
      try {
        const sitemapPath = path.join(process.cwd(), 'client', 'public', 'sitemap-index.xml');
        const sitemapContent = await fs.readFile(sitemapPath, 'utf-8');
        res.setHeader('Content-Type', 'application/xml');
        res.send(sitemapContent);
      } catch (error) {
        res.status(404).send('sitemap-index.xml not found');
      }
    });

    // Auto-regenerate every 24 hours
    setInterval(async () => {
      console.log('🔄 Auto-regenerating sitemap and robots.txt...');
      try {
        await this.generateAllFiles();
        console.log('✅ Auto-regeneration completed');
      } catch (error) {
        console.error('❌ Auto-regeneration failed:', error);
      }
    }, 24 * 60 * 60 * 1000); // 24 hours
  }
}
