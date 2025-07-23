
import { ToolTemplate } from "@/components/ui/tool-template";
import { Image } from "lucide-react";

export default function ThumbnailGeneratorPage() {
  return (
    <ToolTemplate
      toolId="thumbnail-generator"
      toolName="Video Thumbnail Generator"
      description="Generate high-quality thumbnails from video files. Extract frames at specific times or create animated GIF previews."
      icon={<Image className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv"]
      }}
      maxFileSize={500 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "extractionMode",
          label: "Extraction Mode",
          type: "select",
          options: ["Single Frame", "Multiple Frames", "Animated GIF", "Mosaic Grid"],
          defaultValue: "Single Frame",
          description: "Type of thumbnail to generate"
        },
        {
          key: "timePosition",
          label: "Time Position",
          type: "select",
          options: ["Beginning (0s)", "Middle", "Custom Time", "Multiple Times"],
          defaultValue: "Middle",
          description: "When to extract thumbnail"
        },
        {
          key: "customTime",
          label: "Custom Time (seconds)",
          type: "number",
          min: 0,
          defaultValue: 10,
          description: "Specific time to extract frame"
        },
        {
          key: "thumbnailSize",
          label: "Thumbnail Size",
          type: "select",
          options: ["Small (320x180)", "Medium (640x360)", "Large (1280x720)", "Original Size"],
          defaultValue: "Medium (640x360)",
          description: "Output thumbnail dimensions"
        },
        {
          key: "quality",
          label: "Image Quality",
          type: "select",
          options: ["High", "Medium", "Low"],
          defaultValue: "High",
          description: "Thumbnail image quality"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["JPG", "PNG", "WEBP", "GIF"],
          defaultValue: "JPG",
          description: "Image format for thumbnails"
        },
        {
          key: "frameCount",
          label: "Frame Count (for multiple)",
          type: "number",
          min: 1,
          max: 20,
          defaultValue: 5,
          description: "Number of frames to extract"
        },
        {
          key: "addTimestamp",
          label: "Add Timestamp",
          type: "switch",
          defaultValue: false,
          description: "Add time overlay on thumbnails"
        }
      ]}
      endpoint="/api/tools/thumbnail-generator"
      gradientFrom="from-green-500"
      gradientTo="to-emerald-600"
    />
  );
}
