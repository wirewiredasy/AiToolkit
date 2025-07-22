
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
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <SuntynLogo className="w-10 h-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Suntyn AI
              </span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
              Professional AI-powered tools for document processing, image editing, and data validation. 
              Transform your workflow with cutting-edge technology.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mb-8">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300">
                <i className="fab fa-linkedin text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all duration-300">
                <i className="fab fa-github text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300">
                <i className="fab fa-youtube text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300">
                <i className="fab fa-facebook text-lg"></i>
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
              <p className="text-slate-400 text-sm mb-4">
                Get the latest AI tools and updates delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
                >
                  {isSubscribed ? (
                    <i className="fas fa-check text-sm"></i>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </form>
              {isSubscribed && (
                <p className="text-green-400 text-sm mt-2">
                  ✓ Successfully subscribed to our newsletter!
                </p>
              )}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Tools</h3>
            <ul className="space-y-3">
              {toolkitLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center group">
                      <i className="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-opacity mr-2"></i>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors flex items-center group">
                    <i className="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-opacity mr-2"></i>
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <span className="text-slate-500 text-sm flex items-center">
                  <i className="fas fa-clock text-xs mr-2"></i>
                  Blog - Coming Soon
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors flex items-center group">
                    <i className="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-opacity mr-2"></i>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-400 text-sm">
              © 2025 Suntyn AI. All rights reserved. Empowering productivity with AI.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                All systems operational
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-shield-alt text-blue-400"></i>
                SSL Secured
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-clock text-purple-400"></i>
                24/7 Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
