
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, User, Clock, AlertTriangle } from "lucide-react";

interface ScreeningQuestionsProps {
  step: string;
  onComplete: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  responses: Record<string, any>;
}

const ScreeningQuestions = ({ step, onComplete, onNext, onPrevious, responses }: ScreeningQuestionsProps) => {
  const [currentData, setCurrentData] = useState<Record<string, any>>({});

  useEffect(() => {
    setCurrentData(responses[step] || {});
  }, [step, responses]);

  const handleInputChange = (key: string, value: any) => {
    setCurrentData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onComplete({ [step]: currentData });
  };

  const isComplete = () => {
    switch (step) {
      case 'basic-info':
        return currentData.age && currentData.gender && currentData.height && currentData.weight;
      case 'ess':
        return Object.keys(currentData).length >= 8;
      case 'stop-bang':
        return Object.keys(currentData).length >= 8;
      case 'berlin':
        return Object.keys(currentData).length >= 10;
      default:
        return false;
    }
  };

  if (step === 'basic-info') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <User className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-xl">Basic Information</CardTitle>
          </div>
          <p className="text-gray-600">Please provide some basic information to personalize your assessment.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={currentData.age || ''}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
            <div>
              <Label>Gender</Label>
              <RadioGroup
                value={currentData.gender || ''}
                onValueChange={(value) => handleInputChange('gender', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="height">Height (inches)</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g., 70"
                value={currentData.height || ''}
                onChange={(e) => handleInputChange('height', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 180"
                value={currentData.weight || ''}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Do you have any of the following conditions? (Check all that apply)</Label>
            <div className="grid md:grid-cols-2 gap-2 mt-2">
              {['High Blood Pressure', 'Diabetes', 'Heart Disease', 'Stroke History'].map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={currentData.conditions?.includes(condition) || false}
                    onCheckedChange={(checked) => {
                      const conditions = currentData.conditions || [];
                      if (checked) {
                        handleInputChange('conditions', [...conditions, condition]);
                      } else {
                        handleInputChange('conditions', conditions.filter((c: string) => c !== condition));
                      }
                    }}
                  />
                  <Label htmlFor={condition} className="text-sm">{condition}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={onPrevious} variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!isComplete()}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'ess') {
    const essQuestions = [
      'Sitting and reading',
      'Watching TV',
      'Sitting inactive in a public place',
      'As a passenger in a car for an hour',
      'Lying down to rest in the afternoon',
      'Sitting and talking to someone',
      'Sitting quietly after lunch without alcohol',
      'In a car, while stopped for a few minutes in traffic'
    ];

    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-xl">Epworth Sleepiness Scale</CardTitle>
          </div>
          <p className="text-gray-600">
            How likely are you to doze off or fall asleep in the following situations? 
            (0 = Never, 1 = Slight chance, 2 = Moderate chance, 3 = High chance)
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {essQuestions.map((question, index) => (
            <div key={index} className="space-y-2">
              <Label className="text-base font-medium">{question}</Label>
              <RadioGroup
                value={currentData[`ess_${index}`] || ''}
                onValueChange={(value) => handleInputChange(`ess_${index}`, value)}
                className="flex space-x-6"
              >
                {[0, 1, 2, 3].map((score) => (
                  <div key={score} className="flex items-center space-x-2">
                    <RadioGroupItem value={score.toString()} id={`ess_${index}_${score}`} />
                    <Label htmlFor={`ess_${index}_${score}`} className="text-sm">{score}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}

          <div className="flex justify-between">
            <Button onClick={onPrevious} variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!isComplete()}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'stop-bang') {
    const stopBangQuestions = [
      { key: 'snoring', question: 'Do you snore loudly (louder than talking or loud enough to be heard through closed doors)?' },
      { key: 'tired', question: 'Do you often feel tired, fatigued, or sleepy during daytime?' },
      { key: 'observed', question: 'Has anyone observed you stop breathing during your sleep?' },
      { key: 'pressure', question: 'Do you have or are you being treated for high blood pressure?' },
      { key: 'bmi', question: 'Is your BMI more than 35 kg/m²?' },
      { key: 'age_over_50', question: 'Are you over 50 years old?' },
      { key: 'neck', question: 'Is your neck circumference > 16 inches (40cm)?' },
      { key: 'gender_male', question: 'Are you male?' }
    ];

    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <CardTitle className="text-xl">STOP-BANG Questionnaire</CardTitle>
          </div>
          <p className="text-gray-600">
            Please answer the following questions about sleep apnea risk factors.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {stopBangQuestions.map((item, index) => (
            <div key={index} className="space-y-3">
              <Label className="text-base font-medium">{item.question}</Label>
              <RadioGroup
                value={currentData[item.key] || ''}
                onValueChange={(value) => handleInputChange(item.key, value)}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id={`${item.key}_yes`} />
                  <Label htmlFor={`${item.key}_yes`}>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`${item.key}_no`} />
                  <Label htmlFor={`${item.key}_no`}>No</Label>
                </div>
              </RadioGroup>
            </div>
          ))}

          <div className="flex justify-between">
            <Button onClick={onPrevious} variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!isComplete()}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Berlin Questionnaire</CardTitle>
        <p className="text-gray-600">Additional sleep-related questions for comprehensive assessment.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>Berlin Questionnaire implementation would go here...</p>
          <div className="flex justify-between">
            <Button onClick={onPrevious} variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreeningQuestions;
