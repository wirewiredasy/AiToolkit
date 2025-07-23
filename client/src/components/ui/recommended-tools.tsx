
import React from 'react';
import { Card, CardContent } from './card';
import { Button } from './button';
import { Link } from 'wouter';
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
    const categoryToolkit = toolkits.find(toolkit => 
      toolkit.name.toLowerCase().includes(category.toLowerCase()) ||
      category.toLowerCase().includes(toolkit.name.toLowerCase().replace(' toolkit', ''))
    );
    
    if (categoryToolkit) {
      const categoryTools = categoryToolkit.tools.filter(tool => tool.id !== currentToolId);
      
      // Mix category tools with featured tools (prioritize category tools)
      recommendedTools = [
        ...categoryTools.slice(0, Math.min(4, limit - 2)),
        ...recommendedTools.filter(tool => !categoryTools.some(ct => ct.id === tool.id)).slice(0, Math.max(2, limit - categoryTools.length))
      ];
    }
  }
  
  // Limit the number of tools and ensure uniqueness
  recommendedTools = recommendedTools
    .filter((tool, index, self) => index === self.findIndex(t => t.id === tool.id))
    .slice(0, limit);

  if (recommendedTools.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-2">
            <i className="fas fa-magic text-blue-600"></i>
            Recommended Tools
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Similar tools you might find useful
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedTools.map((tool) => (
            <Link key={tool.id} href={tool.route}>
              <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg border border-slate-200 hover:border-blue-300 transition-all duration-200 transform hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                
                <div className="relative p-5">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-md group-hover:shadow-lg transition-shadow duration-200">
                      <i className={`${tool.icon} text-white text-lg`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors mb-1 text-base truncate">
                        {tool.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {tool.featured && (
                          <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                        <span className="text-xs text-slate-500">
                          {tool.usageCount || '0'} uses
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="bg-green-100 text-green-700 font-medium text-xs px-3 py-1 rounded-full">
                      Free
                    </span>
                    <div className="flex items-center justify-center w-8 h-8 bg-slate-100 group-hover:bg-blue-500 rounded-full transition-colors duration-200">
                      <i className="fas fa-arrow-right text-slate-500 group-hover:text-white transition-colors duration-200 text-sm"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
            asChild
          >
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
