import React, { useMemo } from 'react';
import { parseMeiLayer } from '../utils/meiParser';
import type { JianzipuEvent, MeiContext } from '../types';

interface ViewerProps {
  meiCode: string;
  context: MeiContext | null;
}

const Viewer: React.FC<ViewerProps> = ({ meiCode, context }) => {
  const { events, error } = useMemo(() => {
    if (!context) return { events: [], error: null };
    return parseMeiLayer(meiCode, context.staffN, context.layerN);
  }, [meiCode, context]);

  return (
    <article style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <header>
        Preview 
        {context && <small> (Staff {context.staffN}, Layer {context.layerN})</small>}
      </header>
      
      {error && (
        <div style={{ color: 'var(--pico-del-color)', marginBottom: '1rem' }}>
          <small>Parse Error: {error}</small>
        </div>
      )}

      {/* 
         Main Container:
         We use a standard block div. The font itself should handle line heights and flow.
         We treat the score as a paragraph of text.
      */}
      <div className="jianzipu-content-area">
        {events.map((event: JianzipuEvent) => (
          <span 
            key={event.id} 
            className={`jianzipu-char type-${event.type}`}
            data-tooltip={`Type: ${event.type}\nLabel: ${event.meiLabel}`}
            data-placement="bottom"
          >
            {event.displayLabel + ' '}
          </span>
        ))}

        {/* FIX: Add a spacer at the end to prevent the last character from being clipped 
            and to allow clicking 'behind' the text */}
        <span className="jianzipu-spacer">&nbsp;</span>
        
        {events.length === 0 && !error && (
          <small style={{ color: 'var(--pico-muted-color)' }}>
            {context ? "No events found in this layer." : "Loading or no layer selected..."}
          </small>
        )}
      </div>
    </article>
  );
};

export default Viewer;