
import { ToolTemplate } from "@/components/ui/tool-template";
import { Music } from "lucide-react";

export default function PitchChangerPage() {
  return (
    <ToolTemplate
      toolId="pitch-changer"
      toolName="Audio Pitch Changer"
      description="Change the pitch of audio files without affecting playback speed. Perfect for voice modulation, music production, and audio editing."
      icon={<Music className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "audio/*": [".mp3", ".wav", ".aac", ".ogg", ".m4a", ".flac"]
      }}
      maxFileSize={100 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "pitchShift",
          label: "Pitch Shift (Semitones)",
          type: "range",
          min: -12,
          max: 12,
          step: 0.1,
          defaultValue: 0,
          description: "Adjust pitch in semitones (-12 to +12)"
        },
        {
          key: "pitchMode",
          label: "Pitch Mode",
          type: "select",
          options: ["Semitones", "Cents", "Frequency Ratio"],
          defaultValue: "Semitones",
          description: "Choose pitch adjustment method"
        },
        {
          key: "preserveFormants",
          label: "Preserve Formants",
          type: "switch",
          defaultValue: true,
          description: "Maintain natural voice characteristics"
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
          key: "algorithm",
          label: "Processing Algorithm",
          type: "select",
          options: ["Phase Vocoder", "PSOLA", "Harmonic", "Granular"],
          defaultValue: "Phase Vocoder",
          description: "Choose pitch shifting algorithm"
        }
      ]}
      endpoint="/api/tools/pitch-changer"
      gradientFrom="from-blue-500"
      gradientTo="to-purple-600"
    />
  );
}
