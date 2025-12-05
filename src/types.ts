export type JianzipuElementType = 'zhengzi' | 'pangzi' | 'pangzhu';

export interface JianzipuEvent {
  id: string;
  type: JianzipuElementType;
  meiLabel: string;     // The raw value from the XML @label attribute
  displayLabel: string; // The converted string for the Jianzipu font
  rawXml: string;       // Keeping raw XML string for potential debug
}

export interface MeiContext {
  staffN: string;
  layerN: string;
  id: string; // Unique key for the dropdown (e.g., "1-1")
}

export interface ParseResult {
  events: JianzipuEvent[];
  error?: string;
}