import { ToolTemplate } from "@/components/ui/tool-template";
import { Tag } from "lucide-react";

export default function MetaTagGeneratorPage() {
  return (
    <ToolTemplate
      toolId="meta-tag-generator"
      toolName="Meta Tag Generator"
      description="Generate SEO-optimized meta tags for websites. Create Open Graph, Twitter Card, and essential HTML meta tags for better search visibility."
      icon={<Tag className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "title",
          label: "Page Title",
          type: "text",
          placeholder: "Amazing Website - Best Service Ever",
          required: true,
          description: "Main title for the page (50-60 characters)"
        },
        {
          key: "description",
          label: "Meta Description",
          type: "textarea",
          placeholder: "Discover amazing features and services...",
          required: true,
          description: "Page description (150-160 characters)"
        },
        {
          key: "keywords",
          label: "Keywords",
          type: "text",
          placeholder: "website, service, amazing, best",
          description: "Comma-separated keywords"
        },
        {
          key: "url",
          label: "Page URL",
          type: "text",
          placeholder: "https://example.com/page",
          description: "Full URL of the page"
        },
        {
          key: "siteName",
          label: "Site Name",
          type: "text",
          placeholder: "Your Website Name",
          description: "Name of your website"
        },
        {
          key: "ogImage",
          label: "Social Media Image URL",
          type: "text",
          placeholder: "https://example.com/image.jpg",
          description: "Image for social media sharing (1200x630px recommended)"
        },
        {
          key: "author",
          label: "Author",
          type: "text",
          placeholder: "John Doe",
          description: "Content author name"
        },
        {
          key: "includeOG",
          label: "Include Open Graph Tags",
          type: "switch",
          defaultValue: true,
          description: "Generate Facebook/LinkedIn meta tags"
        },
        {
          key: "includeTwitter",
          label: "Include Twitter Cards",
          type: "switch",
          defaultValue: true,
          description: "Generate Twitter sharing tags"
        },
        {
          key: "includeRobots",
          label: "Include Robots Meta",
          type: "switch",
          defaultValue: true,
          description: "Add robots indexing instructions"
        }
      ]}
      endpoint="/api/tools/meta-tag-generator"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}