// Clean implementation of tool icons with valid Lucide React imports
import {
  // PDF Tools
  FileText, FilePlus, Scissors, Minimize2, FileX,
  FileSpreadsheet, FileImage, Scan, Hash, Lock,
  Unlock, Rotate3D, Type, Search, Edit3,
  Download, Upload, Merge, Split,
  
  // Image Tools  
  Image, Crop, RotateCw, FlipHorizontal, Palette,
  Contrast, Sparkles, Droplet, Badge,
  Frame, Layers2, Camera, Eye, Zap,
  
  // Media Tools
  Music, Video, Headphones, Volume2, VolumeX,
  Play, Pause, SkipForward, SkipBack, Repeat,
  Shuffle, Mic, Speaker, Radio, Disc,
  
  // Government Tools
  CreditCard, Building, FileCheck, Shield, Stamp,
  Award, CheckCircle, UserCheck, Flag, Globe,
  Calendar, Clock, MapPin, Phone, Mail,
  
  // Developer Tools
  Code, Terminal, Database, Server, Cpu,
  HardDrive, Wifi, Settings, Wrench, Cog
} from 'lucide-react';

export const toolIcons: Record<string, any> = {
  // PDF Tools
  'pdf-merger': FilePlus,
  'pdf-splitter': Scissors,
  'pdf-compressor': Minimize2,
  'pdf-to-word': FileText,
  'pdf-to-excel': FileSpreadsheet,
  'pdf-to-powerpoint': FileImage,
  'word-to-pdf': FileX,
  'excel-to-pdf': FileSpreadsheet,
  'powerpoint-to-pdf': FileImage,
  'ppt-to-pdf': FileImage,
  'pdf-ocr': Scan,
  'pdf-page-numberer': Hash,
  'pdf-password-protector': Lock,
  'pdf-password-remover': Unlock,
  'pdf-rotator': Rotate3D,
  'pdf-text-extractor': Type,
  'pdf-page-extractor': Search,
  'pdf-form-filler': Edit3,
  'pdf-watermark': Droplet,
  'pdf-bookmark-manager': Badge,
  'pdf-metadata-editor': Edit3,
  'pdf-validator': CheckCircle,
  'pdf-optimizer': Zap,
  'pdf-page-sorter': Shuffle,
  'pdf-blank-page-remover': FileX,
  'pdf-page-counter': Hash,
  'pdf-cropper': Crop,
  
  // Image Tools
  'image-resizer': Image,
  'image-cropper': Crop,
  'image-rotator': RotateCw,
  'image-flipper': FlipHorizontal,
  'background-remover': Layers2,
  'bg-remover': Layers2,
  'image-compressor': Minimize2,
  'image-converter': Camera,
  'image-filter': Palette,
  'image-blur': Sparkles,
  'image-sharpen': Sparkles,
  'watermark-remover': Droplet,
  'watermark-add': Droplet,
  'meme-generator': Badge,
  'image-enhancer': Eye,
  'color-picker': Palette,
  'image-collage-maker': Frame,
  'image-border-adder': Frame,
  'image-vintage-effect': Camera,
  'image-cartoon-effect': Badge,
  'image-sketch-effect': Edit3,
  'image-oil-painting-effect': Palette,
  
  // Media Tools
  'audio-converter': Music,
  'video-converter': Video,
  'audio-trimmer': Scissors,
  'video-trimmer': Scissors,
  'audio-joiner': FilePlus,
  'video-joiner': FilePlus,
  'audio-extractor': Headphones,
  'video-compressor': Minimize2,
  'audio-volume-changer': Volume2,
  'video-speed-changer': Play,
  'audio-noise-reducer': VolumeX,
  'video-watermark-remover': Droplet,
  'audio-normalizer': Speaker,
  'video-resizer': Camera,
  'video-rotator': Rotate3D,
  'audio-reverb-adder': Radio,
  'video-subtitle-adder': Type,
  'audio-pitch-changer': Mic,
  'video-frame-extractor': FileImage,
  'audio-silence-remover': VolumeX,
  
  // Government Tools
  'pan-validator': CreditCard,
  'gst-validator': Building,
  'aadhaar-validator': UserCheck,
  'pan-masker': Shield,
  'aadhaar-masker': Shield,
  'income-certificate-generator': Award,
  'domicile-certificate-generator': Flag,
  'caste-certificate-generator': FileCheck,
  'character-certificate-generator': CheckCircle,
  'birth-certificate-generator': Calendar,
  'death-certificate-generator': Clock,
  'marriage-certificate-generator': Award,
  'address-proof-generator': MapPin,
  'employment-certificate-generator': Building,
  'experience-certificate-generator': Badge,
  
  // Developer Tools
  'json-formatter': Code,
  'qr-code-generator': Code,
  'password-generator': Lock,
  'hash-generator': Hash,
  'url-shortener': Globe,
  'base64-encoder': Terminal,
  'color-palette-generator': Palette,
  'regex-tester': Search,
  'json-validator': CheckCircle,
  'xml-formatter': Code,
  'css-minifier': Minimize2,
  'js-minifier': Minimize2,
  'html-formatter': Code,
  'sql-formatter': Database,
  'uuid-generator': Hash,
  'lorem-ipsum-generator': Type,
  'markdown-to-html': FileText,
  'html-to-markdown': FileX,
  'timestamp-converter': Clock,
  'unit-converter': Cog
};

export const getToolIcon = (toolId: string) => {
  return toolIcons[toolId] || Code;
};