import { ToolTemplate } from "@/components/ui/tool-template";
import { BarChart3 } from "lucide-react";

export default function ExcelToPDFPage() {
  return (
    <ToolTemplate
      toolId="excel-to-pdf"
      toolName="Excel to PDF Converter"
      description="Convert Excel spreadsheets to PDF format. Maintain charts, formatting, and layout while creating professional PDF reports."
      icon={<BarChart3 className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "application/*": [".xlsx", ".xls", ".csv"],
        "text/*": [".csv"]
      }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "worksheets",
          label: "Worksheets to Convert",
          type: "select",
          options: ["All Worksheets", "Active Sheet Only", "Specific Sheets"],
          defaultValue: "All Worksheets",
          description: "Which worksheets to include"
        },
        {
          key: "pageOrientation",
          label: "Page Orientation",
          type: "select",
          options: ["Auto", "Portrait", "Landscape"],
          defaultValue: "Auto",
          description: "PDF page orientation"
        },
        {
          key: "scaling",
          label: "Scaling",
          type: "select",
          options: ["Fit to Page", "Actual Size", "Fit to Width", "Custom"],
          defaultValue: "Fit to Page",
          description: "How to fit content on pages"
        },
        {
          key: "includeGridlines",
          label: "Include Gridlines",
          type: "switch",
          defaultValue: false,
          description: "Show cell gridlines in PDF"
        },
        {
          key: "includeHeaders",
          label: "Include Headers",
          type: "switch",
          defaultValue: true,
          description: "Print row and column headers"
        },
        {
          key: "repeatTitles",
          label: "Repeat Title Rows",
          type: "switch",
          defaultValue: true,
          description: "Repeat headers on each page"
        }
      ]}
      endpoint="/api/tools/excel-to-pdf"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}