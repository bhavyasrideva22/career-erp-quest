import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, XCircle, RotateCcw, Home, TrendingUp, Target, BookOpen } from 'lucide-react';
import { useAssessmentStore } from '@/store/assessmentStore';
import RadarChart from './RadarChart';

const AssessmentResults = () => {
  const navigate = useNavigate();
  const { results, isComplete, resetAssessment } = useAssessmentStore();

  useEffect(() => {
    if (!isComplete || !results) {
      navigate('/');
    }
  }, [isComplete, results, navigate]);

  if (!results) {
    return <div>Loading...</div>;
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'success';
      case 'Maybe': return 'warning';
      case 'No': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return <CheckCircle className="h-6 w-6" />;
      case 'Maybe': return <AlertCircle className="h-6 w-6" />;
      case 'No': return <XCircle className="h-6 w-6" />;
      default: return null;
    }
  };

  const handleRetakeAssessment = () => {
    resetAssessment();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-[var(--gradient-primary)] bg-clip-text text-transparent">
            Your ERP Consultant Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your readiness for an ERP consulting career
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className={`mb-8 border-2 shadow-[var(--shadow-elegant)] ${
          results.recommendation === 'Yes' 
            ? 'border-success bg-success/5' 
            : results.recommendation === 'Maybe'
              ? 'border-warning bg-warning/5'
              : 'border-destructive bg-destructive/5'
        }`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getRecommendationIcon(results.recommendation)}
                <div>
                  <CardTitle className="text-2xl">
                    Recommendation: <Badge variant={getRecommendationColor(results.recommendation) as any} className="text-lg px-3 py-1">
                      {results.recommendation}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Overall Confidence Score: {results.overallConfidence}%
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{results.overallConfidence}%</div>
                <Progress value={results.overallConfidence} className="w-32 h-3" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">{results.personalizedFeedback}</p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Core Scores */}
          <div className="space-y-6">
            <Card className="shadow-[var(--shadow-elegant)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Core Assessment Scores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Psychological Fit</span>
                    <span className="font-bold text-primary">{results.psychFitScore}%</span>
                  </div>
                  <Progress value={results.psychFitScore} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Technical Readiness</span>
                    <span className="font-bold text-primary">{results.techReadinessScore}%</span>
                  </div>
                  <Progress value={results.techReadinessScore} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* WISCAR Scores Detail */}
            <Card className="shadow-[var(--shadow-elegant)]">
              <CardHeader>
                <CardTitle>WISCAR Framework Breakdown</CardTitle>
                <CardDescription>Detailed analysis of your consulting readiness</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(results.wiscarScores).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-bold text-primary">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* WISCAR Radar Chart */}
          <Card className="shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle>WISCAR Radar Analysis</CardTitle>
              <CardDescription>Visual representation of your strengths and development areas</CardDescription>
            </CardHeader>
            <CardContent>
              <RadarChart data={results.wiscarScores} size={350} />
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Next Steps */}
          <Card className="shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Career Roles */}
          <Card className="shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Career Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.careerRoles.length > 0 && (
                <div>
                  <h4 className="font-semibold text-success mb-3">Recommended ERP Roles:</h4>
                  <div className="space-y-2">
                    {results.careerRoles.map((role, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {results.alternativeRoles.length > 0 && (
                <div>
                  <h4 className="font-semibold text-warning mb-3">Alternative Career Paths:</h4>
                  <div className="space-y-2">
                    {results.alternativeRoles.map((role, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-warning" />
                        <span className="text-sm">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={handleRetakeAssessment} variant="outline" size="lg" className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Retake Assessment
          </Button>
          <Button onClick={() => navigate('/')} size="lg" className="flex items-center gap-2 bg-[var(--gradient-primary)]">
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;