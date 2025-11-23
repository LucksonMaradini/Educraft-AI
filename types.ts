export enum SchoolType {
  ELEMENTARY = "Elementary School",
  HIGH_SCHOOL = "High School",
  UNIVERSITY = "University",
  ACADEMY = "Private Academy",
  ONLINE = "Online Learning"
}

export interface SchoolConfig {
  name: string;
  type: SchoolType;
  moto: string;
  location: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface SchoolEvent {
  title: string;
  date: string;
  description: string;
}

export interface FacultyMember {
  name: string;
  role: string;
  bio: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface GeneratedContent {
  heroHeadline: string;
  heroSubheadline: string;
  missionStatement: string;
  aboutText: string;
  principalMessage: string;
  principalName: string;
  academicHighlights: string[];
  events: SchoolEvent[];
  faculty: FacultyMember[];
  testimonials: Testimonial[];
  footerText: string;
}

export type AppState = 'WIZARD' | 'GENERATING' | 'PREVIEW';