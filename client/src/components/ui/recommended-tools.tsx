
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
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <i className="fas fa-magic text-blue-600 text-xl"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Recommended Tools
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover popular tools trusted by thousands of users worldwide
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedTools.map((tool) => (
            <div 
              key={tool.id} 
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl border border-slate-200 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <Link href={tool.route}>
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-110">
                        <i className={`${tool.icon} text-white text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-1 text-lg">
                          {tool.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          {tool.featured && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                              ⭐ Popular
                            </span>
                          )}
                          {tool.usageCount && (
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                              {tool.usageCount} uses
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
                        <i className="fas fa-check mr-1"></i>
                        Free Forever
                      </span>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-slate-100 group-hover:bg-blue-500 rounded-full transition-colors duration-300">
                      <i className="fas fa-arrow-right text-slate-500 group-hover:text-white transition-colors duration-300"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
            asChild
          >
            <Link href="/all-tools">
              <i className="fas fa-th-large mr-3"></i>
              Explore All 108 Tools
              <i className="fas fa-sparkles ml-2"></i>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
