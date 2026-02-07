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

export interface TaskItem {
  text: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  done: boolean;
  id: string;
}

export interface ParsedResponse {
  text: string;
  cards: ParsedCard[];
  options: QuickOption[];
  tasks: TaskItem[];
  stageSignal?: string;
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
  tasks: TaskItem[];
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
  | { type: 'ADD_TASKS'; tasks: TaskItem[] }
  | { type: 'TOGGLE_TASK'; taskId: string }
  | { type: 'SET_MOOD'; mood: MentorMood }
  | { type: 'SET_LOADING'; loading: boolean };
