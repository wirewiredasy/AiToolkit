
import { ToolTemplate } from "@/components/ui/tool-template";
import { Captions } from "lucide-react";

export default function SubtitleExtractorPage() {
  return (
    <ToolTemplate
      toolId="subtitle-extractor"
      toolName="Subtitle Extractor"
      description="Extract subtitles from video files in various formats. Support for SRT, VTT, ASS, and embedded subtitle tracks."
      icon={<Captions className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "video/*": [".mp4", ".avi", ".mkv", ".mov", ".wmv", ".flv", ".webm"]
      }}
      maxFileSize={1000 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "subtitleTrack",
          label: "Subtitle Track",
          type: "select",
          options: ["All Tracks", "Track 1", "Track 2", "Track 3", "First Available"],
          defaultValue: "First Available",
          description: "Choose which subtitle track to extract"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["SRT", "VTT", "ASS", "SSA", "TXT"],
          defaultValue: "SRT",
          description: "Subtitle file format"
        },
        {
          key: "language",
          label: "Language Filter",
          type: "select",
          options: ["All Languages", "English", "Hindi", "Spanish", "French", "German", "Chinese", "Japanese"],
          defaultValue: "All Languages",
          description: "Filter by subtitle language"
        },
        {
          key: "includeTimestamps",
          label: "Include Timestamps",
          type: "switch",
          defaultValue: true,
          description: "Include timing information"
        },
        {
          key: "cleanupText",
          label: "Cleanup Text",
          type: "switch",
          defaultValue: true,
          description: "Remove formatting tags and clean text"
        },
        {
          key: "mergeLines",
          label: "Merge Short Lines",
          type: "switch",
          defaultValue: false,
          description: "Combine very short subtitle lines"
        }
      ]}
      endpoint="/api/tools/subtitle-extractor"
      gradientFrom="from-blue-500"
      gradientTo="to-cyan-600"
    />
  );
}
