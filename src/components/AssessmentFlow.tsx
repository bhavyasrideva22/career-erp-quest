import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useAssessmentStore } from '@/store/assessmentStore';
import { assessmentQuestions, getSectionQuestions, getSectionInfo } from '@/data/questions';

const AssessmentFlow = () => {
  const navigate = useNavigate();
  const {
    currentSection,
    currentQuestion,
    answers,
    isComplete,
    nextQuestion,
    prevQuestion,
    setAnswer
  } = useAssessmentStore();

  const [selectedValue, setSelectedValue] = useState<string>('');

  const sectionQuestions = getSectionQuestions(currentSection);
  const currentQ = sectionQuestions[currentQuestion];
  const sectionInfo = getSectionInfo(currentSection);
  
  const totalQuestions = assessmentQuestions.length;
  const completedQuestions = currentSection * 8 + currentQuestion + 1;
  const progress = (completedQuestions / totalQuestions) * 100;

  // Find existing answer for current question
  useEffect(() => {
    if (currentQ) {
      const existingAnswer = answers.find(a => a.questionId === currentQ.id);
      setSelectedValue(existingAnswer ? existingAnswer.value.toString() : '');
    }
  }, [currentQ, answers]);

  // Navigate to results when complete
  useEffect(() => {
    if (isComplete) {
      navigate('/results');
    }
  }, [isComplete, navigate]);

  const handleAnswerChange = (value: string) => {
    setSelectedValue(value);
    if (currentQ) {
      const numValue = parseInt(value);
      let isCorrect: boolean | undefined;
      
      if (currentQ.type === 'multiple-choice' && currentQ.correctAnswer !== undefined) {
        isCorrect = numValue === currentQ.correctAnswer;
      }
      
      setAnswer(currentQ.id, numValue, isCorrect);
    }
  };

  const handleNext = () => {
    nextQuestion();
    setSelectedValue('');
  };

  const handlePrev = () => {
    prevQuestion();
  };

  const canProceed = selectedValue !== '';
  const canGoBack = currentSection > 0 || currentQuestion > 0;

  if (!currentQ) {
    return <div>Loading...</div>;
  }

  const renderLikertScale = () => (
    <RadioGroup value={selectedValue} onValueChange={handleAnswerChange} className="space-y-4">
      {[
        { value: '1', label: 'Strongly Disagree' },
        { value: '2', label: 'Disagree' },
        { value: '3', label: 'Neutral' },
        { value: '4', label: 'Agree' },
        { value: '5', label: 'Strongly Agree' }
      ].map((option) => (
        <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderMultipleChoice = () => (
    <RadioGroup value={selectedValue} onValueChange={handleAnswerChange} className="space-y-4">
      {currentQ.options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
          <RadioGroupItem value={index.toString()} id={index.toString()} />
          <Label htmlFor={index.toString()} className="flex-1 cursor-pointer">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{sectionInfo.icon}</span>
              <div>
                <h1 className="text-2xl font-bold">{sectionInfo.title}</h1>
                <p className="text-muted-foreground">{sectionInfo.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Question</div>
              <div className="text-lg font-semibold">{completedQuestions} of {totalQuestions}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8 shadow-[var(--shadow-elegant)]">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-2">{currentQ.category}</div>
                <CardTitle className="text-xl leading-relaxed">{currentQ.text}</CardTitle>
              </div>
              {answers.find(a => a.questionId === currentQ.id) && (
                <CheckCircle className="h-6 w-6 text-success mt-1" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            {currentQ.type === 'likert' ? renderLikertScale() : renderMultipleChoice()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={!canGoBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Section {currentSection + 1} of 3</span>
            <span>•</span>
            <span>Question {currentQuestion + 1} of {sectionQuestions.length}</span>
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-glow)]"
          >
            {completedQuestions === totalQuestions ? 'View Results' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Section Progress Indicators */}
        <div className="mt-8 flex justify-center gap-4">
          {[0, 1, 2].map((sectionIndex) => (
            <div 
              key={sectionIndex} 
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                sectionIndex === currentSection 
                  ? 'bg-primary text-primary-foreground' 
                  : sectionIndex < currentSection 
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {sectionIndex < currentSection ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-current opacity-50" />
              )}
              <span>{getSectionInfo(sectionIndex).title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;