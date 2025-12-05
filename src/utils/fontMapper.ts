import type { JianzipuEvent } from '../types';

/**
 * Converts the MEI label attribute into the specific string/codepoint 
 * required by the Jianzipu font (v3) to render the ligature.
 * 
 * @param meiLabel - The raw label from the MEI file (e.g., "名七勾五")
 * @returns The string to be rendered by the font.
 */
export const convertLabelToFontString = (meiLabel: string, type: JianzipuEvent['type']): string => {
  // TODO: Implement the mapping logic here.
  // For now, we assume the MEI label exactly matches the font's required sequence.
  let fontString = '';
  if (type === 'zhengzi') {
    // Potentially add specific handling for zhengzi if needed
    fontString = meiLabel.replace("；", "|");
  } else if (type === 'pangzi') {
    // Potentially add specific handling for pangzi if needed
    fontString = ':' + meiLabel;
  } else if (type === 'pangzhu') {
    // Potentially add specific handling for pangzhu if needed
    fontString = meiLabel;
  }
  return fontString + ' ';
};