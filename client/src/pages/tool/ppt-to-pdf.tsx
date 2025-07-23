import { ToolTemplate } from "@/components/ui/tool-template";
import { Presentation } from "lucide-react";

export default function PPTToPDFPage() {
  return (
    <ToolTemplate
      toolId="ppt-to-pdf"
      toolName="PowerPoint to PDF Converter"
      description="Convert PowerPoint presentations to PDF format. Preserve animations, transitions, and formatting for professional PDF documents."
      icon={<Presentation className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "application/*": [".pptx", ".ppt", ".ppsx", ".pps"]
      }}
      maxFileSize={100 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "slideRange",
          label: "Slide Range",
          type: "select",
          options: ["All Slides", "Current Slide", "Slide Range", "Hidden Slides Only"],
          defaultValue: "All Slides",
          description: "Which slides to convert"
        },
        {
          key: "slidesPerPage",
          label: "Slides per Page",
          type: "select",
          options: ["1 Slide", "2 Slides", "4 Slides", "6 Slides", "9 Slides"],
          defaultValue: "1 Slide",
          description: "Number of slides per PDF page"
        },
        {
          key: "includeNotes",
          label: "Include Speaker Notes",
          type: "switch",
          defaultValue: false,
          description: "Add speaker notes to PDF"
        },
        {
          key: "includeHiddenSlides",
          label: "Include Hidden Slides",
          type: "switch",
          defaultValue: false,
          description: "Convert hidden slides as well"
        },
        {
          key: "quality",
          label: "Image Quality",
          type: "select",
          options: ["High", "Medium", "Low"],
          defaultValue: "High",
          description: "Quality of images and graphics"
        },
        {
          key: "handoutLayout",
          label: "Handout Layout",
          type: "switch",
          defaultValue: false,
          description: "Use handout layout instead of slide layout"
        }
      ]}
      endpoint="/api/tools/ppt-to-pdf"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}