export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  category: 'Early Life' | 'Breakthrough' | 'Leadership & Service' | 'Awards & Honors' | 'Legacy';
  location?: string;
  impactScore?: number; // 1-10 scale
}

export interface Quote {
  id: string;
  text: string;
  context: string;
  year?: string;
  theme?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReferenceSource {
  title: string;
  type: 'Wikipedia' | 'Britannica' | 'Wikimedia Commons' | 'Unsplash' | 'Official Archive';
  url: string;
}

export interface TributeFigure {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  era: string;
  bornDied: string;
  birthplace: string;
  primaryField: string;
  heroImage: string;
  imageCaption: string;
  imageSource: string;
  quickStats: { label: string; value: string }[];
  biographyParagraphs: {
    heading: string;
    content: string;
  }[];
  timeline: TimelineEvent[];
  featuredQuote: Quote;
  quoteArchive: Quote[];
  quiz: QuizQuestion[];
  references: ReferenceSource[];
  defaultBgTheme: {
    heroBg: string;
    bioBg: string;
    bioTextColor: string;
    timelineBg: string;
    quoteBg: string;
    accentColor: string;
  };
}

export type FontPairing = 'serif-sans' | 'classic-editorial' | 'modern-tech';
export type ColorMode = 'historic-amber' | 'emerald-parchment' | 'midnight-navy' | 'monochrome-classic';
