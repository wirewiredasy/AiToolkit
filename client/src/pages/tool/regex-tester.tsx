import { ToolTemplate } from "@/components/ui/tool-template";
import { Search } from "lucide-react";

export default function RegexTesterPage() {
  return (
    <ToolTemplate
      toolId="regex-tester"
      toolName="Regular Expression Tester"
      description="Test and debug regular expressions with real-time matching. Support for different regex flavors and detailed match information."
      icon={<Search className="h-8 w-8 text-white" />}
      resultType="validation"
      settings={[
        {
          key: "pattern",
          label: "Regular Expression Pattern",
          type: "text",
          placeholder: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          required: true,
          description: "Regex pattern to test"
        },
        {
          key: "testString",
          label: "Test String",
          type: "textarea",
          placeholder: "Enter text to test against the regex pattern...",
          required: true,
          description: "Text to match against the pattern"
        },
        {
          key: "flags",
          label: "Regex Flags",
          type: "text",
          placeholder: "gim",
          defaultValue: "g",
          description: "Regex flags (g=global, i=ignorecase, m=multiline, s=dotall)"
        },
        {
          key: "regexFlavor",
          label: "Regex Flavor",
          type: "select",
          options: ["JavaScript", "Python", "Java", "PHP", "Perl", ".NET", "PCRE"],
          defaultValue: "JavaScript",
          description: "Regular expression engine/flavor"
        },
        {
          key: "operation",
          label: "Operation",
          type: "select",
          options: ["Test Match", "Find All Matches", "Replace", "Split", "Extract Groups"],
          defaultValue: "Find All Matches",
          description: "What to do with the regex"
        },
        {
          key: "replacement",
          label: "Replacement Text",
          type: "text",
          placeholder: "Replacement string (for replace operation)",
          description: "Text to replace matches with"
        },
        {
          key: "showGroups",
          label: "Show Capture Groups",
          type: "switch",
          defaultValue: true,
          description: "Display captured groups and backreferences"
        },
        {
          key: "highlightMatches",
          label: "Highlight Matches",
          type: "switch",
          defaultValue: true,
          description: "Visually highlight matching text"
        }
      ]}
      endpoint="/api/tools/regex-tester"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}