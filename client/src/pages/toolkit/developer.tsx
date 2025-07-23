
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { getToolkitById } from '@/lib/tools';

export default function DeveloperToolkit() {
  const toolkit = getToolkitById('developer');

  if (!toolkit) {
    return <div>Toolkit not found</div>;
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Developer Toolkit' },
  ];

  return (
    <div className="py-8 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Toolkit Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-code text-3xl text-blue-600"></i>
          </div>
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">{toolkit.name}</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            {toolkit.description}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-neutral-500">
            <span>{toolkit.toolCount} Tools Available</span>
            <span>•</span>
            <span>Developer Focused</span>
            <span>•</span>
            <span>Production Ready</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {toolkit.tools.map((tool) => (
            <Card key={tool.id} className="tool-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <Link href={tool.route}>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <i className={`${tool.icon} text-blue-600`}></i>
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">{tool.name}</h3>
                  <p className="text-sm text-neutral-600 mb-4">{tool.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-medium">Free</span>
                    <i className="fas fa-arrow-right text-neutral-400"></i>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8 text-center">
            Why Use Developer Tools?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-2xl text-green-600"></i>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Boost Productivity</h3>
              <p className="text-neutral-600">
                Essential tools to speed up your development workflow and save time.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-tools text-2xl text-purple-600"></i>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">All-in-One</h3>
              <p className="text-neutral-600">
                From code formatting to conversion tools, everything you need in one place.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl text-orange-600"></i>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Secure & Reliable</h3>
              <p className="text-neutral-600">
                All processing is done securely with no data stored on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
