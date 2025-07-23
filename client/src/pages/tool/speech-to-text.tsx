import { ToolTemplate } from "@/components/ui/tool-template";
import { Mic } from "lucide-react";

export default function SpeechToTextPage() {
  return (
    <ToolTemplate
      toolId="speech-to-text"
      toolName="AI Speech to Text"
      description="Convert audio recordings to accurate text transcriptions using advanced AI. Support for multiple languages and audio formats."
      icon={<Mic className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "audio/*": [".mp3", ".wav", ".m4a", ".flac", ".aac", ".ogg", ".webm"] 
      }}
      maxFileSize={100 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "language",
          label: "Audio Language",
          type: "select",
          options: ["Auto-Detect", "English", "Spanish", "French", "German", "Italian", "Portuguese", "Hindi", "Japanese", "Chinese"],
          defaultValue: "Auto-Detect",
          description: "Language of the audio content"
        },
        {
          key: "transcriptionMode",
          label: "Transcription Mode",
          type: "select",
          options: ["Standard", "Enhanced (Slower)", "Real-time", "Speaker Diarization"],
          defaultValue: "Enhanced (Slower)",
          description: "Quality and feature level"
        },
        {
          key: "punctuation",
          label: "Add Punctuation",
          type: "switch",
          defaultValue: true,
          description: "Automatically add punctuation marks"
        },
        {
          key: "timestamps",
          label: "Include Timestamps",
          type: "switch",
          defaultValue: false,
          description: "Add time markers to transcription"
        },
        {
          key: "speakerLabels",
          label: "Speaker Labels",
          type: "switch",
          defaultValue: false,
          description: "Identify different speakers"
        },
        {
          key: "filterProfanity",
          label: "Filter Profanity",
          type: "switch",
          defaultValue: false,
          description: "Replace inappropriate language"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["Plain Text", "SRT Subtitles", "VTT Subtitles", "JSON"],
          defaultValue: "Plain Text",
          description: "Format of the transcription"
        }
      ]}
      endpoint="/api/tools/speech-to-text"
      gradientFrom="from-green-500"
      gradientTo="to-blue-600"
    />
  );
}