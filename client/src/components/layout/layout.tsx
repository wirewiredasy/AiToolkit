import DarkNavbar from '@/components/ui/dark-navbar';
import EnhancedPreFooter from '@/components/ui/enhanced-pre-footer';
import EnhancedFooter from './enhanced-footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <DarkNavbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <EnhancedPreFooter />
      <EnhancedFooter />
    </div>
  );
}
