import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedToolIcons } from '@/components/ui/animated-tool-icons';
import { AnimatedImageIcons } from '@/components/ui/image-tools-icons';
import { AnimatedMediaIcons } from '@/components/ui/media-tools-icons';

export default function AnimatedIconsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Suntyn AI - Animated Tool Icons
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Original animated icons designed for copyright-free use. Each icon features smooth animations and modern design patterns.
          </p>
        </div>

        {/* PDF Tools Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800">PDF Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {Object.entries(AnimatedToolIcons).map(([name, IconComponent]) => (
                <div key={name} className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <IconComponent className="w-12 h-12" animate={true} />
                  </div>
                  <p className="text-sm font-medium text-gray-700 text-center">{name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Image Tools Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800">Image Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {Object.entries(AnimatedImageIcons).map(([name, IconComponent]) => (
                <div key={name} className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors">
                    <IconComponent className="w-12 h-12" animate={true} />
                  </div>
                  <p className="text-sm font-medium text-gray-700 text-center">{name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Media Tools Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-800">Media Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {Object.entries(AnimatedMediaIcons).map(([name, IconComponent]) => (
                <div key={name} className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center hover:bg-purple-200 transition-colors">
                    <IconComponent className="w-12 h-12" animate={true} />
                  </div>
                  <p className="text-sm font-medium text-gray-700 text-center">{name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Icon Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">©</span>
                </div>
                <h3 className="font-semibold mb-2">Copyright Free</h3>
                <p className="text-sm text-gray-600">All icons are original creations, safe for commercial use</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Smooth Animations</h3>
                <p className="text-sm text-gray-600">Framer Motion powered animations with hover effects</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">🎨</span>
                </div>
                <h3 className="font-semibold mb-2">Modern Design</h3>
                <p className="text-sm text-gray-600">Clean, professional style matching your brand</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}