import { ToolTemplate } from "@/components/ui/tool-template";
import { Clock } from "lucide-react";

export default function TimestampConverterPage() {
  return (
    <ToolTemplate
      toolId="timestamp-converter"
      toolName="Timestamp Converter"
      description="Convert between different timestamp formats and time zones. Support for Unix timestamps, ISO dates, and human-readable formats."
      icon={<Clock className="h-8 w-8 text-white" />}
      resultType="validation"
      settings={[
        {
          key: "inputValue",
          label: "Input Value",
          type: "text",
          placeholder: "1640995200 or 2022-01-01T00:00:00Z",
          required: true,
          description: "Timestamp or date to convert"
        },
        {
          key: "inputFormat",
          label: "Input Format",
          type: "select",
          options: ["Unix Timestamp (seconds)", "Unix Timestamp (milliseconds)", "ISO 8601", "RFC 2822", "Auto-Detect", "Custom Format"],
          defaultValue: "Auto-Detect",
          description: "Format of the input value"
        },
        {
          key: "customInputFormat",
          label: "Custom Input Format",
          type: "text",
          placeholder: "YYYY-MM-DD HH:mm:ss",
          description: "Custom date format pattern"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["Unix Timestamp", "ISO 8601", "RFC 2822", "Human Readable", "Relative Time", "All Formats"],
          defaultValue: "All Formats",
          description: "Desired output format"
        },
        {
          key: "timezone",
          label: "Timezone",
          type: "select",
          options: ["UTC", "Local Time", "EST", "PST", "GMT", "CET", "JST", "Custom"],
          defaultValue: "UTC",
          description: "Timezone for conversion"
        },
        {
          key: "customTimezone",
          label: "Custom Timezone",
          type: "text",
          placeholder: "America/New_York",
          description: "Custom timezone identifier"
        },
        {
          key: "showMilliseconds",
          label: "Show Milliseconds",
          type: "switch",
          defaultValue: true,
          description: "Include milliseconds in output"
        },
        {
          key: "showTimezoneInfo",
          label: "Show Timezone Info",
          type: "switch",
          defaultValue: true,
          description: "Display timezone offset and abbreviation"
        }
      ]}
      endpoint="/api/tools/timestamp-converter"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}