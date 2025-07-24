import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { getToolkitById } from '@/lib/tools';
import ToolIcon from '@/components/ui/tool-icon';

export default function MediaToolkit() {
  const toolkit = getToolkitById('media');

  if (!toolkit) {
    return <div>Toolkit not found</div>;
  }

  const mediaTools = [
    { id: 'audio-converter', name: 'Audio Converter', description: 'Convert between audio formats', icon: 'fas fa-music', route: '/tool/audio-converter' },
    { id: 'video-converter', name: 'Video Converter', description: 'Convert between video formats', icon: 'fas fa-video', route: '/tool/video-converter' },
    { id: 'audio-trimmer', name: 'Audio Trimmer', description: 'Cut and trim audio files', icon: 'fas fa-cut', route: '/tool/audio-trimmer' },
    { id: 'video-trimmer', name: 'Video Trimmer', description: 'Cut and trim video files', icon: 'fas fa-film', route: '/tool/video-trimmer' },
    { id: 'audio-merger', name: 'Audio Merger', description: 'Combine multiple audio files', icon: 'fas fa-object-group', route: '/tool/audio-merger' },
    { id: 'video-merger', name: 'Video Merger', description: 'Combine multiple video files', icon: 'fas fa-video', route: '/tool/video-merger' },
    { id: 'audio-extractor', name: 'Audio Extractor', description: 'Extract audio from video', icon: 'fas fa-volume-up', route: '/tool/audio-extractor' },
    { id: 'video-compressor', name: 'Video Compressor', description: 'Reduce video file size', icon: 'fas fa-compress', route: '/tool/video-compressor' },
    { id: 'audio-compressor', name: 'Audio Compressor', description: 'Reduce audio file size', icon: 'fas fa-compress-alt', route: '/tool/audio-compressor' },
    { id: 'volume-changer', name: 'Volume Changer', description: 'Adjust audio volume', icon: 'fas fa-volume-up', route: '/tool/volume-changer' },
    { id: 'volume-adjuster', name: 'Volume Adjuster', description: 'Fine-tune audio volume', icon: 'fas fa-volume-up', route: '/tool/volume-adjuster' },
    { id: 'speed-changer', name: 'Speed Changer', description: 'Change playback speed', icon: 'fas fa-tachometer-alt', route: '/tool/speed-changer' },
    { id: 'audio-normalizer', name: 'Audio Normalizer', description: 'Normalize audio levels', icon: 'fas fa-balance-scale', route: '/tool/audio-normalizer' },
    { id: 'noise-reducer', name: 'Noise Reducer', description: 'Remove background noise', icon: 'fas fa-volume-mute', route: '/tool/noise-reducer' },
    { id: 'vocal-remover', name: 'Vocal Remover', description: 'Remove vocals from audio', icon: 'fas fa-microphone-slash', route: '/tool/vocal-remover' },
    { id: 'audio-reverser', name: 'Audio Reverser', description: 'Reverse audio playback', icon: 'fas fa-backward', route: '/tool/audio-reverser' },
    { id: 'pitch-changer', name: 'Pitch Changer', description: 'Change audio pitch', icon: 'fas fa-sliders-h', route: '/tool/pitch-changer' },
    { id: 'video-resizer', name: 'Video Resizer', description: 'Change video resolution', icon: 'fas fa-expand-arrows-alt', route: '/tool/video-resizer' },
    { id: 'video-rotator', name: 'Video Rotator', description: 'Rotate video orientation', icon: 'fas fa-redo', route: '/tool/video-rotator' },
    { id: 'subtitle-extractor', name: 'Subtitle Extractor', description: 'Extract subtitles from video', icon: 'fas fa-closed-captioning', route: '/tool/subtitle-extractor' },
    { id: 'subtitle-adder', name: 'Subtitle Adder', description: 'Add subtitles to video', icon: 'fas fa-closed-captioning', route: '/tool/subtitle-adder' },
    { id: 'video-watermark', name: 'Video Watermark', description: 'Add watermark to video', icon: 'fas fa-image', route: '/tool/video-watermark' },
    { id: 'thumbnail-generator', name: 'Thumbnail Generator', description: 'Generate video thumbnails', icon: 'fas fa-image', route: '/tool/thumbnail-generator' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Media Toolkit' },
  ];

  return (
    <div className="py-8 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Toolkit Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/30">
            <ToolIcon toolId="audio-converter" className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{toolkit.name}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {toolkit.description}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>{toolkit.toolCount} Tools Available</span>
            <span>•</span>
            <span>Professional Quality</span>
            <span>•</span>
            <span>Fast Processing</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaTools.map((tool) => (
            <Card key={tool.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <Link href={tool.route}>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 border border-green-500/30">
                    <ToolIcon toolId={tool.id} className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-300 mb-4">{tool.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-400 font-medium">Free</span>
                    <i className="fas fa-arrow-right text-gray-500"></i>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
