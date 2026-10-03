export type CategoryId = 'fractions' | 'numbers' | 'calculations' | 'geometry' | 'measurement' | 'data';

export type YearLevel = 'Primary 5 / Year 5 (Age 9-10)' | 'Primary 6 / Year 6 (Age 10-11)' | 'Primary 7 / Year 7 (Age 11-12)' | 'Year 8+ / KS3 (Age 12+)';

export type Difficulty = 'Foundation' | 'Core' | 'Challenge' | 'Mastery';

export interface KeyFormula {
  id: string;
  name: string;
  formula: string;
  description: string;
  keyNote?: string;
}

export interface WorkedStep {
  stepNumber: number;
  title: string;
  explanation: string;
  math?: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  level?: 'Level 1: Easy' | 'Level 2: Medium' | 'Level 3: Multi-Step' | 'Level 4: Real-World' | 'Level 5: Hard Mastery' | string;
  problem: string;
  mathProblem?: string;
  steps: WorkedStep[];
  finalAnswer: string;
  proTip?: string;
}

export interface PrerequisiteIndicator {
  term: string;
  quickDefinition: string;
  targetTopicId?: string;
  targetTopicTitle?: string;
  targetSectionId?: string;
  targetSectionTitle?: string;
}

export interface TopicSection {
  id: string;
  title: string;
  readTimeMinutes?: number;
  visualMetaphor?: string;
  content: string;
  prerequisites?: PrerequisiteIndicator[];
  mathExpressions?: string[];
  keyTakeaways: string[];
  workedExamples?: WorkedExample[];
}

export type TopicPage = 'concepts' | 'examples' | 'tips' | 'formulas' | 'practice' | 'tools';


export interface TipOrTrick {
  id: string;
  title: string;
  type: 'hack' | 'pitfall' | 'calculator' | 'shortcut';
  badge: string;
  content: string;
  mathExample?: string;
  ruleSummary?: string;
}

export interface ImportantInfo {
  id: string;
  title: string;
  priority: 'CRITICAL' | 'HIGH' | 'EXAM-TIP';
  content: string;
  math?: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  mathQuestion?: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  mathExplanation?: string;
  difficulty: Difficulty;
}

export interface MathTopic {
  id: string;
  title: string;
  category: CategoryId;
  yearLevel: YearLevel;
  difficulty: Difficulty;
  summary: string;
  iconName: string;
  color: string;
  readTimeMinutes: number;
  sections: TopicSection[];
  keyFormulas: KeyFormula[];
  tipsAndTricks: TipOrTrick[];
  importantInfo: ImportantInfo[];
  practiceQuestions: PracticeQuestion[];
  toolType?: 'fractions' | 'bidmas' | 'angles' | 'area-perimeter' | 'roman-numerals' | 'times-tables' | 'place-value' | 'decimals-percentages' | 'factors-multiples' | 'averages-data' | 'coordinates';
}

