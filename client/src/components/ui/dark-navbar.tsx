import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GeometricLogo from '@/components/ui/geometric-logo';

const navigationItems = [
  { href: '/', label: 'HOME' },
  { href: '/all-tools', label: 'ALL TOOLS' }, 
  { href: '/toolkit/pdf', label: 'PDF' },
  { href: '/toolkit/image', label: 'IMAGE' },
  { href: '/toolkit/media', label: 'MUSIC/VIDEO' },
  { href: '/toolkit/government', label: 'GOVT' },
  { href: '/toolkit/developer', label: 'DEV' },
];

export default function DarkNavbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-xl shadow-2xl' 
        : 'bg-black/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="hover:opacity-80 transition-opacity duration-200">
              <GeometricLogo size="md" showText={true} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <span className={`text-sm font-medium transition-all duration-200 hover:text-cyan-400 ${
                    isActive 
                      ? 'text-cyan-400' 
                      : 'text-white'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Sign Up Button */}
          <Button 
            className="hidden lg:flex bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300"
            asChild
          >
            <Link href="/signup">
              Sign Up
            </Link>
          </Button>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-cyan-400 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 rounded-b-2xl">
              {navigationItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div 
                      className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-cyan-500/20 text-cyan-400' 
                          : 'text-white hover:bg-gray-800 hover:text-cyan-400'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </div>
                  </Link>
                );
              })}
              <div className="pt-4">
                <Button 
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
                  asChild
                >
                  <Link href="/all-tools">
                    Download Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}