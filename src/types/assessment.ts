export type Grade = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Subject = 'english' | 'mathematics' | 'science';
export type DifficultyBand = 'below' | 'at' | 'above';
export type SkillLevel = 'green' | 'yellow' | 'red';
export type LearnerType = 'concept-strong' | 'practice-dependent' | 'foundation-risk' | 'high-potential';
export type ErrorTag = 'concept-gap' | 'language-barrier' | 'careless-error' | 'slow-processing' | 'none';

// Skill Codes
export type EnglishSkill = 'E1' | 'E2' | 'E3' | 'E4' | 'E5';
export type MathsSkill = 'M1' | 'M2' | 'M3' | 'M4' | 'M5';
export type ScienceSkill = 'S1' | 'S2' | 'S3' | 'S4' | 'S5';
export type SkillCode = EnglishSkill | MathsSkill | ScienceSkill;

export interface SkillDefinition {
  code: SkillCode;
  name: string;
  subject: Subject;
  description: string;
}

export const SKILL_DEFINITIONS: SkillDefinition[] = [
  // English Skills
  { code: 'E1', name: 'Reading Fluency', subject: 'english', description: 'Ability to read smoothly with proper pace and expression' },
  { code: 'E2', name: 'Vocabulary', subject: 'english', description: 'Word knowledge, synonyms, antonyms, and contextual meaning' },
  { code: 'E3', name: 'Grammar Intuition', subject: 'english', description: 'Natural understanding of grammar rules and sentence structure' },
  { code: 'E4', name: 'Comprehension', subject: 'english', description: 'Understanding and interpreting written passages' },
  { code: 'E5', name: 'Written Expression', subject: 'english', description: 'Ability to express ideas clearly in writing' },
  
  // Maths Skills
  { code: 'M1', name: 'Number Sense', subject: 'mathematics', description: 'Understanding of numbers, place value, and relationships' },
  { code: 'M2', name: 'Operations', subject: 'mathematics', description: 'Proficiency in basic mathematical operations' },
  { code: 'M3', name: 'Word Problems', subject: 'mathematics', description: 'Translating real-world scenarios into mathematical solutions' },
  { code: 'M4', name: 'Logical Reasoning', subject: 'mathematics', description: 'Pattern recognition and logical thinking' },
  { code: 'M5', name: 'Speed & Accuracy', subject: 'mathematics', description: 'Quick and correct calculations' },
  
  // Science Skills
  { code: 'S1', name: 'Observation', subject: 'science', description: 'Noticing details and patterns in the natural world' },
  { code: 'S2', name: 'Concept Awareness', subject: 'science', description: 'Understanding fundamental scientific concepts' },
  { code: 'S3', name: 'Cause-Effect', subject: 'science', description: 'Understanding relationships between events and outcomes' },
  { code: 'S4', name: 'Application', subject: 'science', description: 'Applying scientific knowledge to new situations' },
  { code: 'S5', name: 'Scientific Vocabulary', subject: 'science', description: 'Knowledge of scientific terms and definitions' },
];

export interface Student {
  id: string;
  name: string;
  grade: Grade;
  school?: string;
  createdAt: Date;
}

export type Section = 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'match' | 'diagram' | 'fill-blank' | 'true-false';
  options?: string[];
  correctAnswer: string | string[];
  grade: Grade;
  subject: Subject;
  skillCode: SkillCode;
  difficultyBand: DifficultyBand;
  expectedTime: number; // in seconds
  imageUrl?: string;
  matchPairs?: { left: string; right: string }[];
  section?: Section; // A: Foundational, B: Application, C: Reasoning
}

export interface QuestionResponse {
  questionId: string;
  selectedAnswer: string | string[];
  isCorrect: boolean;
  timeTaken: number; // in seconds
  errorTag: ErrorTag;
}

export interface SkillScore {
  skillCode: SkillCode;
  level: SkillLevel;
  accuracy: number;
  avgTime: number;
  questionsAttempted: number;
}

export interface AssessmentResult {
  id: string;
  studentId: string;
  completedAt: Date;
  totalTime: number;
  skillScores: SkillScore[];
  learnerType: LearnerType;
  responses: QuestionResponse[];
  recommendations: string[];
}

export interface AssessmentState {
  currentQuestionIndex: number;
  questions: Question[];
  responses: QuestionResponse[];
  startTime: Date;
  currentDifficulty: DifficultyBand;
  subject: Subject;
  isComplete: boolean;
}
