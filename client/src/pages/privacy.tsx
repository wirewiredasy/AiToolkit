
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Privacy() {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Account information: When you create an account, we collect your email address and name.",
        "Usage data: We track which tools you use and when to improve our services.",
        "File metadata: We temporarily store file names and sizes for processing, but not file contents.",
        "Technical data: IP addresses, browser type, and device information for security and performance."
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "Provide and improve our AI tools and services",
        "Send important updates about your account and our services",
        "Analyze usage patterns to enhance user experience",
        "Ensure security and prevent abuse of our platform",
        "Respond to your support requests and inquiries"
      ]
    },
    {
      title: "File Processing and Storage",
      content: [
        "Files are processed in secure, encrypted environments",
        "All uploaded files are automatically deleted after 1 hour",
        "We never access, read, or store the content of your files",
        "Processing happens on secure servers with enterprise-grade encryption",
        "File transfers use HTTPS encryption for maximum security"
      ]
    },
    {
      title: "Data Sharing and Third Parties",
      content: [
        "We never sell, rent, or share your personal information with third parties",
        "Anonymous usage statistics may be shared with trusted analytics providers",
        "We may disclose information if required by law or to protect our rights",
        "Our AI processing partners have strict data protection agreements",
        "No file content is ever shared with external parties"
      ]
    },
    {
      title: "Your Rights and Choices",
      content: [
        "Access: Request a copy of your personal data",
        "Correction: Update or correct your account information",
        "Deletion: Request deletion of your account and associated data",
        "Opt-out: Unsubscribe from marketing communications at any time",
        "Data portability: Export your data in a standard format"
      ]
    },
    {
      title: "Security Measures",
      content: [
        "End-to-end encryption for all file transfers and processing",
        "Regular security audits and penetration testing",
        "Access controls and authentication for all systems",
        "Automated malware scanning for uploaded files",
        "Compliance with industry-standard security practices"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Privacy Policy</h1>
          <p className="text-xl text-slate-600 mb-2">
            Your privacy is our priority. Here's how we protect your data.
          </p>
          <p className="text-sm text-slate-500">
            Last updated: January 23, 2025
          </p>
        </div>

        {/* Key Points */}
        <Card className="mb-8 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
              <i className="fas fa-shield-alt text-blue-600"></i>
              Privacy at a Glance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <i className="fas fa-clock text-green-600"></i>
                <span className="text-slate-700">Files deleted after 1 hour</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-lock text-green-600"></i>
                <span className="text-slate-700">End-to-end encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-eye-slash text-green-600"></i>
                <span className="text-slate-700">We never read your files</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-ban text-green-600"></i>
                <span className="text-slate-700">No data selling, ever</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-slate-600">
                      <i className="fas fa-chevron-right text-blue-500 mt-1 flex-shrink-0"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Questions About Privacy?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              If you have any questions about this Privacy Policy or how we handle your data, 
              please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <i className="fas fa-envelope text-blue-600"></i>
                <span className="text-slate-700">privacy@suntyn.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-phone text-green-600"></i>
                <span className="text-slate-700">+1 (555) 123-4567</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>
            This policy may be updated from time to time. We'll notify you of any significant changes 
            via email or through our platform.
          </p>
        </div>
      </div>
    </div>
  );
}
