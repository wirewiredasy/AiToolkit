import { ToolTemplate } from "@/components/ui/tool-template";
import { Scissors } from "lucide-react";

export default function VideoTrimmerPage() {
  return (
    <ToolTemplate
      toolId="video-trimmer"
      toolName="Video Trimmer"
      description="Trim and cut video files with precision. Extract specific segments, remove unwanted parts, or create shorter clips from longer videos."
      icon={<Scissors className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "video/*": [".mp4", ".avi", ".mov", ".mkv", ".wmv", ".webm"] 
      }}
      maxFileSize={500 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "startTime",
          label: "Start Time (HH:MM:SS)",
          type: "text",
          placeholder: "00:00:30",
          defaultValue: "00:00:00",
          description: "When to start the trimmed video"
        },
        {
          key: "endTime",
          label: "End Time (HH:MM:SS)",
          type: "text",
          placeholder: "00:05:00",
          description: "When to end the trimmed video (leave empty for end)"
        },
        {
          key: "trimMethod",
          label: "Trim Method",
          type: "select",
          options: ["Fast (Stream Copy)", "Precise (Re-encode)", "Smart (Keyframe)"],
          defaultValue: "Smart (Keyframe)",
          description: "Balance between speed and precision"
        },
        {
          key: "outputQuality",
          label: "Output Quality",
          type: "select",
          options: ["Original", "High", "Medium", "Low"],
          defaultValue: "Original",
          description: "Video quality for the output"
        },
        {
          key: "fadeIn",
          label: "Fade In Duration (seconds)",
          type: "number",
          min: 0,
          max: 10,
          step: 0.5,
          defaultValue: 0,
          description: "Add fade-in effect"
        },
        {
          key: "fadeOut",
          label: "Fade Out Duration (seconds)",
          type: "number",
          min: 0,
          max: 10,
          step: 0.5,
          defaultValue: 0,
          description: "Add fade-out effect"
        }
      ]}
      endpoint="/api/tools/video-trimmer"
      gradientFrom="from-green-500"
      gradientTo="to-blue-600"
    />
  );
}