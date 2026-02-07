export type MentorMood = 'thinking' | 'challenging' | 'hyped' | 'teaching' | 'shipping';

export interface Stage {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  description: string;
  mentor_mood: MentorMood;
  color: string;
}

export interface Tool {
  name: string;
  url: string;
  description: string;
  stages: string[];
  icon: string;
}

export interface ParsedCard {
  type: string;
  data: Record<string, unknown>;
}

export interface QuickOption {
  label: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ParsedResponse {
  text: string;
  cards: ParsedCard[];
  options: QuickOption[];
}

// Card data types
export interface ProblemStatementData {
  statement: string;
  who: string;
  problem: string;
  why_now: string;
}

export interface ResearchFinding {
  quote: string;
  source: string;
  url?: string;
  supports_idea: boolean;
}

export interface ResearchEvidenceData {
  findings: ResearchFinding[];
}

export interface PersonaData {
  name: string;
  age: number;
  occupation: string;
  pain_point: string;
  daily_life: string;
  tried_before: string[];
  why_failed: string;
}

export interface BusinessModelData {
  value_prop: string;
  customer_segment: string;
  channels: string;
  revenue_model: string;
  key_activities: string;
  cost_structure: string;
}

export interface BrandBoardData {
  name_options: string[];
  colors: string[];
  font_suggestion: string;
  tone_words: string[];
  tagline: string;
}

export interface PrototypeData {
  url: string;
  headline: string;
  value_prop: string;
  cta_text: string;
  what_it_tests: string;
}

export interface ValidationFeedback {
  quote: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface ValidationData {
  people_tested: number;
  feedback: ValidationFeedback[];
  patterns: string;
  recommendation: string;
}

export interface ToolRecommendationData {
  name: string;
  url: string;
  description: string;
  why_now: string;
  icon: string;
}

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface OnboardingData {
  userName: string;
  ideaCategory: string | null;
  experienceLevel: ExperienceLevel | null;
}

export interface AppState {
  stage: string;
  cards: ParsedCard[];
  mentorMood: MentorMood;
  isLoading: boolean;
  started: boolean;
  onboardingComplete: boolean;
  onboardingData: OnboardingData;
}

export type AppAction =
  | { type: 'START' }
  | { type: 'COMPLETE_ONBOARDING'; data: OnboardingData }
  | { type: 'SET_STAGE'; stage: string }
  | { type: 'ADD_CARDS'; cards: ParsedCard[] }
  | { type: 'SET_MOOD'; mood: MentorMood }
  | { type: 'SET_LOADING'; loading: boolean };
