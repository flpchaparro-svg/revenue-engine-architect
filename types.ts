
export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  technicalLabel?: string; // Full technical label for display box (optional - not currently used)
  technicalLabelShort?: string; // Short technical label for small cards (optional - not currently used)
  systemGroup?: string; // New field for System Architecture Grouping
  symptom?: string; // New field for Diagnostic Modal
  description: string; // Full description for display box
  smallCardBody?: string; // Short hook/question text for desktop small cards
  features: string[];
  visualPrompt: string;
  bgImage?: string; // Optional - not currently used
  icon: string;
}

export type GridSpan = {
  col: string;
  row: string;
};
