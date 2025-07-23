import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { getToolkitById } from '@/lib/tools';

export default function ImageToolkit() {
  const toolkit = getToolkitById('image');

  if (!toolkit) {
    return <div>Toolkit not found</div>;
  }

  const imageTools = [
    { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to any dimension', icon: 'fas fa-expand-arrows-alt', route: '/tool/image-resizer' },
    { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce image file size', icon: 'fas fa-compress', route: '/tool/image-compressor' },
    { id: 'image-converter', name: 'Image Converter', description: 'Convert between image formats', icon: 'fas fa-exchange-alt', route: '/tool/image-converter' },
    { id: 'bg-remover', name: 'Background Remover', description: 'Remove image background with AI', icon: 'fas fa-magic', route: '/tool/bg-remover' },
    { id: 'image-cropper', name: 'Image Cropper', description: 'Crop images to custom size', icon: 'fas fa-crop', route: '/tool/image-cropper' },
    { id: 'image-rotator', name: 'Image Rotator', description: 'Rotate images by any angle', icon: 'fas fa-redo', route: '/tool/image-rotator' },
    { id: 'image-flipper', name: 'Image Flipper', description: 'Flip images horizontally or vertically', icon: 'fas fa-retweet', route: '/tool/image-flipper' },
    { id: 'image-filter-effects', name: 'Filter Effects', description: 'Apply artistic filters and effects', icon: 'fas fa-filter', route: '/tool/image-filter-effects' },
    { id: 'image-enhance', name: 'AI Image Enhancer', description: 'Enhance image quality with AI', icon: 'fas fa-sparkles', route: '/tool/image-enhance' },
    { id: 'image-upscale', name: 'AI Image Upscaler', description: 'Upscale images with AI technology', icon: 'fas fa-search-plus', route: '/tool/image-upscale' },
    { id: 'watermark-add', name: 'Watermark Adder', description: 'Add watermarks to protect images', icon: 'fas fa-shield-alt', route: '/tool/watermark-add' },
    { id: 'image-blur-tool', name: 'Image Blur Tool', description: 'Apply blur effects to images', icon: 'fas fa-eye', route: '/tool/image-blur-tool' },
    { id: 'image-sharpen', name: 'Image Sharpener', description: 'Enhance image sharpness and clarity', icon: 'fas fa-crosshairs', route: '/tool/image-sharpen' },
    { id: 'image-border-adder', name: 'Border Adder', description: 'Add borders and frames to images', icon: 'fas fa-square', route: '/tool/image-border-adder' },
    { id: 'image-metadata-extractor', name: 'Metadata Extractor', description: 'Extract EXIF data from images', icon: 'fas fa-info-circle', route: '/tool/image-metadata-extractor' },
    { id: 'meme-generator', name: 'Meme Generator', description: 'Create hilarious memes with text', icon: 'fas fa-laugh', route: '/tool/meme-generator' },
    { id: 'image-colorizer', name: 'AI Image Colorizer', description: 'Add color to black and white images', icon: 'fas fa-palette', route: '/tool/image-colorizer' },
    { id: 'image-enhancer', name: 'Image Enhancer', description: 'Professional image enhancement', icon: 'fas fa-magic', route: '/tool/image-enhancer' },
    { id: 'image-upscaler', name: 'Image Upscaler', description: 'Upscale images to higher resolution', icon: 'fas fa-expand-arrows-alt', route: '/tool/image-upscaler' },
    { id: 'watermark-remover', name: 'Watermark Remover', description: 'Remove watermarks from images', icon: 'fas fa-eraser', route: '/tool/watermark-remover' }
    { id: 'image-upscale', name: 'Image Upscaler', description: 'Upscale images with AI', icon: 'fas fa-search-plus', route: '/tool/image-upscale' },
    { id: 'watermark-add', name: 'Add Watermark', description: 'Add text or image watermark', icon: 'fas fa-tint', route: '/tool/watermark-add' },
    { id: 'watermark-remove', name: 'Remove Watermark', description: 'Remove watermarks from images', icon: 'fas fa-eraser', route: '/tool/watermark-remove' },
    { id: 'image-blur', name: 'Image Blur', description: 'Apply blur effects', icon: 'fas fa-eye-slash', route: '/tool/image-blur' },
    { id: 'image-sharpen', name: 'Image Sharpen', description: 'Sharpen blurry images', icon: 'fas fa-eye', route: '/tool/image-sharpen' },
    { id: 'image-border', name: 'Add Border', description: 'Add borders to images', icon: 'fas fa-border-style', route: '/tool/image-border' },
    { id: 'image-merge', name: 'Image Merger', description: 'Combine multiple images', icon: 'fas fa-object-group', route: '/tool/image-merge' },
    { id: 'image-split', name: 'Image Splitter', description: 'Split images into parts', icon: 'fas fa-cut', route: '/tool/image-split' },
    { id: 'color-picker', name: 'Color Picker', description: 'Extract colors from images', icon: 'fas fa-eyedropper', route: '/tool/color-picker' },
    { id: 'image-metadata', name: 'Image Metadata', description: 'View and edit image metadata', icon: 'fas fa-info-circle', route: '/tool/image-metadata' },
    { id: 'meme-generator', name: 'Meme Generator', description: 'Create memes with text', icon: 'fas fa-laugh', route: '/tool/meme-generator' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Image Toolkit' },
  ];

  return (
    <div className="py-8 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Toolkit Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-image text-3xl text-purple-600"></i>
          </div>
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">{toolkit.name}</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            {toolkit.description}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-neutral-500">
            <span>{toolkit.toolCount} Tools Available</span>
            <span>•</span>
            <span>AI-Powered</span>
            <span>•</span>
            <span>Free Forever</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {imageTools.map((tool) => (
            <Card key={tool.id} className="tool-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <Link href={tool.route}>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <i className={`${tool.icon} text-purple-600`}></i>
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">{tool.name}</h3>
                  <p className="text-sm text-neutral-600 mb-4">{tool.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-600 font-medium">Free</span>
                    <i className="fas fa-arrow-right text-neutral-400"></i>
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
