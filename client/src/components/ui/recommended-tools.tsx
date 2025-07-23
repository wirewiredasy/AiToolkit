import React from 'react';
import { Card, CardContent } from './card';
import { Button } from './button';
import { Link } from 'wouter';
import { getFeaturedTools, toolkits } from '../../lib/tools';
import ToolIcon from './tool-icon';

interface RecommendedToolsProps {
  currentToolId?: string;
  category?: string;
  limit?: number;
  title?: string;
}

export function RecommendedTools({ 
  currentToolId, 
  category, 
  limit = 6,
  title
}: RecommendedToolsProps) {
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

  // Generate title based on category
  const sectionTitle = title || (category ? `Related ${category} Tools` : 'Recommended Tools');

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedTools.map((tool) => (
            <Link key={tool.id} href={tool.route}>
              <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 border border-slate-700/50 hover:border-slate-600/50 cursor-pointer">
                {/* Tool Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center group-hover:bg-slate-600/50 transition-colors duration-300">
                    <ToolIcon toolId={tool.id} className="text-blue-400 group-hover:text-blue-300" size="lg" />
                  </div>
                </div>

                {/* Tool Info */}
                <div className="text-center">
                  <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {tool.name}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-0"
            asChild
          >
            <Link href="/all-tools">
              View All Tools
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}