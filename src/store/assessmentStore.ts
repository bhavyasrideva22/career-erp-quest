import { create } from 'zustand';

export interface Question {
  id: string;
  section: 'psychometric' | 'technical' | 'wiscar';
  category: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  options?: string[];
  correctAnswer?: number;
  weight: number;
}

export interface Answer {
  questionId: string;
  value: number;
  isCorrect?: boolean;
}

export interface AssessmentResults {
  psychFitScore: number;
  techReadinessScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    abilityToLearn: number;
    realWorldAlignment: number;
  };
  overallConfidence: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  personalizedFeedback: string;
  nextSteps: string[];
  careerRoles: string[];
  alternativeRoles: string[];
}

interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  isComplete: boolean;
  results: AssessmentResults | null;
  timeStarted: Date | null;
  
  // Actions
  startAssessment: () => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  setAnswer: (questionId: string, value: number, isCorrect?: boolean) => void;
  calculateResults: () => void;
  resetAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  currentSection: 0,
  currentQuestion: 0,
  answers: [],
  isComplete: false,
  results: null,
  timeStarted: null,

  startAssessment: () => set({ 
    timeStarted: new Date(),
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    isComplete: false,
    results: null
  }),

  nextQuestion: () => {
    const { currentSection, currentQuestion } = get();
    const totalSections = 3;
    const questionsPerSection = 8;
    
    if (currentQuestion < questionsPerSection - 1) {
      set({ currentQuestion: currentQuestion + 1 });
    } else if (currentSection < totalSections - 1) {
      set({ currentSection: currentSection + 1, currentQuestion: 0 });
    } else {
      get().calculateResults();
    }
  },

  prevQuestion: () => {
    const { currentSection, currentQuestion } = get();
    
    if (currentQuestion > 0) {
      set({ currentQuestion: currentQuestion - 1 });
    } else if (currentSection > 0) {
      set({ currentSection: currentSection - 1, currentQuestion: 7 });
    }
  },

  setAnswer: (questionId: string, value: number, isCorrect?: boolean) => {
    const { answers } = get();
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
    
    const newAnswer: Answer = { questionId, value, isCorrect };
    
    if (existingAnswerIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = newAnswer;
      set({ answers: newAnswers });
    } else {
      set({ answers: [...answers, newAnswer] });
    }
  },

  calculateResults: () => {
    const { answers } = get();
    
    // Calculate scores based on answers
    const psychAnswers = answers.filter(a => a.questionId.startsWith('psych'));
    const techAnswers = answers.filter(a => a.questionId.startsWith('tech'));
    const wiscarAnswers = answers.filter(a => a.questionId.startsWith('wiscar'));
    
    const psychFitScore = Math.round((psychAnswers.reduce((sum, a) => sum + a.value, 0) / (psychAnswers.length * 5)) * 100);
    
    const techReadinessScore = Math.round((techAnswers.reduce((sum, a) => sum + (a.isCorrect ? 5 : a.value), 0) / (techAnswers.length * 5)) * 100);
    
    const wiscarScores = {
      will: Math.round((wiscarAnswers.filter(a => a.questionId.includes('will')).reduce((sum, a) => sum + a.value, 0) / 10) * 100),
      interest: Math.round((wiscarAnswers.filter(a => a.questionId.includes('interest')).reduce((sum, a) => sum + a.value, 0) / 10) * 100),
      skill: Math.round((wiscarAnswers.filter(a => a.questionId.includes('skill')).reduce((sum, a) => sum + a.value, 0) / 10) * 100),
      cognitive: Math.round((wiscarAnswers.filter(a => a.questionId.includes('cognitive')).reduce((sum, a) => sum + a.value, 0) / 10) * 100),
      abilityToLearn: Math.round((wiscarAnswers.filter(a => a.questionId.includes('learn')).reduce((sum, a) => sum + a.value, 0) / 10) * 100),
      realWorldAlignment: Math.round((wiscarAnswers.filter(a => a.questionId.includes('alignment')).reduce((sum, a) => sum + a.value, 0) / 10) * 100)
    };
    
    const overallConfidence = Math.round((psychFitScore + techReadinessScore + Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) / 3);
    
    let recommendation: 'Yes' | 'Maybe' | 'No';
    let personalizedFeedback: string;
    let nextSteps: string[];
    let careerRoles: string[];
    let alternativeRoles: string[];
    
    if (overallConfidence >= 85) {
      recommendation = 'Yes';
      personalizedFeedback = "You have the motivation, cognitive ability, and technical readiness to become an ERP Consultant. Start with module-specific ERP certifications and business process analysis training.";
      nextSteps = [
        "Enroll in ERP platform certifications (SAP, Oracle, Dynamics)",
        "Take business process workshops",
        "Join ERP consulting projects or internships",
        "Build a portfolio of ERP implementations"
      ];
      careerRoles = [
        "ERP Functional Consultant",
        "ERP Implementation Consultant", 
        "Business Process Analyst",
        "ERP Project Manager"
      ];
      alternativeRoles = [];
    } else if (overallConfidence >= 65) {
      recommendation = 'Maybe';
      personalizedFeedback = "Your interest is high, but building stronger domain knowledge and technical aptitude will enhance your success in ERP consulting.";
      nextSteps = [
        "Complete foundational courses in business processes",
        "Learn database basics and SQL",
        "Practice with ERP simulation software",
        "Develop project management skills"
      ];
      careerRoles = [
        "ERP Support Analyst",
        "Business Process Coordinator",
        "ERP Data Analyst"
      ];
      alternativeRoles = [
        "Business Analyst",
        "IT Support Specialist"
      ];
    } else {
      recommendation = 'No';
      personalizedFeedback = "Consider roles in general business analysis or IT support as a stepping stone to ERP consulting, focusing on foundational skill-building first.";
      nextSteps = [
        "Build fundamental business and technical skills",
        "Explore introductory courses in business analysis",
        "Gain experience in customer support or data entry",
        "Consider alternative career paths that align with your strengths"
      ];
      careerRoles = [];
      alternativeRoles = [
        "Business Process Coordinator",
        "IT Support Specialist", 
        "Junior Data Analyst",
        "Software Tester"
      ];
    }
    
    const results: AssessmentResults = {
      psychFitScore,
      techReadinessScore,
      wiscarScores,
      overallConfidence,
      recommendation,
      personalizedFeedback,
      nextSteps,
      careerRoles,
      alternativeRoles
    };
    
    set({ results, isComplete: true });
  },

  resetAssessment: () => set({
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    isComplete: false,
    results: null,
    timeStarted: null
  })
}));