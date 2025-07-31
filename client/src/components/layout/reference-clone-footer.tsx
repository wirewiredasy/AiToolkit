import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Image as ImageIcon, 
  Building,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Exact clone of the reference designs
export default function ReferenceCloneFooter() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <footer className="relative min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
      {/* Dark textured background pattern - exactly like reference */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)
            `,
            backgroundSize: '60px 60px, 40px 40px, 80px 80px'
          }}
        />
      </div>

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="w-full max-w-6xl">
          
          {/* Three main cards layout - exactly like first reference image */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* PDF Toolkit Card */}
            <div 
              className="group relative"
              onMouseEnter={() => setHoveredCard('pdf')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500 h-96">
                {/* PDF document preview */}
                <div className="mb-6 flex justify-center">
                  <div className="relative w-32 h-40 bg-white rounded-lg shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <div className="absolute inset-2 bg-gray-100 rounded">
                      <div className="p-2 space-y-1">
                        <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-1 bg-gray-300 rounded w-full"></div>
                        <div className="h-1 bg-gray-300 rounded w-2/3"></div>
                        <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-xs text-gray-500 font-semibold">PDF DOCUMENT</div>
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <FileText className="w-2 h-2 text-white" />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">My Toolkit PDF</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Míčené souby toltýp říst díccl tool. Tíqlítčléé věóuck íčnčsa dené tąąp đůlet the fŕíng šlíne šécúčkť álínť foř oplyšúűé díánp št lést.
                  </p>
                  
                  <Button 
                    className="bg-transparent border-2 border-slate-500 text-white hover:bg-slate-700 hover:border-slate-400 rounded-full px-8 py-2 transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Media Dev Card */}
            <div 
              className="group relative"
              onMouseEnter={() => setHoveredCard('image')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-3xl p-8 border border-orange-400/30 hover:border-orange-300/50 transition-all duration-500 h-96">
                {/* Phone mockup with gradient */}
                <div className="mb-6 flex justify-center">
                  <div className="relative w-24 h-44 bg-black rounded-2xl p-1 shadow-2xl transform -rotate-2 group-hover:rotate-1 transition-transform duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                        <div className="w-12 h-12 bg-pink-300 rounded-full shadow-inner"></div>
                      </div>
                    </div>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-700 rounded-full"></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-orange-200 mb-2">Media Dot</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Image<br/>Media<br/>Dev
                  </h3>
                  <p className="text-orange-100 text-sm leading-relaxed mb-6">
                    Ai işplqpě ă bďeçáínä contentíl sả ğö ööý měáđ thé śpásřĺóuś očeňý tíř ģámeś nö říș cöpý tūž őřmý íŋ qíčońđl čtlš.
                  </p>
                  
                  <Button 
                    className="bg-white/20 backdrop-blur border border-white/30 text-white hover:bg-white/30 hover:border-white/50 rounded-full px-8 py-2 transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            {/* Government Card */}
            <div 
              className="group relative"
              onMouseEnter={() => setHoveredCard('gov')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500 h-96">
                {/* Government seal */}
                <div className="mb-6 flex justify-center">
                  <div className="relative w-32 h-32 transform group-hover:scale-110 transition-transform duration-500">
                    <div className="w-full h-full bg-slate-700 rounded-full border-4 border-slate-600 flex items-center justify-center">
                      <div className="w-20 h-20 border-2 border-slate-500 rounded-full flex items-center justify-center">
                        <Building className="w-8 h-8 text-slate-400" />
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-slate-500 rounded-full"></div>
                    <div className="absolute inset-4 border border-slate-600 rounded-full"></div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">Gov</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Ả sűbľìščě sốműăğì gőčáľíčáĺ vӱí íň đīáğýě țěcťŭŕáłíqé țöĺ ĺjäćĺt běţŧíŋġ ňĺáĵ ďăs fĺĺē äźĭőúë öčhý sěň věńê öűŝãńĕ.
                  </p>
                  
                  <Button 
                    className="bg-transparent border-2 border-slate-500 text-white hover:bg-slate-700 hover:border-slate-400 rounded-full px-8 py-2 transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Second layout inspired by second reference image */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left sidebar with tool cards */}
              <div className="space-y-4">
                {/* PDF Toolkit small card */}
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">My Toolkit PDF</div>
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                    </div>
                  </div>
                </div>

                {/* Image Media card with thumbnail */}
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center overflow-hidden">
                      <div className="w-8 h-6 bg-pink-300 rounded"></div>
                    </div>
                  </div>
                  <div className="text-white font-medium text-sm mb-1">Image Media Dev</div>
                  <div className="text-xs text-slate-400">Somáltisć hešfíoď sél šíhař ößl2</div>
                </div>

                {/* Gov card */}
                <div className="bg-slate-700/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 cursor-pointer">
                  <div className="text-2xl font-bold text-white">gov</div>
                </div>
              </div>

              {/* Main center area */}
              <div className="lg:col-span-2 bg-slate-600/30 backdrop-blur-sm rounded-2xl p-12 flex items-center justify-center border border-slate-500/30">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-8">gov</div>
                  
                  {/* Action buttons row */}
                  <div className="flex gap-4 justify-center">
                    <Button className="bg-slate-300 hover:bg-slate-200 text-slate-800 rounded-full px-6 py-2 font-medium">
                      Ads Demo
                    </Button>
                    <Button className="bg-amber-200 hover:bg-amber-100 text-slate-800 rounded-full px-6 py-2 font-medium">
                      Contact Us
                    </Button>
                    <Button className="bg-slate-700 hover:bg-slate-600 text-white rounded-full px-6 py-2 font-medium">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating sparkle effects */}
          <div className="absolute top-8 right-8 opacity-60">
            <Sparkles className="w-6 h-6 text-slate-400 animate-pulse" />
          </div>
          <div className="absolute bottom-8 left-8 opacity-40">
            <Sparkles className="w-4 h-4 text-slate-500 animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </footer>
  );
}