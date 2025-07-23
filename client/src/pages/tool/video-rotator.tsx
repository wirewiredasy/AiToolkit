
import { ToolTemplate } from "@/components/ui/tool-template";
import { RotateCw } from "lucide-react";

export default function VideoRotatorPage() {
  return (
    <ToolTemplate
      toolId="video-rotator"
      toolName="Video Rotator"
      description="Rotate videos by any angle to fix orientation issues. Perfect for correcting mobile recordings and creating artistic video effects."
      icon={<RotateCw className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv"]
      }}
      maxFileSize={500 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "rotationAngle",
          label: "Rotation Angle",
          type: "select",
          options: ["90° Clockwise", "180°", "270° Clockwise", "Custom Angle"],
          defaultValue: "90° Clockwise",
          description: "Choose rotation angle"
        },
        {
          key: "customAngle",
          label: "Custom Angle (degrees)",
          type: "range",
          min: -360,
          max: 360,
          step: 1,
          defaultValue: 0,
          description: "Set custom rotation angle"
        },
        {
          key: "backgroundColor",
          label: "Background Color",
          type: "color",
          defaultValue: "#000000",
          description: "Fill color for empty areas"
        },
        {
          key: "cropToFit",
          label: "Crop to Fit",
          type: "switch",
          defaultValue: false,
          description: "Crop video to remove black bars"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["MP4", "AVI", "MOV", "WEBM"],
          defaultValue: "MP4",
          description: "Choose output video format"
        },
        {
          key: "quality",
          label: "Video Quality",
          type: "select",
          options: ["High (1080p)", "Medium (720p)", "Low (480p)", "Original"],
          defaultValue: "Original",
          description: "Select output quality"
        },
        {
          key: "preserveAudio",
          label: "Preserve Audio",
          type: "switch",
          defaultValue: true,
          description: "Keep original audio track"
        }
      ]}
      endpoint="/api/tools/video-rotator"
      gradientFrom="from-green-500"
      gradientTo="to-blue-600"
    />
  );
}
