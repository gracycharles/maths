export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export type QuestionType =
  | 'multiple-choice'
  | 'match'
  | 'number-input'
  | 'true-false'
  | 'order-steps'
  | 'fill-blank';

export interface MatchPair {
  left: string;
  right: string;
}

export interface AssessmentQuestion {
  id: string;
  topicId: string;
  questionNumber: number; // 1 to 25+
  difficulty: QuestionDifficulty;
  type: QuestionType;
  question: string;
  mathProblem?: string;
  mathExpression?: string;
  
  // Multiple choice & Fill in blank options
  options?: string[];
  correctAnswer: string | number | boolean;
  acceptableAnswers?: (string | number)[]; // alternative acceptable inputs (e.g. 0.75 or 3/4)
  
  // Interactive match pairs
  matchPairs?: MatchPair[];
  
  // Interactive ordering
  sequenceItems?: string[];
  correctOrder?: number[]; // indices in correct sequence

  // Guidance and Pedagogy
  hint: string;
  explanation: string;
  mathExplanation?: string;
  commonMisconception: string;
  selfCheckPrompt?: string;
}

export interface TopicAssessment {
  topicId: string;
  topicTitle: string;
  category: string;
  yearLevel: string;
  summary: string;
  questions: AssessmentQuestion[];
}

export interface QuestionUserAttempt {
  questionId: string;
  userAnswer: any;
  isCorrect: boolean;
  attemptsCount: number;
  revealedExplanation?: boolean;
  viewedExplanation?: boolean;
  lastAttemptTimestamp?: number;
  studentExplanation?: string;
}

export interface AssessmentRecord {
  topicId: string;
  completedAt?: string;
  score?: number;
  totalQuestions?: number;
  percentage?: number;
  wrongQuestionIds?: string[];
  questionAttempts?: Record<string, QuestionUserAttempt>;
  attempts: Record<string, QuestionUserAttempt>;
}
