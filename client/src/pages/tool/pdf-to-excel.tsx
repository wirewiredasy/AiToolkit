import { ToolTemplate } from "@/components/ui/tool-template";
import { Table } from "lucide-react";

export default function PDFToExcelPage() {
  return (
    <ToolTemplate
      toolId="pdf-to-excel"
      toolName="PDF to Excel Converter"
      description="Convert PDF tables and data to Excel spreadsheets. Extract tabular data with intelligent table detection and formatting preservation."
      icon={<Table className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "extractionMode",
          label: "Extraction Mode",
          type: "select",
          options: ["Auto-Detect Tables", "Entire Document", "Specific Pages", "Selected Area"],
          defaultValue: "Auto-Detect Tables",
          description: "How to extract data from PDF"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["XLSX (Excel 2007+)", "XLS (Excel 97-2003)", "CSV (Comma Separated)"],
          defaultValue: "XLSX (Excel 2007+)",
          description: "Excel file format"
        },
        {
          key: "pageRange",
          label: "Page Range",
          type: "text",
          placeholder: "1-5, 10, 15-20",
          description: "Extract from specific pages (leave empty for all)"
        },
        {
          key: "preserveFormatting",
          label: "Preserve Formatting",
          type: "switch",
          defaultValue: true,
          description: "Maintain cell formatting and styles"
        },
        {
          key: "splitMultipleTables",
          label: "Split Multiple Tables",
          type: "switch",
          defaultValue: true,
          description: "Create separate worksheets for each table"
        },
        {
          key: "includeHeaders",
          label: "Detect Headers",
          type: "switch",
          defaultValue: true,
          description: "Automatically identify table headers"
        }
      ]}
      endpoint="/api/tools/pdf-to-excel"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}