import DeveloperHero from '@/components/ui/developer-hero';
import ProfessionalPreFooter from '@/components/ui/professional-pre-footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Developer Hero Section - Exact Clone */}
      <DeveloperHero />
      
      {/* Professional Pre-Footer Section */}
      <ProfessionalPreFooter />
    </div>
  );
}