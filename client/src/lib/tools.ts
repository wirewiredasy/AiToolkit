export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  route: string;
  usageCount?: string;
  featured?: boolean;
}

export interface Toolkit {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  tools: Tool[];
  toolCount: number;
}

export const toolkits: Toolkit[] = [
  {
    id: 'pdf',
    name: 'PDF Toolkit',
    description: 'Complete PDF solution with 25 tools including merge, split, compress, convert, and OCR capabilities.',
    icon: 'fas fa-file-pdf',
    route: '/toolkit/pdf',
    color: 'red',
    toolCount: 25,
    tools: [
      {
        id: 'pdf-merger',
        name: 'PDF Merger',
        description: 'Combine multiple PDF files into one',
        category: 'PDF',
        icon: 'fas fa-compress-alt',
        route: '/tool/pdf-merger',
        usageCount: '250K+',
        featured: true,
      },
      {
        id: 'pdf-splitter',
        name: 'PDF Splitter',
        description: 'Split PDF into separate pages',
        category: 'PDF',
        icon: 'fas fa-cut',
        route: '/tool/pdf-splitter',
        usageCount: '180K+',
      },
      {
        id: 'pdf-compressor',
        name: 'PDF Compressor',
        description: 'Reduce PDF file size',
        category: 'PDF',
        icon: 'fas fa-compress',
        route: '/tool/pdf-compressor',
        usageCount: '320K+',
      },
      // Add more PDF tools...
    ],
  },
  {
    id: 'image',
    name: 'Image Toolkit',
    description: 'Advanced image processing with 20 tools for resize, compress, convert, enhance, and AI-powered features.',
    icon: 'fas fa-image',
    route: '/toolkit/image',
    color: 'purple',
    toolCount: 20,
    tools: [
      {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images to any dimension',
        category: 'Image',
        icon: 'fas fa-expand-arrows-alt',
        route: '/tool/image-resizer',
        usageCount: '180K+',
        featured: true,
      },
      {
        id: 'bg-remover',
        name: 'AI Background Remover',
        description: 'Remove backgrounds automatically',
        category: 'Image',
        icon: 'fas fa-magic',
        route: '/tool/bg-remover',
        usageCount: '320K+',
        featured: true,
      },
      // Add more image tools...
    ],
  },
  {
    id: 'media',
    name: 'Media Toolkit',
    description: 'Professional audio and video tools with 20 converters, editors, and AI-enhanced processing capabilities.',
    icon: 'fas fa-play',
    route: '/toolkit/media',
    color: 'green',
    toolCount: 20,
    tools: [
      {
        id: 'audio-converter',
        name: 'Audio Converter',
        description: 'Convert between audio formats',
        category: 'Audio/Video',
        icon: 'fas fa-music',
        route: '/tool/audio-converter',
        usageCount: '95K+',
        featured: true,
      },
      // Add more media tools...
    ],
  },
  {
    id: 'government',
    name: 'Govt Documents',
    description: 'Indian government document tools with 15 utilities for PAN, Aadhaar, certificates, and official forms.',
    icon: 'fas fa-landmark',
    route: '/toolkit/government',
    color: 'orange',
    toolCount: 15,
    tools: [
      {
        id: 'pan-validator',
        name: 'PAN Validator',
        description: 'Validate PAN card format',
        category: 'Government',
        icon: 'fas fa-id-card',
        route: '/tool/pan-validator',
        usageCount: '75K+',
        featured: true,
      },
      // Add more government tools...
    ],
  },
];

export const getFeaturedTools = (): Tool[] => {
  return toolkits.flatMap(toolkit => toolkit.tools.filter(tool => tool.featured));
};

export const getToolkitById = (id: string): Toolkit | undefined => {
  return toolkits.find(toolkit => toolkit.id === id);
};

export const getToolById = (id: string): Tool | undefined => {
  for (const toolkit of toolkits) {
    const tool = toolkit.tools.find(tool => tool.id === id);
    if (tool) return tool;
  }
  return undefined;
};

export const getColorClasses = (color: string) => {
  const colorMap = {
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      border: 'border-red-500',
      hover: 'hover:border-red-500',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-500',
      hover: 'hover:border-purple-500',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-500',
      hover: 'hover:border-green-500',
    },
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
      border: 'border-orange-500',
      hover: 'hover:border-orange-500',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-500',
      hover: 'hover:border-blue-500',
    },
  };
  
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};
