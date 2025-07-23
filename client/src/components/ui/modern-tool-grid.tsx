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
  const featuredTools = toolkit.tools.slice(0, 8); // Show first 8 tools

  return (
    <div className="glass-card rounded-3xl p-8 tool-card-3d group relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <ToolIcon toolId={toolkit.icon} className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {toolkit.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {toolkit.tools.length} tools available
              </p>
            </div>
          </div>
          <div className="p-2 glass-effect rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="h-5 w-5 text-blue-600" />
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
          {toolkit.description}
        </p>

        {/* Tool grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {featuredTools.map((tool: Tool) => (
            <Link key={tool.id} href={`/tool/${tool.id}`}>
              <div className="aspect-square glass-card rounded-xl p-4 hover:scale-105 transition-all duration-300 group/tool relative overflow-hidden">
                {/* Tool icon background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover/tool:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <ToolIcon toolId={tool.icon} className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                  <span className="text-xs text-center text-slate-700 dark:text-slate-300 font-medium">
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
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 group/btn"
        >
          <Link href={`/toolkit/${toolkit.id}`}>
            <span>Explore {toolkit.name}</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default function ModernToolGrid() {
  return (
    <section className="py-24 tools-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-effect rounded-full px-6 py-2 mb-6">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">Professional Tools</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Everything you need in
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              one powerful platform
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Transform your workflow with our comprehensive suite of AI-powered tools. 
            From document processing to creative design, we've got you covered.
          </p>
        </div>

        {/* Toolkit grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {toolkits.map((toolkit) => (
            <ToolkitCard key={toolkit.id} toolkit={toolkit} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to supercharge your workflow?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              Join thousands of professionals using Suntyn AI for their daily tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4"
                asChild
              >
                <Link href="/all-tools">
                  Explore All Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="glass-effect border-slate-300 dark:border-slate-600 px-8 py-4"
                asChild
              >
                <Link href="/signup">
                  Get Started Free
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}