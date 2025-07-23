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
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover more powerful tools to enhance your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedTools.map((tool) => (
            <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <ToolIcon toolId={tool.id} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {tool.category}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>
                <Link href={`/tool/${tool.id}`}>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Try Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}