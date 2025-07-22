
import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SuntynLogo from '@/components/ui/suntyn-logo';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const toolkitLinks = [
    { name: 'PDF Tools', href: '/toolkit/pdf' },
    { name: 'Image Tools', href: '/toolkit/image' },
    { name: 'Audio/Video Tools', href: '/toolkit/media' },
    { name: 'Government Tools', href: '/toolkit/government' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Blog', href: '#', badge: 'Coming Soon' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Support', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-200">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Stay Updated with Suntyn AI
            </h3>
            <p className="text-gray-600 mb-6">
              Get the latest updates on new AI tools, features, and productivity tips delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
            {isSubscribed && (
              <p className="text-green-600 text-sm mt-2">
                Thank you for subscribing to our newsletter!
              </p>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <SuntynLogo size="sm" animated={false} showText={true} />
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Professional AI-powered tools for document processing, image editing, 
                and media conversion. Fast, secure, and reliable solutions for all your needs.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  support@suntynai.com
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  +1 (555) 123-4567
                </div>
                <div className="flex items-start text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-0.5" />
                  123 AI Street, Tech Valley, CA 94025
                </div>
              </div>
            </div>

            {/* AI Tools */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Tools</h3>
              <ul className="space-y-3">
                {toolkitLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <div className="flex items-center">
                      <a href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                        {link.name}
                      </a>
                      {link.badge && (
                        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-500 text-sm">
                © 2024 Suntyn AI. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  All Systems Operational
                </span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-gray-600 text-lg"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-gray-600 text-lg"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-gray-600 text-lg"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Discord"
              >
                <i className="fab fa-discord text-gray-600 text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
