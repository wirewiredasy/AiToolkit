import { ToolTemplate } from "@/components/ui/tool-template";
import { Video } from "lucide-react";

export default function VideoConverterPage() {
  return (
    <ToolTemplate
      toolId="video-converter"
      toolName="Video Format Converter"
      description="Convert videos between different formats. Support for MP4, AVI, MOV, MKV, WebM, and more with quality and compression options."
      icon={<Video className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "video/*": [".mp4", ".avi", ".mov", ".mkv", ".wmv", ".webm", ".flv", ".m4v"] 
      }}
      maxFileSize={1024 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["MP4", "AVI", "MOV", "MKV", "WebM", "FLV", "WMV"],
          defaultValue: "MP4",
          required: true,
          description: "Target video format"
        },
        {
          key: "videoQuality",
          label: "Video Quality",
          type: "select",
          options: ["4K (2160p)", "1080p (Full HD)", "720p (HD)", "480p (SD)", "360p (Low)", "Original"],
          defaultValue: "1080p (Full HD)",
          description: "Video resolution and quality"
        },
        {
          key: "compression",
          label: "Compression Level",
          type: "select",
          options: ["High Quality (Large File)", "Balanced", "Compressed (Medium)", "Highly Compressed (Small)"],
          defaultValue: "Balanced",
          description: "Balance between quality and file size"
        },
        {
          key: "frameRate",
          label: "Frame Rate",
          type: "select",
          options: ["60 fps", "30 fps", "24 fps", "15 fps", "Original"],
          defaultValue: "Original",
          description: "Video frame rate"
        },
        {
          key: "audioCodec",
          label: "Audio Codec",
          type: "select",
          options: ["AAC", "MP3", "AC3", "Original", "No Audio"],
          defaultValue: "AAC",
          description: "Audio encoding format"
        },
        {
          key: "aspectRatio",
          label: "Aspect Ratio",
          type: "select",
          options: ["16:9 (Widescreen)", "4:3 (Standard)", "1:1 (Square)", "9:16 (Vertical)", "Original"],
          defaultValue: "Original",
          description: "Video aspect ratio"
        }
      ]}
      endpoint="/api/tools/video-converter"
      gradientFrom="from-green-500"
      gradientTo="to-blue-600"
    />
  );
}