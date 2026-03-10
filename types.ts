
export type Language = 'it' | 'en';

export interface LocalizedString {
  it: string;
  en: string;
}

export enum ProjectType {
  EXPANDABLE = 'EXPANDABLE',
  FIXED = 'FIXED',
  COMPACT = 'COMPACT'
}

export enum ProjectCategory {
  GAME = 'GAME',
  IMMERSIVE = 'IMMERSIVE',
  WEB = 'WEB',
  OTHER = 'OTHER'
}

export interface Project {
  id: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription?: LocalizedString;
  tags: string[];
  images?: string[]; // URLs
  date?: LocalizedString;
  sortDate: string; // ISO Date string YYYY-MM-DD for sorting
  type: ProjectType;
  category: ProjectCategory;
  link?: string;
}

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// --- Immersive Experience Types ---

export type RoomId = 'HUB' | 'GAMES' | 'IMMERSIVE' | 'WEB' | 'EXTRA';

export type ContentType = 'TEXT' | 'MISSION' | 'LIST' | 'IMAGE';

export interface MissionData {
  problem: LocalizedString;
  solution: LocalizedString;
  responsibilities: LocalizedString;
  results: LocalizedString;
}

export interface InteractiveObjectData {
  id: string;
  icon?: string; // Lucide icon name or 'custom-image'
  label: LocalizedString;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  contentType: ContentType;
  contentKey: string; // Key to find text in translations
  missionData?: MissionData; // Optional, for MISSION type
  imageUrl?: string; // Optional, for IMAGE type
  size: string;
  tooltipTop?: boolean;
}
