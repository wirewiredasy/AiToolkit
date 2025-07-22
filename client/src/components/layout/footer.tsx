import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <i className="fas fa-robot text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold">Suntyn AI</span>
            </div>
            <p className="text-neutral-400">
              Professional-grade online tools powered by AI. Free, secure, and unlimited.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Toolkits</h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/toolkit/pdf" className="hover:text-white">
                  PDF Tools
                </Link>
              </li>
              <li>
                <Link href="/toolkit/image" className="hover:text-white">
                  Image Tools
                </Link>
              </li>
              <li>
                <Link href="/toolkit/media" className="hover:text-white">
                  Audio/Video Tools
                </Link>
              </li>
              <li>
                <Link href="/toolkit/government" className="hover:text-white">
                  Government Docs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#" className="hover:text-white">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Tutorials
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-12 pt-8 text-center text-neutral-400">
          <p>&copy; 2024 Suntyn AI. All rights reserved. Built with ❤️ for productivity.</p>
        </div>
      </div>
    </footer>
  );
}
