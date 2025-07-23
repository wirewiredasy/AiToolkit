import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import ToolIcon from '@/components/ui/tool-icon';
import { toolkits } from '@/lib/tools';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  icon: string;
}

interface Toolkit {
  id: string;
  name: string;
  icon: string;
  description: string;
  tools: Tool[];
}

const ToolkitCard = ({ toolkit }: { toolkit: Toolkit }) => {
  const featuredTools = toolkit.tools.slice(0, 8);

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700/50">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md">
          <ToolIcon toolId={toolkit.icon} className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {toolkit.name}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {toolkit.tools.length} tools available
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed text-sm">
        {toolkit.description}
      </p>

      {/* Tool grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {featuredTools.map((tool: Tool) => (
          <Link key={tool.id} href={`/tool/${tool.id}`}>
            <div className="aspect-square bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-slate-600/50 transition-colors duration-200 group">
              <div className="h-full flex flex-col items-center justify-center">
                <ToolIcon toolId={tool.icon} className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-1" />
                <span className="text-xs text-center text-slate-700 dark:text-slate-300 font-medium leading-tight">
                  {tool.name.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Action button */}
      <Button 
        asChild 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
      >
        <Link href={`/toolkit/${toolkit.id}`}>
          <span>Explore {toolkit.name}</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default function SimpleToolGrid() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">AI-Powered Tools</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Toolkit
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Professional tools organized by category. Each toolkit contains specialized tools for your specific needs.
          </p>
        </div>

        {/* Tool grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {toolkits.slice(0, 4).map((toolkit) => (
            <ToolkitCard key={toolkit.id} toolkit={toolkit} />
          ))}
        </div>

        {/* View all tools button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3"
          >
            <Link href="/all-tools">
              View All 108+ Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}