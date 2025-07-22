
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      question: "How do I use the PDF merger tool?",
      answer: "Upload multiple PDF files, arrange them in your desired order, and click merge. The combined PDF will be ready for download."
    },
    {
      question: "Are my files secure?",
      answer: "Yes, all files are processed securely and automatically deleted after 1 hour. We don't store your personal documents."
    },
    {
      question: "Is there a file size limit?",
      answer: "Most tools support files up to 50MB. For larger files, please compress them first using our compression tools."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required for basic usage. However, creating an account gives you access to usage history and premium features."
    }
  ];

  const toolCategories = [
    {
      title: "PDF Tools",
      icon: "fas fa-file-pdf",
      color: "text-red-500",
      tools: ["PDF Merger", "PDF Splitter", "PDF Compressor", "Word to PDF", "Excel to PDF", "PPT to PDF"]
    },
    {
      title: "Image Tools", 
      icon: "fas fa-image",
      color: "text-blue-500",
      tools: ["Image Resizer", "Background Remover", "Image Compressor", "Format Converter", "Watermark Remover", "Photo Enhancer"]
    },
    {
      title: "Media Tools",
      icon: "fas fa-video", 
      color: "text-purple-500",
      tools: ["Video Converter", "Audio Converter", "Video Trimmer", "Audio Trimmer", "Video to Audio"]
    },
    {
      title: "Government Tools",
      icon: "fas fa-id-card",
      color: "text-green-500", 
      tools: ["PAN Validator", "GST Validator", "Aadhaar Validator", "QR Generator", "Barcode Generator"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Help Center</h1>
          <p className="text-xl text-slate-600 mb-8">
            Find answers, tutorials, and support for all Suntyn AI tools
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-800">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Tool Categories</h2>
            <div className="space-y-4">
              {toolCategories.map((category, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3">
                      <i className={`${category.icon} ${category.color} text-xl`}></i>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-slate-600">
                      {category.tools.map((tool, toolIndex) => (
                        <li key={toolIndex} className="flex items-center gap-2">
                          <i className="fas fa-chevron-right text-xs text-slate-400"></i>
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">Still Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
