
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScreeningQuestions from "@/components/ScreeningQuestions";
import RiskAssessment from "@/components/RiskAssessment";

interface PatientAssessmentProps {
  onBack: () => void;
}

const PatientAssessment = ({ onBack }: PatientAssessmentProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const steps = [
    { id: 'welcome', title: 'Welcome', description: 'Get started with your sleep assessment' },
    { id: 'basic-info', title: 'Basic Information', description: 'Tell us about yourself' },
    { id: 'ess', title: 'Epworth Sleepiness Scale', description: 'Assess your daytime sleepiness' },
    { id: 'stop-bang', title: 'STOP-BANG Questionnaire', description: 'Sleep apnea risk factors' },
    { id: 'berlin', title: 'Berlin Questionnaire', description: 'Comprehensive sleep assessment' },
    { id: 'results', title: 'Results', description: 'Your personalized risk assessment' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Progress Saved",
        description: `Moving to: ${steps[currentStep + 1].title}`,
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = (data: any) => {
    setResponses({ ...responses, ...data });
    setIsComplete(true);
    handleNext();
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">Sleep Assessment</h1>
              <p className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div key={step.id} className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
                {index < currentStep ? (
                  <CheckCircle className="h-5 w-5 mb-1" />
                ) : index === currentStep ? (
                  <div className="w-5 h-5 rounded-full bg-blue-600 mb-1" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 mb-1" />
                )}
                <span className="text-xs text-center hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 0 && (
          <Card className="p-8 text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600 mb-4">Welcome to Your Sleep Assessment</CardTitle>
              <CardDescription className="text-lg">
                This AI-powered assessment will help identify your risk for sleep apnea using validated medical questionnaires.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Info className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold mb-2">Scientifically Validated</h3>
                  <p className="text-sm text-gray-600">Uses established medical screening tools</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold mb-2">HIPAA Compliant</h3>
                  <p className="text-sm text-gray-600">Your data is secure and protected</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold mb-2">Takes 5-10 Minutes</h3>
                  <p className="text-sm text-gray-600">Quick and comprehensive assessment</p>
                </div>
              </div>
              
              <div className="text-left max-w-2xl mx-auto space-y-4">
                <h4 className="font-semibold text-lg">What to Expect:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Basic information about your health and sleep habits</li>
                  <li>• Epworth Sleepiness Scale (ESS) for daytime sleepiness</li>
                  <li>• STOP-BANG questionnaire for sleep apnea risk factors</li>
                  <li>• Berlin Questionnaire for comprehensive sleep evaluation</li>
                  <li>• Personalized risk assessment and recommendations</li>
                </ul>
              </div>
              
              <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                Begin Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep >= 1 && currentStep <= 4 && (
          <ScreeningQuestions 
            step={steps[currentStep].id}
            onComplete={handleComplete}
            onNext={handleNext}
            onPrevious={handlePrevious}
            responses={responses}
          />
        )}

        {currentStep === 5 && (
          <RiskAssessment 
            responses={responses}
            onBack={handlePrevious}
            onSchedule={() => {
              toast({
                title: "Scheduling Feature",
                description: "Sleep study scheduling would be integrated with your healthcare provider's system.",
              });
            }}
          />
        )}
      </main>
    </div>
  );
};

export default PatientAssessment;
