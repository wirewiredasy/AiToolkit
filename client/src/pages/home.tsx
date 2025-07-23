import Hero3D from '@/components/ui/3d-hero';
import SimpleToolGrid from '@/components/ui/simple-tool-grid';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 3D Hero Section */}
      <Hero3D />

      {/* Simple Tool Grid */}
      <SimpleToolGrid />
    </div>
  );
}