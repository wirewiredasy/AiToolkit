
import React from 'react';
import { Card, CardContent } from './card';
import { Button } from './button';
import Link from 'next/link';
import { getFeaturedTools, toolkits } from '../../lib/tools';

interface RecommendedToolsProps {
  currentToolId?: string;
  category?: string;
  limit?: number;
}

export function RecommendedTools({ currentToolId, category, limit = 6 }: RecommendedToolsProps) {
  // Get featured tools and filter out current tool
  let recommendedTools = getFeaturedTools().filter(tool => tool.id !== currentToolId);
  
  // If category is provided, prioritize tools from same category
  if (category) {
    const categoryTools = toolkits
      .find(toolkit => toolkit.name.toLowerCase().includes(category.toLowerCase()))?.tools
      .filter(tool => tool.id !== currentToolId) || [];
    
    // Mix category tools with featured tools
    recommendedTools = [
      ...categoryTools.slice(0, 3),
      ...recommendedTools.filter(tool => !categoryTools.some(ct => ct.id === tool.id))
    ];
  }
  
  // Limit the number of tools
  recommendedTools = recommendedTools.slice(0, limit);

  if (recommendedTools.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            <i className="fas fa-thumbs-up text-blue-600 mr-3"></i>
            Recommended Tools
          </h2>
          <p className="text-lg text-slate-600">
            Other popular tools you might find useful
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedTools.map((tool) => (
            <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 border hover:border-blue-200">
              <CardContent className="p-6">
                <Link href={tool.route}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <i className={`${tool.icon} text-blue-600 text-lg`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                        {tool.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {tool.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Popular</span>
                        )}
                        {tool.usageCount && (
                          <span className="text-xs text-slate-500">{tool.usageCount}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-medium text-sm">Free</span>
                    <i className="fas fa-arrow-right text-slate-400 group-hover:text-blue-600 transition-colors"></i>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/all-tools">
              <i className="fas fa-th-large mr-2"></i>
              View All Tools
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
