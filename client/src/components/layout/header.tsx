import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import SuntynLogo from '@/components/ui/suntyn-logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Header() {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:scale-105 transition-transform duration-200">
            <SuntynLogo size="sm" animated={true} showText={true} />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/#tools" className="text-neutral-600 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text font-medium transition-all duration-200">
            🔧 Tools
          </Link>
          <Link href="/dashboard" className="text-neutral-600 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 hover:bg-clip-text font-medium transition-all duration-200">
            📊 Dashboard
          </Link>
          <Link href="/api" className="text-neutral-600 hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 hover:bg-clip-text font-medium transition-all duration-200">
            🤖 API
          </Link>
          <Link href="/about" className="text-neutral-600 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text font-medium transition-all duration-200">
            ℹ️ About
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
