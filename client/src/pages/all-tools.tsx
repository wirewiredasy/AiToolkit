
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toolkits, getFeaturedTools } from '@/lib/tools';

export default function AllTools() {
  const featuredTools = getFeaturedTools();

  const scrollToCategory = (categoryId: string) => {
    document.getElementById(categoryId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <i className="fas fa-tools text-4xl text-blue-400 mr-4"></i>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              All <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">108 Tools</span>
            </h1>
          </div>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Complete collection of AI-powered tools for document processing, image editing, 
            audio/video conversion, and government document validation.
          </p>
          
          {/* Quick Navigation */}
          <div className="flex flex-wrap gap-4 justify-center">
            {toolkits.map((toolkit) => (
              <Button
                key={toolkit.id}
                variant="outline"
                onClick={() => scrollToCategory(toolkit.id)}
                className="border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
              >
                <i className={`${toolkit.icon} mr-2`}></i>
                {toolkit.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              <i className="fas fa-star text-yellow-500 mr-3"></i>
              Popular Tools
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Most used and highly rated tools across all categories
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                <CardContent className="p-6">
                  <Link href={tool.route}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <i className={`${tool.icon} text-blue-600`}></i>
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
                      <i className="fas fa-arrow-right text-slate-400 group-hover:text-blue-600 transition-colors"></i>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools by Category */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              <i className="fas fa-th-large text-blue-600 mr-3"></i>
              Tools by Category
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Browse all tools organized by functionality and use case
            </p>
          </div>

          {toolkits.map((toolkit) => (
            <div key={toolkit.id} id={toolkit.id} className="mb-16">
              {/* Category Header */}
              <div className="mb-8">
                <Card className="bg-gradient-to-r from-white to-slate-50 border-l-4 border-l-blue-500">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                          toolkit.color === 'red' ? 'bg-red-100' :
                          toolkit.color === 'purple' ? 'bg-purple-100' :
                          toolkit.color === 'green' ? 'bg-green-100' :
                          toolkit.color === 'orange' ? 'bg-orange-100' :
                          'bg-blue-100'
                        }`}>
                          <i className={`${toolkit.icon} text-2xl ${
                            toolkit.color === 'red' ? 'text-red-600' :
                            toolkit.color === 'purple' ? 'text-purple-600' :
                            toolkit.color === 'green' ? 'text-green-600' :
                            toolkit.color === 'orange' ? 'text-orange-600' :
                            'text-blue-600'
                          }`}></i>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">{toolkit.name}</h3>
                          <p className="text-slate-600 mt-1">{toolkit.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-slate-900">{toolkit.toolCount}</span>
                        <p className="text-sm text-slate-500">Tools</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Tools Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {toolkit.tools.map((tool) => (
                  <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 border hover:border-blue-200">
                    <CardContent className="p-6">
                      <Link href={tool.route}>
                        <div className="flex items-start mb-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${
                            toolkit.color === 'red' ? 'bg-red-100' :
                            toolkit.color === 'purple' ? 'bg-purple-100' :
                            toolkit.color === 'green' ? 'bg-green-100' :
                            toolkit.color === 'orange' ? 'bg-orange-100' :
                            'bg-blue-100'
                          }`}>
                            <i className={`${tool.icon} ${
                              toolkit.color === 'red' ? 'text-red-600' :
                              toolkit.color === 'purple' ? 'text-purple-600' :
                              toolkit.color === 'green' ? 'text-green-600' :
                              toolkit.color === 'orange' ? 'text-orange-600' :
                              'text-blue-600'
                            }`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                              {tool.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
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
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            <i className="fas fa-chart-bar text-blue-400 mr-3"></i>
            Platform Statistics
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <i className="fas fa-tools text-4xl text-blue-400 mb-4"></i>
              <div className="text-4xl font-bold text-white mb-2">108+</div>
              <div className="text-slate-300">Total Tools</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <i className="fas fa-th-large text-4xl text-purple-400 mb-4"></i>
              <div className="text-4xl font-bold text-white mb-2">5</div>
              <div className="text-slate-300">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <i className="fas fa-users text-4xl text-green-400 mb-4"></i>
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-slate-300">Files Processed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <i className="fas fa-shield-alt text-4xl text-orange-400 mb-4"></i>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-slate-300">Secure & Free</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
