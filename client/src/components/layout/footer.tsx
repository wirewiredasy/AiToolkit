import { Link } from 'wouter';
import SuntynLogo from '@/components/ui/suntyn-logo';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-800 text-white py-16 relative overflow-hidden">
      {/* Background neural network pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <SuntynLogo size="md" animated={true} showText={true} className="mb-4" />
            <p className="text-neutral-400">
              🚀 Next-generation AI-powered toolkit with 80+ tools. 
              <br />
              🔒 Secure, fast, and intelligent processing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-blue-400 transition-colors duration-200 text-lg">
                🐦
              </a>
              <a href="#" className="text-neutral-400 hover:text-purple-400 transition-colors duration-200 text-lg">
                💻
              </a>
              <a href="#" className="text-neutral-400 hover:text-cyan-400 transition-colors duration-200 text-lg">
                💼
              </a>
              <a href="#" className="text-neutral-400 hover:text-green-400 transition-colors duration-200 text-lg">
                📧
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🔧 AI Toolkits
            </h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/toolkit/pdf" className="hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>📄</span> <span>PDF Tools (25+)</span>
                </Link>
              </li>
              <li>
                <Link href="/toolkit/image" className="hover:text-purple-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>🖼️</span> <span>Image Tools (20+)</span>
                </Link>
              </li>
              <li>
                <Link href="/toolkit/media" className="hover:text-cyan-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>🎬</span> <span>Media Tools (20+)</span>
                </Link>
              </li>
              <li>
                <Link href="/toolkit/government" className="hover:text-green-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>🏛️</span> <span>Gov Docs (15+)</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              🤖 AI Resources
            </h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>📚</span> <span>API Docs</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>❓</span> <span>Help Center</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>📝</span> <span>AI Blog</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>🎓</span> <span>Tutorials</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              🏢 Company
            </h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>🌟</span> <span>About AI</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>🔒</span> <span>Privacy</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>📋</span> <span>Terms</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors duration-200 flex items-center space-x-2">
                  <span>📞</span> <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-12 pt-8 text-center text-neutral-400">
          <p className="mb-2">
            &copy; 2025 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">Suntyn AI</span>. 
            All rights reserved.
          </p>
          <p className="text-sm">
            🚀 Powered by Neural Intelligence • 🌟 Built for the Future • 🔒 Secure by Design
          </p>
        </div>
      </div>
    </footer>
  );
}
