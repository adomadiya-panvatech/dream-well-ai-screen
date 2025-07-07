
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, Heart, Truck, Shield, DollarSign, Clock, FileCheck } from "lucide-react";
import PatientAssessment from "@/components/PatientAssessment";
import ProviderDashboard from "@/components/ProviderDashboard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'patient' | 'provider'>('home');
  const { toast } = useToast();

  const handleGetStarted = (userType: 'patient' | 'provider') => {
    setActiveView(userType);
    toast({
      title: `Welcome to the ${userType === 'patient' ? 'Patient' : 'Provider'} Portal`,
      description: `Starting your ${userType === 'patient' ? 'sleep assessment' : 'dashboard'} experience...`,
    });
  };

  if (activeView === 'patient') {
    return <PatientAssessment onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'provider') {
    return <ProviderDashboard onBack={() => setActiveView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SleepScreen AI</h1>
                <p className="text-sm text-gray-600">CMS-Compliant Sleep Apnea Screening Platform</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => handleGetStarted('patient')} className="bg-blue-600 hover:bg-blue-700">
                Patient Assessment
              </Button>
              <Button onClick={() => handleGetStarted('provider')} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Provider Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            AI-Powered Sleep Apnea Screening
            <span className="block text-blue-600 mt-2">Built for Healthcare Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Streamline sleep apnea screening with our CMS-compliant platform. Gamified patient assessments, 
            automated billing documentation, and seamless EHR integration for multiple healthcare settings.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-green-100 text-green-800">
              <Shield className="h-4 w-4 mr-2" />
              HIPAA Compliant
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-blue-100 text-blue-800">
              <FileCheck className="h-4 w-4 mr-2" />
              CMS Billable
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-purple-100 text-purple-800">
              <Truck className="h-4 w-4 mr-2" />
              DOT/FMCSA Ready
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200" 
                  onClick={() => handleGetStarted('patient')}>
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">For Patients</h3>
                <p className="text-gray-600 mb-4">Take our AI-powered sleep assessment with gamified experience</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Assessment</Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-200" 
                  onClick={() => handleGetStarted('provider')}>
              <div className="text-center">
                <Building className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold mb-2">For Providers</h3>
                <p className="text-gray-600 mb-4">Manage patients, track outcomes, and optimize billing</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">Provider Portal</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Healthcare Settings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Designed for Multiple Healthcare Settings
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building, title: "Primary Care", description: "Integrate screening into routine visits" },
              { icon: Heart, title: "Mental Health", description: "Address sleep-mental health connection" },
              { icon: Users, title: "Weight Loss Centers", description: "Link sleep health to weight management" },
              { icon: Truck, title: "Occupational Health", description: "DOT compliance for commercial drivers" }
            ].map((setting, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <setting.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h4 className="text-lg font-semibold mb-2">{setting.title}</h4>
                <p className="text-gray-600 text-sm">{setting.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
              <TabsTrigger value="features">Key Features</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Users, title: "AI-Powered Assessment", description: "Adaptive questionnaires with intelligent follow-ups" },
                  { icon: FileCheck, title: "Validated Screening Tools", description: "ESS, STOP-BANG, Berlin Questionnaire, ISI" },
                  { icon: Clock, title: "Instant Scheduling", description: "Direct booking for sleep studies and specialist referrals" },
                  { icon: DollarSign, title: "CMS Billing Support", description: "Auto-generated documentation for reimbursement" },
                  { icon: Shield, title: "HIPAA Compliance", description: "Full security and privacy protection" },
                  { icon: Truck, title: "DOT/FMCSA Ready", description: "Commercial driver medical certification support" }
                ].map((feature, index) => (
                  <Card key={index} className="p-6">
                    <feature.icon className="h-8 w-8 mb-3 text-blue-600" />
                    <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="benefits" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-green-700">Revenue Enhancement</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• CPT 99490-99491 (Chronic Care Management)</li>
                    <li>• CPT 99424-99427 (Principal Care Management)</li>
                    <li>• CPT 99484 (Behavioral Health Integration)</li>
                    <li>• CPT G0442, G0444 (Wellness Visit Add-ons)</li>
                  </ul>
                </Card>
                
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-blue-700">Operational Benefits</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Streamlined patient workflow</li>
                    <li>• Automated documentation</li>
                    <li>• Improved patient engagement</li>
                    <li>• Early detection and intervention</li>
                  </ul>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">SleepScreen AI</span>
              </div>
              <p className="text-gray-400">
                Transforming sleep health screening with AI-powered assessments and CMS-compliant workflows.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Compliance</h5>
              <ul className="space-y-2 text-gray-400">
                <li>HIPAA Compliant</li>
                <li>CMS Guidelines</li>
                <li>DOT/FMCSA Standards</li>
                <li>HL7 FHIR Compatible</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Integration Support</li>
                <li>Training & Onboarding</li>
                <li>Technical Documentation</li>
                <li>Billing Assistance</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SleepScreen AI. All rights reserved. This platform is designed to support healthcare providers in compliance with CMS guidelines.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
