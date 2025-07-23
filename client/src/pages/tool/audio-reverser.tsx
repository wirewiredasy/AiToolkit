
import { ToolTemplate } from "@/components/ui/tool-template";
import { RotateCcw } from "lucide-react";

export default function AudioReverserPage() {
  return (
    <ToolTemplate
      toolId="audio-reverser"
      toolName="Audio Reverser"
      description="Reverse audio playback to create unique sound effects. Perfect for creating backwards audio, sound design, and artistic audio projects."
      icon={<RotateCcw className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "audio/*": [".mp3", ".wav", ".aac", ".ogg", ".m4a", ".flac"]
      }}
      maxFileSize={100 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "preserveMetadata",
          label: "Preserve Metadata",
          type: "switch",
          defaultValue: true,
          description: "Keep original audio metadata"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["MP3", "WAV", "AAC", "OGG"],
          defaultValue: "MP3",
          description: "Choose output audio format"
        },
        {
          key: "quality",
          label: "Audio Quality",
          type: "select",
          options: ["High (320 kbps)", "Medium (192 kbps)", "Low (128 kbps)"],
          defaultValue: "High (320 kbps)",
          description: "Select audio quality"
        },
        {
          key: "fadeEffect",
          label: "Add Fade Effect",
          type: "switch",
          defaultValue: false,
          description: "Add fade in/out to reversed audio"
        },
        {
          key: "normalizeAudio",
          label: "Normalize Audio",
          type: "switch",
          defaultValue: false,
          description: "Normalize audio levels after reversing"
        }
      ]}
      endpoint="/api/tools/audio-reverser"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}
