import { ToolTemplate } from "@/components/ui/tool-template";
import { Type } from "lucide-react";

export default function LoremIpsumGeneratorPage() {
  return (
    <ToolTemplate
      toolId="lorem-ipsum-generator"
      toolName="Lorem Ipsum Generator"
      description="Generate placeholder text for designs and mockups. Create customizable Lorem Ipsum text with various formats and languages."
      icon={<Type className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "textType",
          label: "Text Type",
          type: "select",
          options: ["Lorem Ipsum (Latin)", "Pangram", "Random Words", "Bacon Ipsum", "Hipster Ipsum", "Corporate Ipsum"],
          defaultValue: "Lorem Ipsum (Latin)",
          description: "Type of placeholder text"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["Paragraphs", "Words", "Sentences", "Lists"],
          defaultValue: "Paragraphs",
          description: "Format of generated text"
        },
        {
          key: "count",
          label: "Count",
          type: "slider",
          min: 1,
          max: 50,
          step: 1,
          defaultValue: 3,
          description: "Number of paragraphs/words/sentences"
        },
        {
          key: "startWithLorem",
          label: "Start with 'Lorem ipsum'",
          type: "switch",
          defaultValue: true,
          description: "Begin text with classic Lorem ipsum phrase"
        },
        {
          key: "includeHTML",
          label: "Include HTML Tags",
          type: "switch",
          defaultValue: false,
          description: "Wrap text in HTML paragraph tags"
        },
        {
          key: "wordLength",
          label: "Word Length",
          type: "select",
          options: ["Short (3-6 letters)", "Medium (4-8 letters)", "Long (6-12 letters)", "Mixed"],
          defaultValue: "Mixed",
          description: "Average length of generated words"
        },
        {
          key: "language",
          label: "Language Style",
          type: "select",
          options: ["Latin", "English-like", "Technical", "Creative"],
          defaultValue: "Latin",
          description: "Style of generated text"
        }
      ]}
      endpoint="/api/tools/lorem-ipsum-generator"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}