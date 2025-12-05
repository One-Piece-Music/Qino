import type { JianzipuEvent, MeiContext, ParseResult } from '../types';
import { convertLabelToFontString } from './fontMapper';
import { generateLabelFromAttributes } from './labelGenerator';


const getN = (el: Element): string => el.getAttribute("n") || "1";
/**
 * Scans the XML content to find all staff/layer combinations that contain Jianzipu elements.
 */
export const getAvailableContexts = (xmlContent: string): MeiContext[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
  const contexts: MeiContext[] = [];

  const staffs = Array.from(xmlDoc.getElementsByTagName("staff"));

  staffs.forEach(staff => {
    const staffN = getN(staff);
    const layers = Array.from(staff.getElementsByTagName("layer"));

    layers.forEach(layer => {
      const layerN = getN(layer);
      
      // Check if this layer actually has Jianzipu content
      // We look for any of our specific tags
      const hasContent = Array.from(layer.children).some(child => 
        ['zhengzi', 'pangzi', 'pangzhu'].includes(child.localName)
      );

      if (hasContent) {
        contexts.push({
          staffN,
          layerN,
          id: `${staffN}-${layerN}`
        });
      }
    });
  });
  return contexts;
};


/**
 * Parses content for a specific Staff and Layer.
 */
export const parseMeiLayer = (
  xmlContent: string, 
  targetStaffN: string, 
  targetLayerN: string
): ParseResult => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, "text/xml");

  const parseError = xmlDoc.getElementsByTagName("parsererror");
  if (parseError.length > 0) {
    return { events: [], error: "Invalid XML format." };
  }

  // Find specific staff
  const staff = Array.from(xmlDoc.getElementsByTagName("staff"))
    .find(s => getN(s) === targetStaffN);

  if (!staff) return { events: [], error: `Staff ${targetStaffN} not found.` };

  // Find specific layer
  const layer = Array.from(staff.getElementsByTagName("layer"))
    .find(l => getN(l) === targetLayerN);

  if (!layer) return { events: [], error: `Layer ${targetLayerN} in Staff ${targetStaffN} not found.` };

  const events: JianzipuEvent[] = [];
  const children = Array.from(layer.children);

  children.forEach((node, index) => {
    const tagName = node.localName;

    if (['zhengzi', 'pangzi', 'pangzhu'].includes(tagName)) {
      let meiLabel = node.getAttribute("label");

      // Fallback generator if label is missing
      if (!meiLabel) {
        meiLabel = generateLabelFromAttributes(node);
      }
      
      events.push({
        id: `event-${index}`,
        type: tagName as JianzipuEvent['type'],
        meiLabel: meiLabel,
        displayLabel: convertLabelToFontString(meiLabel, tagName as JianzipuEvent['type']),
        rawXml: node.outerHTML
      });
    }
  });

  return { events };
};