import { ToolTemplate } from "@/components/ui/tool-template";
import { Volume2 } from "lucide-react";

export default function TextToSpeechPage() {
  return (
    <ToolTemplate
      toolId="text-to-speech"
      toolName="AI Text to Speech"
      description="Convert text to natural-sounding speech using advanced AI voices. Choose from multiple languages, accents, and voice styles."
      icon={<Volume2 className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "text",
          label: "Text Content",
          type: "textarea",
          placeholder: "Enter the text you want to convert to speech...",
          required: true,
          description: "The text to convert to speech"
        },
        {
          key: "voice",
          label: "Voice Type",
          type: "select",
          options: ["Female (Sarah)", "Male (David)", "Female (Emma)", "Male (Brian)", "Child (Amy)", "Elderly (George)"],
          defaultValue: "Female (Sarah)",
          description: "Voice character and style"
        },
        {
          key: "language",
          label: "Language",
          type: "select",
          options: ["English (US)", "English (UK)", "Spanish", "French", "German", "Italian", "Portuguese", "Hindi", "Japanese"],
          defaultValue: "English (US)",
          description: "Language and accent"
        },
        {
          key: "speed",
          label: "Speech Speed",
          type: "slider",
          min: 0.5,
          max: 2.0,
          step: 0.1,
          defaultValue: 1.0,
          description: "Speed of speech (0.5x to 2.0x)"
        },
        {
          key: "pitch",
          label: "Voice Pitch",
          type: "slider",
          min: -20,
          max: 20,
          step: 1,
          defaultValue: 0,
          description: "Voice pitch adjustment (-20 to +20)"
        },
        {
          key: "outputFormat",
          label: "Audio Format",
          type: "select",
          options: ["MP3", "WAV", "AAC", "OGG"],
          defaultValue: "MP3",
          description: "Output audio format"
        }
      ]}
      endpoint="/api/tools/text-to-speech"
      gradientFrom="from-green-500"
      gradientTo="to-blue-600"
    />
  );
}