import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { getToolkitById } from '@/lib/tools';

export default function GovernmentToolkit() {
  const toolkit = getToolkitById('government');

  if (!toolkit) {
    return <div>Toolkit not found</div>;
  }

  const govTools = [
    { id: 'pan-validator', name: 'PAN Validator', description: 'Validate PAN card format', icon: 'fas fa-id-card', route: '/tool/pan-validator' },
    { id: 'aadhaar-masker', name: 'Aadhaar Masker', description: 'Mask Aadhaar for sharing', icon: 'fas fa-user-shield', route: '/tool/aadhaar-masker' },
    { id: 'voter-id-extractor', name: 'Voter ID Info', description: 'Extract voter ID information', icon: 'fas fa-vote-yea', route: '/tool/voter-id-extractor' },
    { id: 'income-certificate', name: 'Income Certificate', description: 'Generate income certificate', icon: 'fas fa-file-invoice-dollar', route: '/tool/income-certificate' },
    { id: 'caste-certificate', name: 'Caste Certificate', description: 'Generate caste certificate', icon: 'fas fa-certificate', route: '/tool/caste-certificate' },
    { id: 'birth-certificate', name: 'Birth Certificate', description: 'Generate birth certificate', icon: 'fas fa-baby', route: '/tool/birth-certificate' },
    { id: 'death-certificate', name: 'Death Certificate', description: 'Generate death certificate', icon: 'fas fa-cross', route: '/tool/death-certificate' },
    { id: 'ration-card-status', name: 'Ration Card Status', description: 'Check ration card status', icon: 'fas fa-shopping-cart', route: '/tool/ration-card-status' },
    { id: 'passport-photo', name: 'Passport Photo', description: 'Create passport size photo', icon: 'fas fa-passport', route: '/tool/passport-photo' },
    { id: 'rent-agreement', name: 'Rent Agreement', description: 'Generate rent agreement', icon: 'fas fa-home', route: '/tool/rent-agreement' },
    { id: 'affidavit-generator', name: 'Affidavit Generator', description: 'Create legal affidavit', icon: 'fas fa-gavel', route: '/tool/affidavit-generator' },
    { id: 'police-verification', name: 'Police Verification', description: 'Police verification form', icon: 'fas fa-shield-alt', route: '/tool/police-verification' },
    { id: 'gazette-formatter', name: 'Gazette Formatter', description: 'Format gazette documents', icon: 'fas fa-newspaper', route: '/tool/gazette-formatter' },
    { id: 'signature-extractor', name: 'Signature Extractor', description: 'Extract signatures from docs', icon: 'fas fa-signature', route: '/tool/signature-extractor' },
    { id: 'form16-analyzer', name: 'Form 16 Analyzer', description: 'Analyze Form 16 data', icon: 'fas fa-calculator', route: '/tool/form16-analyzer' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Government Toolkit' },
  ];

  return (
    <div className="py-8 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Toolkit Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-landmark text-3xl text-orange-600"></i>
          </div>
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">{toolkit.name}</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            {toolkit.description}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-neutral-500">
            <span>{toolkit.toolCount} Tools Available</span>
            <span>•</span>
            <span>India Specific</span>
            <span>•</span>
            <span>Government Compliant</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {govTools.map((tool) => (
            <Card key={tool.id} className="tool-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <Link href={tool.route}>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <i className={`${tool.icon} text-orange-600`}></i>
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">{tool.name}</h3>
                  <p className="text-sm text-neutral-600 mb-4">{tool.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-orange-600 font-medium">Free</span>
                    <i className="fas fa-arrow-right text-neutral-400"></i>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* India-specific Notice */}
        <div className="mt-16 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <i className="fas fa-info-circle text-orange-600 text-xl mt-1"></i>
            <div>
              <h3 className="font-semibold text-orange-800 mb-2">India-Specific Tools</h3>
              <p className="text-orange-700">
                These tools are specifically designed for Indian government documents and procedures. 
                They comply with Indian government standards and formats. Please note that these 
                tools are for informational purposes and should not be considered as official 
                government services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
