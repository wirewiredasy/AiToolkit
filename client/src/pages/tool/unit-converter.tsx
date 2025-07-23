import { ToolTemplate } from "@/components/ui/tool-template";
import { Calculator } from "lucide-react";

export default function UnitConverterPage() {
  return (
    <ToolTemplate
      toolId="unit-converter"
      toolName="Universal Unit Converter"
      description="Convert between different units of measurement. Support for length, weight, temperature, volume, area, speed, and more."
      icon={<Calculator className="h-8 w-8 text-white" />}
      resultType="validation"
      settings={[
        {
          key: "value",
          label: "Value to Convert",
          type: "number",
          placeholder: "100",
          required: true,
          description: "Numeric value to convert"
        },
        {
          key: "category",
          label: "Unit Category",
          type: "select",
          options: ["Length", "Weight/Mass", "Temperature", "Volume", "Area", "Speed", "Time", "Energy", "Pressure", "Data Storage"],
          defaultValue: "Length",
          description: "Type of unit to convert"
        },
        {
          key: "fromUnit",
          label: "From Unit",
          type: "select",
          options: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Inch", "Foot", "Yard", "Mile"],
          defaultValue: "Meter",
          description: "Source unit"
        },
        {
          key: "toUnit",
          label: "To Unit",
          type: "select",
          options: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Inch", "Foot", "Yard", "Mile"],
          defaultValue: "Foot",
          description: "Target unit"
        },
        {
          key: "precision",
          label: "Decimal Precision",
          type: "slider",
          min: 0,
          max: 10,
          step: 1,
          defaultValue: 6,
          description: "Number of decimal places in result"
        },
        {
          key: "showFormula",
          label: "Show Conversion Formula",
          type: "switch",
          defaultValue: true,
          description: "Display the conversion calculation"
        },
        {
          key: "showCommonConversions",
          label: "Show Common Conversions",
          type: "switch",
          defaultValue: true,
          description: "Display frequently used conversions"
        },
        {
          key: "scientificNotation",
          label: "Scientific Notation",
          type: "switch",
          defaultValue: false,
          description: "Use scientific notation for large/small numbers"
        }
      ]}
      endpoint="/api/tools/unit-converter"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}