import { ToolTemplate } from "@/components/ui/tool-template";
import { Scissors } from "lucide-react";

export default function AudioTrimmerPage() {
  return (
    <ToolTemplate
      toolId="audio-trimmer"
      toolName="Audio Trimmer"
      description="Trim and cut audio files with precision. Extract specific segments, remove silence, or create clips from longer audio recordings."
      icon={<Scissors className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "audio/*": [".mp3", ".wav", ".aac", ".flac", ".ogg", ".m4a", ".wma"] 
      }}
      maxFileSize={100 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "startTime",
          label: "Start Time (MM:SS)",
          type: "text",
          placeholder: "00:30",
          defaultValue: "00:00",
          description: "When to start the trimmed audio"
        },
        {
          key: "endTime",
          label: "End Time (MM:SS)",
          type: "text",
          placeholder: "05:00",
          description: "When to end the trimmed audio (leave empty for end)"
        },
        {
          key: "fadeIn",
          label: "Fade In Duration (seconds)",
          type: "number",
          min: 0,
          max: 10,
          step: 0.1,
          defaultValue: 0,
          description: "Add fade-in effect"
        },
        {
          key: "fadeOut",
          label: "Fade Out Duration (seconds)",
          type: "number",
          min: 0,
          max: 10,
          step: 0.1,
          defaultValue: 0,
          description: "Add fade-out effect"
        },
        {
          key: "removeSilence",
          label: "Remove Silence",
          type: "switch",
          defaultValue: false,
          description: "Automatically remove silent parts"
        },
        {
          key: "normalizeVolume",
          label: "Normalize Volume",
          type: "switch",
          defaultValue: false,
          description: "Adjust volume to standard level"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["Same as Input", "MP3", "WAV", "AAC", "FLAC"],
          defaultValue: "Same as Input",
          description: "Audio format for output"
        }
      ]}
      endpoint="/api/tools/audio-trimmer"
      gradientFrom="from-green-500"
      gradientTo="to-blue-600"
    />
  );
}