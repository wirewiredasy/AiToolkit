
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';

interface RecommendedToolsProps {
  title?: string;
  description?: string;
  currentToolId?: string;
}

export default function RecommendedTools({ 
  title = "Related PDF Tools", 
  description = "Complete your PDF workflow with these popular tools",
  currentToolId 
}: RecommendedToolsProps) {
  const pdfTools = [
    {
      id: 'pdf-merger',
      name: 'PDF Merger',
      description: 'Combine multiple PDF files into one',
      icon: 'fas fa-compress-alt',
      route: '/tool/pdf-merger',
      color: 'bg-red-100 text-red-600',
      usage: '250K+'
    },
    {
      id: 'pdf-splitter',
      name: 'PDF Splitter',
      description: 'Split PDF into separate pages',
      icon: 'fas fa-cut',
      route: '/tool/pdf-splitter',
      color: 'bg-blue-100 text-blue-600',
      usage: '180K+'
    },
    {
      id: 'pdf-compressor',
      name: 'PDF Compressor',
      description: 'Reduce PDF file size',
      icon: 'fas fa-compress',
      route: '/tool/pdf-compressor',
      color: 'bg-green-100 text-green-600',
      usage: '320K+'
    },
    {
      id: 'pdf-to-word',
      name: 'PDF to Word',
      description: 'Convert PDF to Word document',
      icon: 'fas fa-file-word',
      route: '/tool/pdf-to-word',
      color: 'bg-blue-100 text-blue-600',
      usage: '200K+'
    },
    {
      id: 'pdf-to-excel',
      name: 'PDF to Excel',
      description: 'Convert PDF to Excel spreadsheet',
      icon: 'fas fa-file-excel',
      route: '/tool/pdf-to-excel',
      color: 'bg-green-100 text-green-600',
      usage: '150K+'
    },
    {
      id: 'pdf-watermark',
      name: 'PDF Watermark',
      description: 'Add watermark to PDF',
      icon: 'fas fa-tint',
      route: '/tool/pdf-watermark',
      color: 'bg-purple-100 text-purple-600',
      usage: '90K+'
    }
  ];

  // Filter out current tool if specified
  const filteredTools = pdfTools.filter(tool => tool.id !== currentToolId);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-6">
            <i className="fas fa-file-pdf text-2xl text-red-600"></i>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">{title}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTools.map((tool) => (
            <Link key={tool.id} href={tool.route}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${tool.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-red-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          {tool.usage} users
                        </span>
                        <div className="flex items-center space-x-1 text-red-500">
                          <span className="text-sm font-medium">Try Now</span>
                          <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
            Why Choose Our PDF Processing Tools?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-shield-alt text-red-600"></i>
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Secure Processing</h4>
              <p className="text-sm text-slate-600">Files processed securely and deleted automatically</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-bolt text-blue-600"></i>
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Lightning Fast</h4>
              <p className="text-sm text-slate-600">Optimized algorithms for quick processing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-mobile-alt text-green-600"></i>
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Works Everywhere</h4>
              <p className="text-sm text-slate-600">Access from any device - mobile, tablet, desktop</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <Link href="/toolkit/pdf">
            <button className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
              <i className="fas fa-th-large mr-2"></i>
              View All PDF Tools
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
