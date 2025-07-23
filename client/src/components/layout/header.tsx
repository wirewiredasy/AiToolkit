
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, User, Bell } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import GeometricLogo from '@/components/ui/geometric-logo';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'All Tools', href: '/all-tools' },
    { name: 'PDF Tools', href: '/toolkit/pdf' },
    { name: 'Image Tools', href: '/toolkit/image' },
    { name: 'Media Tools', href: '/toolkit/media' },
    { name: 'Gov Tools', href: '/toolkit/government' },
    { name: 'Dev Tools', href: '/toolkit/developer' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <GeometricLogo size="md" showText={true} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="mx-6 hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-white text-gray-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Search */}
          <Button variant="ghost" size="sm" className="h-8 w-8 px-0 text-gray-300 hover:text-white">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          {/* User menu */}
          {user ? (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 px-0 text-gray-300 hover:text-white">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={logout} className="text-gray-300 hover:text-white">
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 animate-pulse">
                  Get Now
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 px-0 md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-800 md:hidden bg-gray-900">
          <nav className="container flex flex-col space-y-3 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 transition-colors hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
