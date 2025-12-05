import React, { useRef, useEffect, useState } from 'react';

interface MenuProps {
  meiCode: string;
  onLoad: (content: string) => void;
}

const Menu: React.FC<MenuProps> = ({ meiCode, onLoad }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Handle Theme Switching
  useEffect(() => {
    // Pico CSS uses the data-theme attribute on the html tag
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        onLoad(ev.target.result);
      }
    };
    reader.readAsText(file);
  };

  const handleOpenClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    // Modern File System Access API
    if ('showSaveFilePicker' in window) {
      try {
        // @ts-expect-error - Types for window.showSaveFilePicker might need a polyfill or definition
        const handle = await window.showSaveFilePicker({
          suggestedName: 'jianzipu-score.mei',
          types: [{
            description: 'MEI File',
            accept: { 'text/xml': ['.mei', '.xml'] },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(meiCode);
        await writable.close();
        return;
      } catch (err) {
        // User cancelled or error, fall back to legacy download if not a cancellation
        console.log('File Save API skipped or failed, using fallback.', err);
      }
    }

    // Fallback for browsers without File System Access API
    const blob = new Blob([meiCode], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jianzipu-score.mei';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <nav className="container-fluid">
      {/* Left Group: Logo & Actions */}
      <ul>
        <li><strong>Qino</strong></li>
        <li>
          <input 
            type="file" 
            accept=".mei,.xml" 
            style={{ display: 'none' }} 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
          <a href="#" onClick={handleOpenClick} style={{ textDecoration: 'none' }}>
            Open
          </a>
        </li>
        <li>
          <a href="#" onClick={handleSave} style={{ textDecoration: 'none' }}>
            Save
          </a>
        </li>
      </ul>

      {/* Right Group: Theme Toggle */}
      <ul>
        <li>
          <a 
            href="#" 
            onClick={toggleTheme} 
            className="secondary"
            data-tooltip={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            data-placement="bottom"
            style={{ textDecoration: 'none' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;