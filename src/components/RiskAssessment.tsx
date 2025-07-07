
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, FileText, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface RiskAssessmentProps {
  responses: Record<string, any>;
  onBack: () => void;
  onSchedule: () => void;
}

const RiskAssessment = ({ responses, onBack, onSchedule }: RiskAssessmentProps) => {
  // Calculate risk scores
  const calculateESSScore = () => {
    const essData = responses.ess || {};
    let total = 0;
    for (let i = 0; i < 8; i++) {
      total += parseInt(essData[`ess_${i}`] || '0');
    }
    return total;
  };

  const calculateStopBangScore = () => {
    const stopBangData = responses['stop-bang'] || {};
    let score = 0;
    Object.values(stopBangData).forEach(value => {
      if (value === 'yes') score++;
    });
    return score;
  };

  const essScore = calculateESSScore();
  const stopBangScore = calculateStopBangScore();
  
  // Determine overall risk level
  const getRiskLevel = () => {
    if (stopBangScore >= 5 || essScore >= 16) return 'HIGH';
    if (stopBangScore >= 3 || essScore >= 11) return 'MODERATE';
    return 'LOW';
  };

  const riskLevel = getRiskLevel();
  const basicInfo = responses['basic-info'] || {};

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
      case 'MODERATE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'HIGH': return AlertTriangle;
      case 'MODERATE': return Info;
      default: return CheckCircle;
    }
  };

  const RiskIcon = getRiskIcon(riskLevel);

  return (
    <div className="space-y-6">
      {/* Risk Summary Card */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${getRiskColor(riskLevel)}`}>
              <RiskIcon className="h-12 w-12" />
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">Sleep Apnea Risk Assessment</CardTitle>
          <Badge className={`text-lg px-4 py-2 ${getRiskColor(riskLevel)}`}>
            {riskLevel} RISK
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Epworth Sleepiness Scale</h3>
              <div className="text-3xl font-bold text-blue-600">{essScore}/24</div>
              <Progress value={(essScore / 24) * 100} className="mt-2" />
              <p className="text-sm text-gray-600 mt-1">
                {essScore >= 16 ? 'Severe sleepiness' : 
                 essScore >= 11 ? 'Moderate sleepiness' : 
                 essScore >= 6 ? 'Mild sleepiness' : 'Normal'}
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">STOP-BANG Score</h3>
              <div className="text-3xl font-bold text-orange-600">{stopBangScore}/8</div>
              <Progress value={(stopBangScore / 8) * 100} className="mt-2" />
              <p className="text-sm text-gray-600 mt-1">
                {stopBangScore >= 5 ? 'High risk' : 
                 stopBangScore >= 3 ? 'Moderate risk' : 'Low risk'}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <Alert className={`border-2 ${getRiskColor(riskLevel)}`}>
            <RiskIcon className="h-4 w-4" />
            <AlertDescription className="font-medium">
              {riskLevel === 'HIGH' && (
                "Based on your responses, you have a high risk for sleep apnea. We strongly recommend consulting with a healthcare provider for further evaluation and potential sleep study."
              )}
              {riskLevel === 'MODERATE' && (
                "Your responses indicate a moderate risk for sleep apnea. Consider discussing these results with your healthcare provider for further evaluation."
              )}
              {riskLevel === 'LOW' && (
                "Your responses suggest a low risk for sleep apnea. Continue maintaining healthy sleep habits and consult your healthcare provider if symptoms worsen."
              )}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Assessment Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Age:</span>
              <span className="font-medium">{basicInfo.age || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Gender:</span>
              <span className="font-medium capitalize">{basicInfo.gender || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>BMI:</span>
              <span className="font-medium">
                {basicInfo.height && basicInfo.weight ? 
                  Math.round((basicInfo.weight / (basicInfo.height * basicInfo.height)) * 703) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Risk Factors:</span>
              <span className="font-medium">{stopBangScore} identified</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskLevel !== 'LOW' && (
              <div className="space-y-3">
                <Button 
                  onClick={onSchedule} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Sleep Study
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.print()}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Print Results
                </Button>
              </div>
            )}
            
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>CMS Billing Codes:</strong></p>
              <ul className="space-y-1">
                <li>• G0444 - Annual wellness visit</li>
                <li>• 99401 - Preventive counseling</li>
                <li>• 94660 - Continuous positive airway pressure</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Educational Content */}
      <Card>
        <CardHeader>
          <CardTitle>About Sleep Apnea</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Sleep apnea is a serious sleep disorder where breathing repeatedly stops and starts during sleep. 
            It can lead to serious health problems if left untreated, including high blood pressure, heart disease, 
            stroke, and diabetes.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Common Symptoms:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Loud snoring</li>
                <li>• Gasping for air during sleep</li>
                <li>• Morning headaches</li>
                <li>• Excessive daytime sleepiness</li>
                <li>• Difficulty concentrating</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Treatment Options:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• CPAP therapy</li>
                <li>• Oral appliances</li>
                <li>• Lifestyle changes</li>
                <li>• Surgical options</li>
                <li>• Weight management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Assessment</span>
        </Button>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-green-600 hover:bg-green-700"
        >
          Start New Assessment
        </Button>
      </div>
    </div>
  );
};

export default RiskAssessment;
