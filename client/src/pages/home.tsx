import SuntynHero from '@/components/ui/suntyn-hero';
import ProfessionalPreFooter from '@/components/ui/professional-pre-footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Suntyn AI Hero Section - Exact Clone */}
      <SuntynHero />
      
      {/* Professional Pre-Footer Section */}
      <ProfessionalPreFooter />
    </div>
  );
}