import { ToolTemplate } from "@/components/ui/tool-template";
import { Link } from "lucide-react";

export default function URLShortenerPage() {
  return (
    <ToolTemplate
      toolId="url-shortener"
      toolName="URL Shortener"
      description="Create short, shareable links from long URLs. Track clicks, set expiration dates, and customize short links for better branding."
      icon={<Link className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "originalUrl",
          label: "Original URL",
          type: "text",
          placeholder: "https://example.com/very-long-url",
          required: true,
          description: "The long URL to shorten"
        },
        {
          key: "customAlias",
          label: "Custom Alias (Optional)",
          type: "text",
          placeholder: "my-custom-link",
          description: "Custom short link name (leave empty for random)"
        },
        {
          key: "expirationDate",
          label: "Expiration Date",
          type: "select",
          options: ["Never", "1 Day", "1 Week", "1 Month", "3 Months", "6 Months", "1 Year"],
          defaultValue: "Never",
          description: "When the short link should expire"
        },
        {
          key: "password",
          label: "Password Protection",
          type: "text",
          placeholder: "Optional password",
          description: "Protect link with password (optional)"
        },
        {
          key: "trackClicks",
          label: "Track Clicks",
          type: "switch",
          defaultValue: true,
          description: "Enable click tracking and analytics"
        },
        {
          key: "description",
          label: "Description",
          type: "text",
          placeholder: "Optional description",
          description: "Description for link management"
        }
      ]}
      endpoint="/api/tools/url-shortener"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}