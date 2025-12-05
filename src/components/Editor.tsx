import React from 'react';
import type { MeiContext } from '../types';

interface EditorProps {
  code: string;
  onChange: (value: string) => void;
  availableContexts: MeiContext[];
  selectedContext: MeiContext | null;
  onContextChange: (ctx: MeiContext) => void;
}

const Editor: React.FC<EditorProps> = ({ 
  code, 
  onChange, 
  availableContexts, 
  selectedContext, 
  onContextChange 
}) => {
  return (
    <article style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>MEI Source</span>
        
        {/* Context Selector Dropdown */}
        <select 
          style={{ width: 'auto', margin: 0, padding: '0.2rem 2rem 0.2rem 1rem', fontSize: '0.8rem' }}
          value={selectedContext?.id || ""}
          onChange={(e) => {
            const ctx = availableContexts.find(c => c.id === e.target.value);
            if (ctx) onContextChange(ctx);
          }}
          disabled={availableContexts.length === 0}
        >
          {availableContexts.length === 0 && <option>No Jianzipu layers found</option>}
          {availableContexts.map(ctx => (
            <option key={ctx.id} value={ctx.id}>
              Staff {ctx.staffN}, Layer {ctx.layerN}
            </option>
          ))}
        </select>
      </header>
      <textarea
        style={{ 
          flexGrow: 1, 
          fontFamily: 'monospace', 
          fontSize: '0.9rem',
          resize: 'none',
          whiteSpace: 'pre',
          border: 'none',
          outline: 'none'
        }}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </article>
  );
};

export default Editor;