import ProfessionalHero from '@/components/ui/professional-hero';
import ProfessionalToolGrid from '@/components/ui/professional-tool-grid';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Professional Hero Section */}
      <ProfessionalHero />

      {/* Professional Tool Grid */}
      <ProfessionalToolGrid />
    </div>
  );
}