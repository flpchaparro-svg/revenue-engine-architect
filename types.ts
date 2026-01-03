
export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  technicalLabel: string; // New field for the "Status" text
  systemGroup?: string; // New field for System Architecture Grouping
  symptom?: string; // New field for Diagnostic Modal
  description: string;
  features: string[];
  visualPrompt: string;
  bgImage: string;
  icon: string;
}

export type GridSpan = {
  col: string;
  row: string;
};
