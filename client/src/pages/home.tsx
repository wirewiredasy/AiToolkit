import ReferenceHero from '@/components/ui/reference-hero';
import ProfessionalPreFooter from '@/components/ui/professional-pre-footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Reference Hero Section - Exact Replica */}
      <ReferenceHero />
      
      {/* Professional Pre-Footer Section */}
      <ProfessionalPreFooter />
    </div>
  );
}