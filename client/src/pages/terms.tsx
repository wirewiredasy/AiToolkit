
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Terms() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Suntyn AI, you accept and agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, please do not use our services.",
        "We may update these terms from time to time, and continued use constitutes acceptance of changes.",
        "You must be at least 18 years old or have parental consent to use our services."
      ]
    },
    {
      title: "Service Description",
      content: [
        "Suntyn AI provides AI-powered tools for document processing, image editing, and data validation.",
        "Our services are provided on an 'as-is' basis with no guarantees of availability or results.",
        "We reserve the right to modify, suspend, or discontinue any service at any time.",
        "Some features may require account registration or have usage limitations."
      ]
    },
    {
      title: "User Responsibilities",
      content: [
        "You are responsible for all content you upload and process through our tools.",
        "You must not upload illegal, harmful, or copyrighted content without permission.",
        "You agree not to misuse our services or attempt to circumvent security measures.",
        "You must not use our services for spam, phishing, or other malicious activities.",
        "Account security is your responsibility - keep your login credentials secure."
      ]
    },
    {
      title: "File Processing and Content",
      content: [
        "Files are automatically deleted after 1 hour for security and privacy.",
        "We do not claim ownership of your uploaded content.",
        "You retain all rights to your original content and any processed outputs.",
        "We may temporarily cache files for processing but do not store them permanently.",
        "You warrant that you have the right to upload and process all submitted content."
      ]
    },
    {
      title: "Limitations and Disclaimers",
      content: [
        "Our services are provided 'as-is' without warranties of any kind.",
        "We do not guarantee the accuracy or quality of processed outputs.",
        "Service availability may be interrupted for maintenance or technical issues.",
        "We are not liable for any data loss, though we take precautions to prevent it.",
        "Maximum liability is limited to the amount paid for services, if any."
      ]
    },
    {
      title: "Prohibited Uses",
      content: [
        "Processing illegal content or content that violates applicable laws.",
        "Attempting to reverse engineer or copy our AI algorithms.",
        "Using our services to compete with or harm our business interests.",
        "Uploading malware, viruses, or other harmful code.",
        "Violating intellectual property rights of others."
      ]
    },
    {
      title: "Termination",
      content: [
        "We may terminate or suspend your access at any time for violations of these terms.",
        "You may delete your account at any time through your account settings.",
        "Upon termination, your right to use the services ceases immediately.",
        "Provisions regarding liability, disclaimers, and governing law survive termination."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Terms of Service</h1>
          <p className="text-xl text-slate-600 mb-2">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-slate-500">
            Last updated: January 23, 2025
          </p>
        </div>

        {/* Key Points */}
        <Card className="mb-8 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
              <i className="fas fa-balance-scale text-green-600"></i>
              Key Terms Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <i className="fas fa-check-circle text-green-600"></i>
                <span className="text-slate-700">Free to use with fair usage</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-shield-alt text-green-600"></i>
                <span className="text-slate-700">Your content remains yours</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-clock text-green-600"></i>
                <span className="text-slate-700">Files auto-deleted in 1 hour</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-ban text-red-600"></i>
                <span className="text-slate-700">No illegal content allowed</span>
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
            <CardTitle className="text-xl text-slate-800">Questions About These Terms?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              If you have any questions about these Terms of Service or need clarification on any point, 
              please contact our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <i className="fas fa-envelope text-blue-600"></i>
                <span className="text-slate-700">legal@suntyn.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-phone text-green-600"></i>
                <span className="text-slate-700">+1 (555) 123-4567</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mt-6 shadow-lg bg-slate-50">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-bold text-slate-800 mb-2">Governing Law</h3>
              <p className="text-sm text-slate-600">
                These terms are governed by the laws of the United States and the State of California. 
                Any disputes will be resolved in the courts of San Francisco, California.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>
            By using Suntyn AI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
