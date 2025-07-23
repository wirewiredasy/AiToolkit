import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/ui/search-bar';
import { ToolCardSkeleton } from '@/components/ui/loading-skeleton';
import { toolkits, getFeaturedTools } from '@/lib/tools';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { Search, Grid, List, Layers, Star, ArrowRight } from 'lucide-react';
import ToolIcon from '@/components/ui/tool-icon';

export default function AllTools() {
  const featuredTools = getFeaturedTools();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);

  // Get search query from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);

  const allTools = useMemo(() => {
    return toolkits.flatMap(toolkit => toolkit.tools);
  }, []);

  const filteredTools = useMemo(() => {
    let tools = allTools;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      tools = tools.filter(tool => tool.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    // Filter by search query
    if (searchQuery) {
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return tools;
  }, [allTools, selectedCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Layers className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              All <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">108 Tools</span>
            </h1>
          </div>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Complete collection of AI-powered tools for document processing, image editing, 
            audio/video conversion, and government document validation.
          </p>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar 
              placeholder="Search tools by name, category, or description..." 
              onSearch={handleSearch}
              className="max-w-4xl"
            />
          </div>
          
          {/* Filters and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
              >
                All Categories ({allTools.length})
              </Button>
              {toolkits.map((toolkit) => (
                <Button
                  key={toolkit.id}
                  variant={selectedCategory === toolkit.name ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(toolkit.name)}
                  className="border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
                >
                  {toolkit.name} ({toolkit.tools.length})
                </Button>
              ))}
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                size="sm"
                className="border-white/20 text-white hover:bg-white hover:text-slate-900"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                size="sm"
                className="border-white/20 text-white hover:bg-white hover:text-slate-900"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {searchQuery ? (
                  <>Search Results for "{searchQuery}"</>
                ) : selectedCategory !== 'all' ? (
                  <>{selectedCategory} Tools</>
                ) : (
                  <>All Tools</>
                )}
              </h2>
              <p className="text-slate-600">
                {isLoading ? 'Searching...' : `${filteredTools.length} tools found`}
              </p>
            </div>
            
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
                className="mt-4 sm:mt-0"
              >
                Clear Search
              </Button>
            )}
          </div>
          
          {/* Loading State */}
          {isLoading ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {Array.from({ length: 8 }).map((_, i) => (
                <ToolCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <Suspense fallback={
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <ToolCardSkeleton key={i} />
                ))}
              </div>
            }>
              {/* Tools Grid/List */}
              {filteredTools.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                  {filteredTools.map((tool) => (
                    <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                      <CardContent className="p-6">
                        <Link href={tool.route}>
                          <div className={`${viewMode === 'list' ? 'flex items-center space-x-4' : ''}`}>
                            <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <ToolIcon toolId={tool.id} className="text-blue-600" size="md" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {tool.name}
                                </h3>
                                {tool.featured && (
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                )}
                              </div>
                              <p className="text-sm text-slate-600 mb-2">{tool.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{tool.category}</span>
                                {tool.usageCount && (
                                  <span className="text-xs text-green-600 font-medium">{tool.usageCount} uses</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No tools found</h3>
                  <p className="text-slate-600 mb-6">
                    {searchQuery 
                      ? `No tools match "${searchQuery}". Try different keywords or browse by category.`
                      : 'No tools available in this category.'
                    }
                  </p>
                  <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                    Show All Tools
                  </Button>
                </div>
              )}
            </Suspense>
          )}
        </div>
      </section>
      
      {/* Popular Tools Section */}
      {!searchQuery && selectedCategory === 'all' && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                <Star className="w-8 h-8 text-yellow-500 mr-3 inline" />
                Popular Tools
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Most used and highly rated tools across all categories
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredTools.slice(0, 8).map((tool) => (
                <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                  <CardContent className="p-6">
                    <Link href={tool.route}>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <ToolIcon toolId={tool.id} className="text-blue-600" size="sm" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {tool.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Popular</span>
                            <span className="text-xs text-slate-500">{tool.usageCount}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-medium text-sm">Free</span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}