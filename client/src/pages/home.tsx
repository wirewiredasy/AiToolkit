import DeveloperHero from '@/components/ui/developer-hero';
import InteractivePreFooter from '@/components/ui/interactive-pre-footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Developer Hero Section - Exact Clone */}
      <DeveloperHero />
      
      {/* Interactive Pre-Footer Section */}
      <InteractivePreFooter />
    </div>
  );
}