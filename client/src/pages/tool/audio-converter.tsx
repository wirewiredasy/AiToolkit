import { ToolTemplate } from "@/components/ui/tool-template";
import { Music } from "lucide-react";

export default function AudioConverterPage() {
  return (
    <ToolTemplate
      toolId="audio-converter"
      toolName="Audio Format Converter"
      description="Convert audio files between different formats. Support for MP3, WAV, AAC, FLAC, OGG, and more with quality control options."
      icon={<Music className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "audio/*": [".mp3", ".wav", ".aac", ".flac", ".ogg", ".m4a", ".wma", ".opus"] 
      }}
      maxFileSize={200 * 1024 * 1024}
      allowMultiple={true}
      settings={[
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["MP3", "WAV", "AAC", "FLAC", "OGG", "M4A", "OPUS", "WMA"],
          defaultValue: "MP3",
          required: true,
          description: "Target audio format"
        },
        {
          key: "quality",
          label: "Audio Quality",
          type: "select",
          options: ["320 kbps (Highest)", "256 kbps (High)", "192 kbps (Standard)", "128 kbps (Good)", "96 kbps (Low)"],
          defaultValue: "192 kbps (Standard)",
          description: "Audio bitrate and quality"
        },
        {
          key: "sampleRate",
          label: "Sample Rate",
          type: "select",
          options: ["48000 Hz (Professional)", "44100 Hz (CD Quality)", "22050 Hz (Voice)", "16000 Hz (Podcast)", "Original"],
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
          key: "normalizeVolume",
          label: "Normalize Volume",
          type: "switch",
          defaultValue: false,
          description: "Adjust volume to standard level"
        },
        {
          key: "removeMetadata",
          label: "Remove Metadata",
          type: "switch",
          defaultValue: false,
          description: "Strip ID3 tags and metadata"
        }
      ]}
      endpoint="/tools/audio-converter"
      gradientFrom="from-green-500"
      gradientTo="to-blue-600"
    />
  );
}