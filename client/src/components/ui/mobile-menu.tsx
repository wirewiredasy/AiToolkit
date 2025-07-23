import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Home, Layers, BookOpen, Phone, HelpCircle } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/all-tools', label: 'All Tools', icon: Layers },
    { href: '/about', label: 'About', icon: BookOpen },
    { href: '/contact', label: 'Contact', icon: Phone },
    { href: '/help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col space-y-4 mt-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Suntyn AI
            </h2>
            <p className="text-sm text-slate-600 mt-2">108+ AI-powered tools</p>
          </div>
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left p-4 h-auto"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="text-base">{item.label}</span>
                </Button>
              </Link>
            );
          })}
          
          <div className="border-t pt-4 mt-6">
            <Link href="/signup">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => setIsOpen(false)}
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}