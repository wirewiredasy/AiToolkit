import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GeometricLogo from '@/components/ui/geometric-logo';
import { 
  FileText, 
  Image as ImageIcon, 
  Music,
  Building,
  Code,
  Mail,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Sparkles,
  Send,
  CheckCircle
} from 'lucide-react';

const quickLinks = [
  { name: 'PDF Tools', path: '/toolkit/pdf' },
  { name: 'Image Tools', path: '/toolkit/image' },
  { name: 'Media Tools', path: '/toolkit/media' },
  { name: 'Government Tools', path: '/toolkit/government' },
  { name: 'Developer Tools', path: '/toolkit/developer' }
];

const legalLinks = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Service', path: '/terms' },
  { name: 'Contact Us', path: '/contact' },
  { name: 'About', path: '/about' }
];

const socialLinks = [
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/suntynai' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/suntynai' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/suntynai' },
  { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@suntynai' }
];

export default function SimpleCleanFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-slate-900 dark:bg-black border-t border-slate-800 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Newsletter Section */}
        <div className="mb-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated with AI Innovation</h3>
            <p className="text-gray-400 mb-6">
              Get the latest AI tools, features, and productivity tips delivered to your inbox.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-800 dark:bg-gray-900 border-slate-700 dark:border-gray-800 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!email || isLoading}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 text-green-400 max-w-md mx-auto p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span>Thank you! You're subscribed to our newsletter.</span>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-3">
              Join 50,000+ professionals. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/">
              <div className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity duration-200">
                <GeometricLogo size="md" showText={true} />
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Professional AI-powered tools for productivity and workflow automation.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-slate-800 dark:bg-gray-900 rounded-lg flex items-center justify-center hover:bg-slate-700 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-gray-400 hover:text-cyan-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tools</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-cyan-300 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-cyan-300 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@suntyn.ai" className="hover:text-cyan-300 transition-colors">
                  support@suntyn.ai
                </a>
              </div>
              <div className="text-gray-400 text-sm">
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 dark:border-gray-900 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Suntyn AI. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}