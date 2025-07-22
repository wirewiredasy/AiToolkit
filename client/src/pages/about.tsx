
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {
  

  const stats = [
    { number: "1M+", label: "Files Processed", icon: "fas fa-file-alt" },
    { number: "50K+", label: "Happy Users", icon: "fas fa-users" },
    { number: "24", label: "AI Tools", icon: "fas fa-tools" },
    { number: "99.9%", label: "Uptime", icon: "fas fa-server" }
  ];

  const values = [
    {
      title: "Privacy First",
      description: "Your data is yours. We process files securely and delete them automatically.",
      icon: "fas fa-shield-alt",
      color: "text-blue-600"
    },
    {
      title: "AI-Powered",
      description: "Cutting-edge artificial intelligence for superior results and accuracy.",
      icon: "fas fa-brain",
      color: "text-purple-600"
    },
    {
      title: "Open Source",
      description: "Built with transparency and community collaboration at its core.",
      icon: "fas fa-code",
      color: "text-green-600"
    },
    {
      title: "Always Free",
      description: "Core tools remain free forever. No hidden costs or surprise charges.",
      icon: "fas fa-heart",
      color: "text-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">About Suntyn AI</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're on a mission to democratize AI tools and make powerful document processing, 
            image editing, and data validation accessible to everyone.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${stat.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</h3>
                <p className="text-slate-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center text-slate-800">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="max-w-4xl mx-auto space-y-6 text-slate-600 leading-relaxed">
                <p className="text-lg">
                  Suntyn AI was born from a simple observation: powerful AI tools were either too expensive, 
                  too complex, or locked behind corporate paywalls. We believed everyone deserved access to 
                  professional-grade document processing and image editing capabilities.
                </p>
                <p>
                  Our journey began in 2024 when our founding team, frustrated with existing solutions, 
                  decided to build something different. We wanted to create tools that were not just powerful, 
                  but also intuitive, secure, and genuinely helpful for everyday tasks.
                </p>
                <p>
                  Today, Suntyn AI processes over a million files monthly, helping students, professionals, 
                  and businesses streamline their workflows. But we're just getting started.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${value.icon} text-2xl ${value.color}`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        

        {/* Vision */}
        <div className="text-center">
          <Card className="shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Vision</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                To build the world's most accessible and powerful AI toolkit, 
                empowering billions of people to work smarter, not harder.
              </p>
              <div className="flex items-center justify-center gap-4">
                <i className="fas fa-rocket text-3xl text-blue-600"></i>
                <span className="text-lg font-medium text-slate-700">Join us on this journey</span>
                <i className="fas fa-star text-3xl text-purple-600"></i>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
