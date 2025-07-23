import Hero3D from '@/components/ui/3d-hero';
import ModernToolGrid from '@/components/ui/modern-tool-grid';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 3D Hero Section */}
      <Hero3D />

      {/* Modern Tool Grid */}
      <ModernToolGrid />
    </div>
  );
}