export type CharacterRole = 'narrator' | 'hien' | 'mother' | 'teacher';

export interface DialogueLine {
  id: string;
  role: CharacterRole;
  speakerName: string;
  text: string;
  avatar: string;
  isCreativeDialogue?: boolean;
  audioUrl?: string;
  duration?: number;
}

export interface AuditionVoiceSample {
  role: CharacterRole;
  roleTitle: string;
  speakerName: string;
  avatar: string;
  tag: string;
  text: string;
  isIllustrative: boolean;
}

export interface Hotspot {
  id: string;
  title: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  description: string;
  meaning: string;
  tip: string;
}

export interface ChoiceOption {
  id: string;
  text: string;
  feedback: {
    title: string;
    description: string;
    actionAdvice: string;
    encouragement: string;
    isOptimal: boolean;
  };
}

export interface PageActivity {
  type: 'discovery' | 'reflection' | 'scenario' | 'application';
  title: string;
  instruction?: string;
  hotspots?: Hotspot[];
  question?: string;
  options?: ChoiceOption[];
  applicationActions?: {
    id: string;
    text: string;
    icon: string;
    category: string;
  }[];
}

export interface BookPageData {
  pageNumber: number;
  title: string;
  subheading?: string;
  paragraphText: string;
  preservedTextSnippet?: string; // Exact original text preserved
  isPreservedSource?: boolean;
  dialogues: DialogueLine[];
  activity?: PageActivity;
  illustrationKey: string;
  moralLesson: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  praise: string;
}

export interface CommitmentData {
  studentName: string;
  className: string;
  actionChoice: string;
  customAction: string;
  targetDate: string;
  savedAt?: string;
}
