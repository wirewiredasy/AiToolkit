import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function DeveloperHero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_50%)] opacity-50"></div>
      
      {/* Subtle background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Small subtitle */}
        <p className="text-gray-400 text-lg mb-6 tracking-wide">
          Eak Saubhle Ihey Youtsiy
        </p>

        {/* Main heading - exact same style */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-16 tracking-tight">
          AI Tool Suite
        </h1>

        {/* 3D Isometric illustration - using CSS to create similar effect */}
        <div className="relative mb-20 flex justify-center">
          <div className="relative w-96 h-64">
            {/* Main stack of cards */}
            <div className="absolute inset-0 perspective-1000">
              {/* Background card - blue */}
              <div className="absolute top-4 left-8 w-72 h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl transform rotate-3 scale-90">
                <div className="p-6">
                  <div className="w-full h-2 bg-blue-400 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="w-3/4 h-2 bg-blue-400 rounded"></div>
                    <div className="w-1/2 h-2 bg-blue-400 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Middle card - white */}
              <div className="absolute top-2 left-4 w-72 h-48 bg-white rounded-2xl shadow-2xl transform -rotate-1 scale-95">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-2 bg-gray-200 rounded"></div>
                    <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Front card - green */}
              <div className="absolute top-0 left-0 w-72 h-48 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl shadow-2xl transform rotate-1">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-lg"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-emerald-300 rounded"></div>
                    <div className="w-5/6 h-2 bg-emerald-300 rounded"></div>
                    <div className="w-2/3 h-2 bg-emerald-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Orbiting rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 border-2 border-cyan-500/20 rounded-full animate-spin-slow"></div>
              <div className="absolute w-96 h-96 border border-cyan-500/10 rounded-full animate-spin-reverse"></div>
            </div>
          </div>
        </div>

        {/* Tool grid - 2x4 layout exactly like reference */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {/* Row 1 */}
          <Link href="/toolkit/pdf">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-red-500 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold">📄</span>
              </div>
              <h3 className="text-white font-semibold mb-2">PDF Toolkit</h3>
              <p className="text-gray-400 text-sm">25 tools available</p>
            </div>
          </Link>
          
          <Link href="/toolkit/image">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-purple-500 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold">🖼️</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Image Toolkit</h3>
              <p className="text-gray-400 text-sm">20 tools available</p>
            </div>
          </Link>
          
          <Link href="/toolkit/media">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold">🎵</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Media Toolkit</h3>
              <p className="text-gray-400 text-sm">20 tools available</p>
            </div>
          </Link>
          
          <Link href="/toolkit/government">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-blue-500 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold">🏛️</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Govt Documents</h3>
              <p className="text-gray-400 text-sm">15 tools available</p>
            </div>
          </Link>
          
          {/* Row 2 */}
          <Link href="/toolkit/developer">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-green-500 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold">💻</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Developer Toolkit</h3>
              <p className="text-gray-400 text-sm">28 tools available</p>
            </div>
          </Link>
          
          <Link href="/all-tools">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-black font-bold">⭐</span>
              </div>
              <h3 className="text-white font-semibold mb-2">All Tools</h3>
              <p className="text-gray-400 text-sm">108+ tools total</p>
            </div>
          </Link>
          
          <Link href="/pricing">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-orange-500 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold">💎</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Premium</h3>
              <p className="text-gray-400 text-sm">Unlock all features</p>
            </div>
          </Link>
          
          <Link href="/about">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-pink-500 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold">ℹ️</span>
              </div>
              <h3 className="text-white font-semibold mb-2">About Us</h3>
              <p className="text-gray-400 text-sm">Learn more about Suntyn</p>
            </div>
          </Link>
        </div>

        {/* Bottom section */}
        <div className="mt-32">
          <p className="text-cyan-400 text-lg mb-4 tracking-wide">Support Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Help us build the future of<br />
            development tools.
          </h2>
          
          <Button 
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            asChild
          >
            <Link href="/all-tools">
              Download Now ↓
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}