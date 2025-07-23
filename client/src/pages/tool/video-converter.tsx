import { ToolTemplate } from "@/components/ui/tool-template";
import { Video } from "lucide-react";

export default function VideoConverterPage() {
  return (
    <ToolTemplate
      toolId="video-converter"
      toolName="Video Converter"
      description="Convert videos between different formats. Support for MP4, AVI, MOV, MKV, WebM and more with resolution and quality control."
      icon={<Video className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "video/*": [".mp4", ".avi", ".mov", ".mkv", ".wmv", ".webm", ".flv"] 
      }}
      maxFileSize={500 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["MP4", "AVI", "MOV", "MKV", "WebM", "FLV"],
          defaultValue: "MP4",
          required: true,
          description: "Target video format"
        },
        {
          key: "resolution",
          label: "Resolution",
          type: "select",
          options: ["Original", "4K (3840x2160)", "1080p (1920x1080)", "720p (1280x720)", "480p (854x480)"],
          defaultValue: "Original",
          description: "Output video resolution"
        },
        {
          key: "quality",
          label: "Video Quality",
          type: "select",
          options: ["High", "Medium", "Low", "Custom"],
          defaultValue: "High",
          description: "Video compression quality"
        },
        {
          key: "frameRate",
          label: "Frame Rate",
          type: "select",
          options: ["Original", "60 FPS", "30 FPS", "24 FPS", "15 FPS"],
          defaultValue: "Original",
          description: "Video frame rate"
        },
        {
          key: "codec",
          label: "Video Codec",
          type: "select",
          options: ["H.264 (Compatible)", "H.265 (Efficient)", "VP9 (Web)", "AV1 (Modern)"],
          defaultValue: "H.264 (Compatible)",
          description: "Video compression codec"
        },
        {
          key: "audioCodec",
          label: "Audio Codec",
          type: "select",
          options: ["AAC", "MP3", "Opus", "Original"],
          defaultValue: "AAC",
          description: "Audio compression codec"
        }
      ]}
      endpoint="/api/tools/video-converter"
      gradientFrom="from-green-500"
      gradientTo="to-blue-600"
    />
  );
}