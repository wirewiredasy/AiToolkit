import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import ToolIcon from '@/components/ui/tool-icon';
import { toolkits } from '@/lib/tools';
import { ArrowRight } from 'lucide-react';

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

const ProfessionalToolkitCard = ({ toolkit }: { toolkit: Toolkit }) => {
  const featuredTools = toolkit.tools.slice(0, 8);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700">
      {/* Header with icon and title */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <ToolIcon toolId={toolkit.icon} className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {toolkit.name}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">
              {toolkit.tools.length} tools available
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
        {toolkit.description}
      </p>

      {/* Tool grid - 4x2 layout like in the reference */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {featuredTools.map((tool: Tool) => (
          <div key={tool.id} className="text-center">
            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 mb-3 hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors duration-200 cursor-pointer">
              <ToolIcon toolId={tool.icon} className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium block leading-tight">
                {tool.name.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action button */}
      <Button 
        asChild 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Link href={`/toolkit/${toolkit.id}`}>
          <span>Explore {toolkit.name}</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
};

export default function ProfessionalToolGrid() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to supercharge your workflow?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
            Join thousands of professionals using Suntyn AI for their daily tasks.
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500">
            Professional tools organized by category. Each toolkit contains specialized tools for your specific needs.
          </p>
        </div>

        {/* Tool grid - 2x2 layout like in reference */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {toolkits.slice(0, 4).map((toolkit) => (
            <ProfessionalToolkitCard key={toolkit.id} toolkit={toolkit} />
          ))}
        </div>

        {/* View all tools button */}
        <div className="text-center">
          <Button 
            size="lg" 
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-xl text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Link href="/all-tools">
              Explore All Tools
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}