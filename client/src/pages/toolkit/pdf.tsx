import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { getToolkitById } from '@/lib/tools';
import ToolIcon from '@/components/ui/tool-icon';

export default function PDFToolkit() {
  const toolkit = getToolkitById('pdf');

  if (!toolkit) {
    return <div>Toolkit not found</div>;
  }

  const pdfTools = [
    { id: 'pdf-merger', name: 'PDF Merger', description: 'Combine multiple PDF files into one', icon: 'fas fa-compress-alt', route: '/tool/pdf-merger' },
    { id: 'pdf-splitter', name: 'PDF Splitter', description: 'Split PDF into separate pages', icon: 'fas fa-cut', route: '/tool/pdf-splitter' },
    { id: 'pdf-compressor', name: 'PDF Compressor', description: 'Reduce PDF file size', icon: 'fas fa-compress', route: '/tool/pdf-compressor' },
    { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to Word document', icon: 'fas fa-file-word', route: '/tool/pdf-to-word' },
    { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word to PDF', icon: 'fas fa-file-pdf', route: '/tool/word-to-pdf' },
    { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables from PDF to Excel', icon: 'fas fa-file-excel', route: '/tool/pdf-to-excel' },
    { id: 'pdf-to-image', name: 'PDF to Image', description: 'Convert PDF pages to images', icon: 'fas fa-image', route: '/tool/pdf-to-image' },
    { id: 'image-to-pdf', name: 'Image to PDF', description: 'Combine images into PDF', icon: 'fas fa-images', route: '/tool/image-to-pdf' },
    { id: 'pdf-unlock', name: 'PDF Unlock', description: 'Remove password from PDF', icon: 'fas fa-unlock', route: '/tool/pdf-unlock' },
    { id: 'pdf-lock', name: 'PDF Lock', description: 'Add password to PDF', icon: 'fas fa-lock', route: '/tool/pdf-lock' },
    { id: 'pdf-rotate', name: 'PDF Rotate', description: 'Rotate PDF pages', icon: 'fas fa-redo', route: '/tool/pdf-rotate' },
    { id: 'pdf-watermark', name: 'Add Watermark', description: 'Add watermark to PDF', icon: 'fas fa-tint', route: '/tool/pdf-watermark' },
    { id: 'pdf-page-numbers', name: 'Add Page Numbers', description: 'Add page numbers to PDF', icon: 'fas fa-list-ol', route: '/tool/pdf-page-numbers' },
    { id: 'pdf-text-extract', name: 'Extract Text', description: 'Extract text from PDF', icon: 'fas fa-file-alt', route: '/tool/pdf-text-extract' },
    { id: 'text-to-pdf', name: 'Text to PDF', description: 'Convert text to PDF', icon: 'fas fa-file-pdf', route: '/tool/text-to-pdf' },
    { id: 'pdf-metadata', name: 'PDF Metadata', description: 'View and edit PDF metadata', icon: 'fas fa-info-circle', route: '/tool/pdf-metadata' },
    { id: 'pdf-ocr', name: 'OCR PDF', description: 'Extract text from scanned PDF', icon: 'fas fa-eye', route: '/tool/pdf-ocr' },
    { id: 'pdf-sign', name: 'Sign PDF', description: 'Add digital signature to PDF', icon: 'fas fa-signature', route: '/tool/pdf-sign' },
    { id: 'pdf-repair', name: 'Repair PDF', description: 'Fix corrupted PDF files', icon: 'fas fa-wrench', route: '/tool/pdf-repair' },
    { id: 'pdf-organize', name: 'Organize Pages', description: 'Reorder PDF pages', icon: 'fas fa-sort', route: '/tool/pdf-organize' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'PDF Toolkit' },
  ];

  return (
    <div className="py-8 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Toolkit Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/30">
            <ToolIcon toolId="pdf-merger" className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{toolkit.name}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {toolkit.description}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>{toolkit.toolCount} Tools Available</span>
            <span>•</span>
            <span>Free Forever</span>
            <span>•</span>
            <span>No Registration Required</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pdfTools.map((tool) => (
            <Card key={tool.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-red-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <Link href={tool.route}>
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 border border-red-500/30">
                    <ToolIcon toolId={tool.id} className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-300 mb-4">{tool.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-400 font-medium">Free</span>
                    <i className="fas fa-arrow-right text-gray-500"></i>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Why Choose Our PDF Tools?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                <i className="fas fa-shield-alt text-2xl text-green-400"></i>
              </div>
              <h3 className="font-semibold text-white mb-2">Secure Processing</h3>
              <p className="text-gray-300">
                All files are processed securely and deleted automatically after processing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                <i className="fas fa-bolt text-2xl text-blue-400"></i>
              </div>
              <h3 className="font-semibold text-white mb-2">Fast & Reliable</h3>
              <p className="text-gray-300">
                Optimized algorithms ensure quick processing without quality loss.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <i className="fas fa-mobile-alt text-2xl text-purple-400"></i>
              </div>
              <h3 className="font-semibold text-white mb-2">Works Everywhere</h3>
              <p className="text-gray-300">
                Access our tools from any device - desktop, tablet, or mobile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
