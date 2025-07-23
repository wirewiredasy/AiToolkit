import { ToolTemplate } from "@/components/ui/tool-template";
import { Music4 } from "lucide-react";

export default function VideoToAudioPage() {
  return (
    <ToolTemplate
      toolId="video-to-audio"
      toolName="Video to Audio Extractor"
      description="Extract audio tracks from video files. Convert videos to MP3, WAV, AAC, and other audio formats with quality control."
      icon={<Music4 className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "video/*": [".mp4", ".avi", ".mov", ".mkv", ".wmv", ".webm", ".flv"] 
      }}
      maxFileSize={500 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "outputFormat",
          label: "Audio Format",
          type: "select",
          options: ["MP3", "WAV", "AAC", "FLAC", "OGG", "M4A"],
          defaultValue: "MP3",
          required: true,
          description: "Target audio format"
        },
        {
          key: "quality",
          label: "Audio Quality",
          type: "select",
          options: ["High (320 kbps)", "Standard (192 kbps)", "Good (128 kbps)", "Low (96 kbps)"],
          defaultValue: "High (320 kbps)",
          description: "Audio quality and bitrate"
        },
        {
          key: "sampleRate",
          label: "Sample Rate",
          type: "select",
          options: ["44100 Hz (CD Quality)", "48000 Hz (Professional)", "22050 Hz (Voice)", "Original"],
          defaultValue: "44100 Hz (CD Quality)",
          description: "Audio sample rate"
        },
        {
          key: "channels",
          label: "Audio Channels",
          type: "select",
          options: ["Stereo", "Mono", "Original"],
          defaultValue: "Original",
          description: "Audio channel configuration"
        },
        {
          key: "startTime",
          label: "Start Time (HH:MM:SS)",
          type: "text",
          placeholder: "00:00:00",
          description: "Extract audio from this time (optional)"
        },
        {
          key: "duration",
          label: "Duration (seconds)",
          type: "number",
          min: 1,
          max: 3600,
          description: "How long to extract (leave empty for full audio)"
        },
        {
          key: "normalizeVolume",
          label: "Normalize Volume",
          type: "switch",
          defaultValue: true,
          description: "Adjust volume to standard level"
        }
      ]}
      endpoint="/api/tools/video-to-audio"
      gradientFrom="from-green-500"
      gradientTo="to-blue-600"
    />
  );
}