export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  emoji: string;
  description: string;
  cardImage: string;
  caption: string;
}

export interface FloatingLetter {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  color: string;
}

export interface CounterStats {
  days: number;
  hours: number;
  smiles: number;
}
