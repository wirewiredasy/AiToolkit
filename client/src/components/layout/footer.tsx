
import { Link } from 'wouter';
import SuntynLogo from '@/components/ui/suntyn-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toolkitLinks = [
    { name: 'PDF Tools', href: '/toolkit/pdf' },
    { name: 'Image Tools', href: '/toolkit/image' },
    { name: 'Audio/Video Tools', href: '/toolkit/media' },
    { name: 'Government Tools', href: '/toolkit/government' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'About', href: '/about' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-amber-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-8">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <SuntynLogo size="md" animated={true} showText={true} />
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-md">
              Revolutionary neural intelligence platform with 108+ AI-powered tools for document processing, 
              image editing, and data validation. Transform your workflow with cutting-edge AI technology.
            </p>
            
            {/* Enhanced Social Media Icons */}
            <div className="flex items-center gap-3 mb-8">
              <a href="#" className="group">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-slate-700 rounded-lg flex items-center justify-center hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-slate-700 rounded-lg flex items-center justify-center hover:from-blue-500 hover:to-blue-700 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-slate-700 rounded-lg flex items-center justify-center hover:from-gray-600 hover:to-gray-500 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                  </svg>
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-slate-700 rounded-lg flex items-center justify-center hover:from-red-500 hover:to-red-600 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <i className="fab fa-youtube text-gray-300 group-hover:text-white transition-colors"></i>
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-slate-700 rounded-lg flex items-center justify-center hover:from-pink-500 hover:to-pink-600 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <i className="fab fa-instagram text-gray-300 group-hover:text-white transition-colors"></i>
                </div>
              </a>
            </div>

            {/* Enhanced Newsletter Signup */}
            <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-xl p-6 border border-yellow-400/20 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-envelope text-white text-sm"></i>
                </div>
                <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Get the latest AI tools, neural intelligence updates, and exclusive features delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-500"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white px-6 shadow-lg"
                >
                  {isSubscribed ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </form>
              {isSubscribed && (
                <p className="text-yellow-400 text-sm mt-2 flex items-center">
                  <i className="fas fa-check-circle mr-2"></i>
                  Successfully subscribed to our newsletter!
                </p>
              )}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <i className="fas fa-tools text-yellow-400 mr-2"></i>
              AI Tools
            </h3>
            <ul className="space-y-3">
              {toolkitLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer flex items-center group">
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <i className="fas fa-headset text-yellow-400 mr-2"></i>
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center group cursor-pointer">
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-gray-400 text-sm flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  AI Blog - Coming Soon
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <i className="fas fa-balance-scale text-yellow-400 mr-2"></i>
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center group cursor-pointer">
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-gray-700 pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left flex items-center">
              <SuntynLogo size="sm" animated={false} showText={false} className="mr-3" />
              © 2025 Suntyn AI Neural Intelligence. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center">
                <i className="fas fa-brain text-yellow-400 mr-2"></i>
                Powered by Neural Intelligence
              </span>
              <span className="flex items-center">
                <i className="fas fa-shield-alt text-green-400 mr-2"></i>
                100% Secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
