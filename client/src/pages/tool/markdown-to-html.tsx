import { ToolTemplate } from "@/components/ui/tool-template";
import { FileCode } from "lucide-react";

export default function MarkdownToHTMLPage() {
  return (
    <ToolTemplate
      toolId="markdown-to-html"
      toolName="Markdown to HTML Converter"
      description="Convert Markdown documents to HTML format. Support for GitHub-flavored markdown, tables, code highlighting, and custom styling."
      icon={<FileCode className="h-8 w-8 text-white" />}
      acceptedFiles={{ "text/markdown": [".md", ".markdown"], "text/plain": [".txt"] }}
      maxFileSize={10 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "markdownContent",
          label: "Markdown Content",
          type: "textarea",
          placeholder: "# Hello World\n\nThis is **bold** text and this is *italic* text.",
          required: true,
          description: "Markdown content to convert"
        },
        {
          key: "markdownFlavor",
          label: "Markdown Flavor",
          type: "select",
          options: ["GitHub Flavored", "CommonMark", "Standard", "Extended"],
          defaultValue: "GitHub Flavored",
          description: "Markdown specification to use"
        },
        {
          key: "includeCSS",
          label: "Include CSS Styling",
          type: "switch",
          defaultValue: true,
          description: "Add default CSS for better appearance"
        },
        {
          key: "cssTheme",
          label: "CSS Theme",
          type: "select",
          options: ["GitHub", "Default", "Minimal", "Dark", "Academic", "Custom"],
          defaultValue: "GitHub",
          description: "Pre-built CSS theme"
        },
        {
          key: "syntaxHighlighting",
          label: "Syntax Highlighting",
          type: "switch",
          defaultValue: true,
          description: "Enable code block syntax highlighting"
        },
        {
          key: "tableOfContents",
          label: "Generate Table of Contents",
          type: "switch",
          defaultValue: false,
          description: "Auto-generate TOC from headers"
        },
        {
          key: "enableTables",
          label: "Enable Tables",
          type: "switch",
          defaultValue: true,
          description: "Support for markdown tables"
        },
        {
          key: "enableTaskLists",
          label: "Enable Task Lists",
          type: "switch",
          defaultValue: true,
          description: "Support for checkbox task lists"
        }
      ]}
      endpoint="/api/tools/markdown-to-html"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}