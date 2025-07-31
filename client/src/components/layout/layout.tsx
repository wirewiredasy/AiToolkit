import DarkNavbar from '@/components/ui/dark-navbar';
import FramerStylePreFooter from '@/components/ui/framer-style-prefooter';
import SimpleCleanFooter from './simple-clean-footer';

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
      <FramerStylePreFooter />
      <SimpleCleanFooter />
    </div>
  );
}
