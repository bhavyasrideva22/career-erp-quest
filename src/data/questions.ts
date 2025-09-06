import { Question } from '../store/assessmentStore';

export const assessmentQuestions: Question[] = [
  // Psychometric Section (8 questions)
  {
    id: 'psych-interest-1',
    section: 'psychometric',
    category: 'Interest Scale',
    text: 'I enjoy solving complex business problems using technology.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych-personality-1',
    section: 'psychometric',
    category: 'Personality Fit',
    text: 'I prefer working in structured environments with clear procedures.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych-motivation-1',
    section: 'psychometric',
    category: 'Motivation',
    text: 'I am motivated to continuously learn new software and business processes.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych-communication-1',
    section: 'psychometric',
    category: 'Communication',
    text: 'I am comfortable interacting with different stakeholders and managing change.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych-resilience-1',
    section: 'psychometric',
    category: 'Resilience',
    text: 'I remain patient and persistent when facing complex challenges.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych-detail-1',
    section: 'psychometric',
    category: 'Attention to Detail',
    text: 'I pay close attention to details and follow processes carefully.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych-analytical-1',
    section: 'psychometric',
    category: 'Analytical Thinking',
    text: 'I enjoy analyzing data and identifying patterns to solve business problems.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych-adaptability-1',
    section: 'psychometric',
    category: 'Adaptability',
    text: 'I adapt quickly to new software and changing business requirements.',
    type: 'likert',
    weight: 1
  },

  // Technical Section (8 questions)
  {
    id: 'tech-erp-1',
    section: 'technical',
    category: 'ERP Knowledge',
    text: 'Which of the following best describes ERP software?',
    type: 'multiple-choice',
    options: [
      'A single application that manages only financial data',
      'Integrated software that manages business processes across departments',
      'A database management system for storing customer information',
      'Software specifically designed for manufacturing companies'
    ],
    correctAnswer: 1,
    weight: 1
  },
  {
    id: 'tech-modules-1',
    section: 'technical',
    category: 'ERP Modules',
    text: 'Which ERP module would handle employee payroll and benefits?',
    type: 'multiple-choice',
    options: [
      'Financial Management (FI)',
      'Supply Chain Management (SCM)',
      'Human Resources (HR)',
      'Customer Relationship Management (CRM)'
    ],
    correctAnswer: 2,
    weight: 1
  },
  {
    id: 'tech-process-1',
    section: 'technical',
    category: 'Business Process',
    text: 'A company wants to track inventory from procurement to sales. Which process flow is most logical?',
    type: 'multiple-choice',
    options: [
      'Sales → Procurement → Inventory → Delivery',
      'Procurement → Inventory → Sales → Delivery',
      'Inventory → Sales → Procurement → Delivery',
      'Delivery → Sales → Inventory → Procurement'
    ],
    correctAnswer: 1,
    weight: 1
  },
  {
    id: 'tech-integration-1',
    section: 'technical',
    category: 'System Integration',
    text: 'Why is data integration important in ERP systems?',
    type: 'multiple-choice',
    options: [
      'To reduce software licensing costs',
      'To ensure consistent information across all departments',
      'To improve computer processing speed',
      'To simplify user interface design'
    ],
    correctAnswer: 1,
    weight: 1
  },
  {
    id: 'tech-workflow-1',
    section: 'technical',
    category: 'Workflow Logic',
    text: 'A purchase order requires approval if the amount exceeds $5,000. This is an example of:',
    type: 'multiple-choice',
    options: [
      'Data validation',
      'Business rule configuration',
      'System integration',
      'User access control'
    ],
    correctAnswer: 1,
    weight: 1
  },
  {
    id: 'tech-reporting-1',
    section: 'technical',
    category: 'Reporting',
    text: 'Which type of report would help track monthly sales performance?',
    type: 'multiple-choice',
    options: [
      'Exception report',
      'Operational dashboard',
      'Trend analysis report',
      'Compliance audit report'
    ],
    correctAnswer: 2,
    weight: 1
  },
  {
    id: 'tech-scenario-1',
    section: 'technical',
    category: 'Problem Solving',
    text: 'A client complains that their inventory levels show differently in the warehouse and accounting systems. What should you investigate first?',
    type: 'multiple-choice',
    options: [
      'User training records',
      'Data synchronization between modules',
      'Hardware performance issues',
      'Software licensing compliance'
    ],
    correctAnswer: 1,
    weight: 1
  },
  {
    id: 'tech-implementation-1',
    section: 'technical',
    category: 'Implementation',
    text: 'During ERP implementation, what is the most critical success factor?',
    type: 'multiple-choice',
    options: [
      'Having the latest software version',
      'Strong project management and change management',
      'Minimal customization requirements',
      'Large IT support team'
    ],
    correctAnswer: 1,
    weight: 1
  },

  // WISCAR Section (12 questions - 2 per dimension)
  {
    id: 'wiscar-will-1',
    section: 'wiscar',
    category: 'Will',
    text: 'I persist through complex challenges even when progress seems slow.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'wiscar-will-2',
    section: 'wiscar',
    category: 'Will',
    text: 'I maintain high energy and motivation during long-term projects.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'wiscar-interest-1',
    section: 'wiscar',
    category: 'Interest',
    text: 'I find business process optimization genuinely fascinating.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'wiscar-interest-2',
    section: 'wiscar',
    category: 'Interest',
    text: 'I actively seek to understand how different business functions connect.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'wiscar-skill-1',
    section: 'wiscar',
    category: 'Skill',
    text: 'I have strong analytical and problem-solving abilities.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'wiscar-skill-2',
    section: 'wiscar',
    category: 'Skill',
    text: 'I communicate technical concepts clearly to non-technical stakeholders.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'wiscar-cognitive-1',
    section: 'wiscar',
    category: 'Cognitive',
    text: 'I can quickly understand complex system relationships and dependencies.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'wiscar-cognitive-2',
    section: 'wiscar',
    category: 'Cognitive',
    text: 'I think systematically about business processes and their interactions.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'wiscar-learn-1',
    section: 'wiscar',
    category: 'Ability to Learn',
    text: 'I adapt quickly to new software and technologies.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'wiscar-learn-2',
    section: 'wiscar',
    category: 'Ability to Learn',
    text: 'I actively seek feedback and use it to improve my performance.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'wiscar-alignment-1',
    section: 'wiscar',
    category: 'Real World Alignment',
    text: 'I enjoy working with clients to understand their business requirements.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'wiscar-alignment-2',
    section: 'wiscar',
    category: 'Real World Alignment',
    text: 'I thrive in consulting environments with diverse projects and clients.',
    type: 'likert',
    weight: 1
  }
];

export const getSectionQuestions = (section: number): Question[] => {
  const sections = ['psychometric', 'technical', 'wiscar'] as const;
  return assessmentQuestions.filter(q => q.section === sections[section]);
};

export const getSectionInfo = (section: number) => {
  const sectionData = [
    {
      title: 'Personality & Motivation',
      description: 'Assess your psychological fit for ERP consulting',
      icon: '🧠'
    },
    {
      title: 'Technical Knowledge', 
      description: 'Evaluate your technical readiness and domain knowledge',
      icon: '⚙️'
    },
    {
      title: 'WISCAR Assessment',
      description: 'Comprehensive evaluation of your consulting readiness',
      icon: '📊'
    }
  ];
  
  return sectionData[section];
};