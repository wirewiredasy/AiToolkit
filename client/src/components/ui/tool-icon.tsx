import { LucideIcon } from 'lucide-react';
import { getToolIcon } from '@/lib/tool-icons';
import { AnimatedToolIcons } from './animated-tool-icons';
import { AnimatedImageIcons } from './image-tools-icons';
import { AnimatedMediaIcons } from './media-tools-icons';

interface ToolIconProps {
  toolId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export default function ToolIcon({ toolId, className = "", size = 'md', animate = true }: ToolIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  // Convert toolId to proper format for animated icons
  const getAnimatedIcon = (id: string) => {
    // PDF Tools
    const pdfIconMap: Record<string, keyof typeof AnimatedToolIcons> = {
      'pdf-splitter': 'Split',
      'pdf-merger': 'Merge', 
      'pdf-compressor': 'Compress',
      'pdf-to-word': 'PDFToWord',
      'word-to-pdf': 'WordToPDF',
      'pdf-to-excel': 'PDFToExcel',
      'excel-to-pdf': 'ExcelToPDF',
      'pdf-to-jpg': 'PDFToJPG',
      'jpg-to-pdf': 'JPGToPDF',
      'pdf-unlocker': 'Unlock',
      'pdf-protector': 'Protect',
      'pdf-rotator': 'Rotate',
    };

    // Image Tools
    const imageIconMap: Record<string, keyof typeof AnimatedImageIcons> = {
      'background-remover': 'BackgroundRemover',
      'image-resizer': 'ImageResizer',
      'image-compressor': 'ImageCompressor',
      'image-cropper': 'ImageCropper',
      'watermark-remover': 'WatermarkRemover',
      'image-converter': 'ImageConverter',
    };

    // Media Tools
    const mediaIconMap: Record<string, keyof typeof AnimatedMediaIcons> = {
      'video-converter': 'VideoConverter',
      'audio-converter': 'AudioConverter',
      'video-compressor': 'VideoCompressor',
      'audio-extractor': 'AudioExtractor',
      'gif-maker': 'GIFMaker',
      'video-trimmer': 'VideoTrimmer',
    };

    if (pdfIconMap[id]) {
      return { type: 'pdf', name: pdfIconMap[id] };
    }
    if (imageIconMap[id]) {
      return { type: 'image', name: imageIconMap[id] };
    }
    if (mediaIconMap[id]) {
      return { type: 'media', name: mediaIconMap[id] };
    }
    return null;
  };

  const animatedIcon = getAnimatedIcon(toolId);
  
  // Use animated icon if available, otherwise fallback to regular icon
  if (animatedIcon) {
    let AnimatedIcon;
    switch (animatedIcon.type) {
      case 'pdf':
        AnimatedIcon = AnimatedToolIcons[animatedIcon.name as keyof typeof AnimatedToolIcons];
        break;
      case 'image':
        AnimatedIcon = AnimatedImageIcons[animatedIcon.name as keyof typeof AnimatedImageIcons];
        break;
      case 'media':
        AnimatedIcon = AnimatedMediaIcons[animatedIcon.name as keyof typeof AnimatedMediaIcons];
        break;
      default:
        AnimatedIcon = null;
    }
    
    if (AnimatedIcon) {
      return <AnimatedIcon className={`${sizeClasses[size]} ${className}`} animate={animate} />;
    }
  }

  // Fallback to regular icon
  const IconComponent = getToolIcon(toolId);
  return (
    <IconComponent 
      className={`${sizeClasses[size]} ${className}`} 
    />
  );
}