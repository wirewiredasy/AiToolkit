import { ToolTemplate } from "@/components/ui/tool-template";
import { Music } from "lucide-react";

export default function AudioConverterPage() {
  return (
    <ToolTemplate
      toolId="audio-converter"
      toolName="Audio Converter"
      description="Convert audio files between different formats. Support for MP3, WAV, AAC, FLAC, OGG and more with quality control options."
      icon={<Music className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "audio/*": [".mp3", ".wav", ".aac", ".flac", ".ogg", ".m4a", ".wma"] 
      }}
      maxFileSize={100 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "outputFormat",
          label: "Output Format",
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
          options: ["44100 Hz (CD Quality)", "48000 Hz (Professional)", "96000 Hz (High-Res)", "Auto"],
          defaultValue: "Auto",
          description: "Audio sample rate"
        },
        {
          key: "channels",
          label: "Channels",
          type: "select",
          options: ["Auto", "Mono", "Stereo"],
          defaultValue: "Auto",
          description: "Audio channel configuration"
        },
        {
          key: "normalizeVolume",
          label: "Normalize Volume",
          type: "switch",
          defaultValue: false,
          description: "Adjust volume to standard level"
        }
      ]}
      endpoint="/api/tools/audio-converter"
      gradientFrom="from-green-500"
      gradientTo="to-blue-600"
    />
  );
}