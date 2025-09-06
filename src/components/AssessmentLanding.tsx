import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '@/store/assessmentStore';

const AssessmentLanding = () => {
  const navigate = useNavigate();
  const startAssessment = useAssessmentStore(state => state.startAssessment);

  const handleStartAssessment = () => {
    startAssessment();
    navigate('/assessment');
  };

  const features = [
    {
      icon: <CheckCircle className="h-6 w-6 text-success" />,
      title: 'Comprehensive Evaluation',
      description: 'Psychometric, technical, and WISCAR framework assessment'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: '20-30 Minutes',
      description: 'Quick yet thorough assessment of your readiness'
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: 'Personalized Results',
      description: 'Tailored career guidance and next steps'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-warning" />,
      title: 'Career Mapping',
      description: 'Discover ERP roles that match your profile'
    }
  ];

  const careerPaths = [
    'ERP Implementation Consultant',
    'Business Process Analyst', 
    'Functional Consultant (Finance, Supply Chain, HR)',
    'ERP Project Manager',
    'ERP Support Analyst'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-[var(--gradient-primary)] bg-clip-text text-transparent">
              Should I Become an ERP Consultant?
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover if you have the personality, skills, and motivation to succeed as an 
              Enterprise Resource Planning consultant. Take our comprehensive assessment to get 
              personalized career guidance.
            </p>
            <Button 
              size="lg" 
              onClick={handleStartAssessment}
              className="bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-glow)] transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
            >
              Start Assessment
            </Button>
          </div>
        </div>
      </div>

      {/* What is an ERP Consultant Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">What is an ERP Consultant?</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  An ERP Consultant helps organizations implement, customize, and optimize 
                  Enterprise Resource Planning software like SAP, Oracle, and Microsoft Dynamics 
                  to integrate business processes and improve operational efficiency.
                </p>
                <h3 className="text-xl font-semibold mb-4">Key Responsibilities:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Analyze business requirements and processes</li>
                  <li>• Configure ERP systems to meet client needs</li>
                  <li>• Lead implementation projects and training</li>
                  <li>• Provide ongoing support and optimization</li>
                </ul>
              </div>
              <Card className="shadow-[var(--shadow-elegant)]">
                <CardHeader>
                  <CardTitle>Career Opportunities</CardTitle>
                  <CardDescription>Explore these ERP consulting roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {careerPaths.map((path, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">{path}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Assessment Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Traits Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Key Skills & Personality Traits for Success</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {[
                'Strong analytical and problem-solving skills',
                'Effective communication & stakeholder management', 
                'Detail-oriented and process-focused mindset',
                'Ability to learn complex software quickly',
                'Patience and resilience during change management',
                'Business acumen and cross-functional knowledge'
              ].map((trait, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{trait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--gradient-primary)] text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Discover Your ERP Consulting Potential?</h2>
          <p className="text-lg mb-8 opacity-90">
            Take our comprehensive assessment and get personalized career guidance in just 20-30 minutes.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={handleStartAssessment}
            className="hover:shadow-[var(--shadow-glow)] transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
          >
            Start Your Assessment Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AssessmentLanding;