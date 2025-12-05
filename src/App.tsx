import { useState, useEffect, useMemo } from 'react';
import Menu from './components/Menu';
import Editor from './components/Editor';
import Viewer from './components/Viewer';
import type { MeiContext } from './types';
import { getAvailableContexts } from './utils/meiParser';

function App() {
  const [meiCode, setMeiCode] = useState<string>("");
  const [selectedContext, setSelectedContext] = useState<MeiContext | null>(null);

  // Load default MEI from public folder on mount
  useEffect(() => {
    fetch('./assets/default.mei')
      .then(res => {
        if (!res.ok) throw new Error("Failed to load default file");
        return res.text();
      })
      .then(text => setMeiCode(text))
      .catch(err => console.error(err));
  }, []);

  // Scan for available contexts whenever code changes
  const availableContexts = useMemo(() => {
    if (!meiCode) return [];
    return getAvailableContexts(meiCode);
  }, [meiCode]);

  // Auto-select the first context if none selected or current is invalid
  useEffect(() => {
    if (availableContexts.length > 0) {
      // If nothing selected, or currently selected is no longer valid (e.g., ID changed)
      const isValid = selectedContext && availableContexts.some(c => c.id === selectedContext.id);
      
      if (!selectedContext || !isValid) {
        setSelectedContext(availableContexts[0]);
      }
    } else {
      setSelectedContext(null);
    }
  }, [availableContexts, selectedContext]);

  return (
    <>
      <Menu meiCode={meiCode} onLoad={setMeiCode} />
      
      <main className="container-fluid" style={{ height: 'calc(100vh - 100px)' }}>
        <div className="grid" style={{ height: '100%' }}>
          {/* Left Side: Viewer */}
          <div style={{ height: '100%', overflow: 'hidden' }}>
            <Viewer meiCode={meiCode} context={selectedContext} />
          </div>

          {/* Right Side: Editor */}
          <div style={{ height: '100%', overflow: 'hidden' }}>
            <Editor 
              code={meiCode} 
              onChange={setMeiCode} 
              availableContexts={availableContexts}
              selectedContext={selectedContext}
              onContextChange={setSelectedContext}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;