
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import SuntynLogo from '@/components/ui/suntyn-logo';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: 'fas fa-home' },
    { name: 'All Tools', href: '/all-tools', icon: 'fas fa-th-large' },
    { name: 'PDF Tools', href: '/toolkit/pdf', icon: 'fas fa-file-pdf' },
    { name: 'Image Tools', href: '/toolkit/image', icon: 'fas fa-image' },
    { name: 'Audio/Video', href: '/toolkit/media', icon: 'fas fa-video' },
    { name: 'Gov Tools', href: '/toolkit/government', icon: 'fas fa-landmark' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-20 blur-lg rounded-full transition-opacity duration-300"></div>
              <SuntynLogo size="sm" animated={true} showText={true} className="relative z-10" />
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg flex items-center space-x-2 ${
                  location === item.href 
                    ? 'text-yellow-600 bg-yellow-50 shadow-sm' 
                    : 'text-slate-700 hover:text-yellow-600 hover:bg-yellow-50'
                }`}>
                  <i className={`${item.icon} text-xs`}></i>
                  <span>{item.name}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Enhanced User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full group">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <span className="text-sm font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <i className="fas fa-tachometer-alt mr-2 text-yellow-600"></i>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 flex items-center"
                    onClick={logout}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" asChild className="text-slate-700 hover:text-yellow-600 hover:bg-yellow-50">
                  <Link href="/login" className="flex items-center space-x-2">
                    <i className="fas fa-sign-in-alt text-sm"></i>
                    <span>Sign In</span>
                  </Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white px-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/signup" className="flex items-center space-x-2">
                    <i className="fas fa-rocket text-sm"></i>
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>
            )}

            {/* Enhanced Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden p-2 hover:bg-yellow-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg text-slate-700`}></i>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className={`flex items-center space-x-3 px-3 py-3 text-base font-medium transition-colors hover:text-yellow-600 hover:bg-yellow-50 rounded-md ${
                    location === item.href ? 'text-yellow-600 bg-yellow-50' : 'text-slate-700'
                  }`}>
                    <i className={`${item.icon} text-sm`}></i>
                    <span>{item.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
