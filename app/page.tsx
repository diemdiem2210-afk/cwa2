'use client';
import React, { useState, useEffect } from 'react';

interface Tab {
  id: number;
  title: string;
  content: string;
}

export default function HomePage() {
  const [htmlTitle, setHtmlTitle] = useState('My Generated Website');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#333333');
  const [fontSize, setFontSize] = useState('16');
  const [content, setContent] = useState('Welcome to my website!\n\nThis page was generated using the Next.js Code Generator.\n\nYou can customize the colors, fonts, and content to create your perfect webpage.');
  const [includeNavigation, setIncludeNavigation] = useState(true);
  const [includeFooter, setIncludeFooter] = useState(true);
  const [includeJavaScript, setIncludeJavaScript] = useState(true);
  const [generatedCode, setGeneratedCode] = useState('');

  // --- Tabs state ---
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  // Load tabs from localStorage
  useEffect(() => {
    const storedTabs = localStorage.getItem('tabsGenerator');
    if (storedTabs) {
      setTabs(JSON.parse(storedTabs));
    } else {
      setTabs([{ id: 1, title: 'Tab 1', content: 'This is Tab 1 content' }]);
    }
  }, []);

  // Save tabs to localStorage
  useEffect(() => {
    localStorage.setItem('tabsGenerator', JSON.stringify(tabs));
  }, [tabs]);

  const addTab = () => {
    if (tabs.length >= 15) return;
    const newId = tabs.length ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    setTabs([...tabs, { id: newId, title: `Tab ${newId}`, content: '' }]);
    setActiveTab(tabs.length);
  };

  const removeTab = () => {
    if (tabs.length <= 1) return;
    const newTabs = tabs.filter((_, index) => index !== activeTab);
    setTabs(newTabs);
    setActiveTab(Math.max(activeTab - 1, 0));
  };

  const updateTabTitle = (index: number, title: string) => {
    const updated = [...tabs];
    updated[index].title = title;
    setTabs(updated);
  };

  const updateTabContent = (index: number, content: string) => {
    const updated = [...tabs];
    updated[index].content = content;
    setTabs(updated);
  };

  // --- HTML5 generator ---
  const generateHTML5Code = () => {
    const tabsHTML = tabs.length
      ? `<div class="tabs">
${tabs.map((tab, i) => `
  <button onclick="showTab(${i})">${tab.title}</button>
`).join('')}
</div>
<div class="tabs-content">
${tabs.map((tab, i) => `
  <div class="tab-panel" style="display: ${i === 0 ? 'block' : 'none'};">
    ${tab.content.split('\n').map(line => `<p>${line || '&nbsp;'}</p>`).join('\n')}
  </div>
`).join('')}
</div>
<script>
function showTab(index) {
  const panels = document.querySelectorAll('.tab-panel');
  panels.forEach((p, i) => p.style.display = i === index ? 'block' : 'none');
}
</script>`
      : '';

    const jsCode = includeJavaScript ? `
<script>
function changeBackgroundColor() {
  const colors = ['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#feca57','#ff9ff3','#54a0ff'];
  const randomColor = colors[Math.floor(Math.random()*colors.length)];
  document.body.style.backgroundColor = randomColor;
}
</script>` : '';

    const navigationHTML = includeNavigation ? `
<nav> ... </nav>` : '';

    const footerHTML = includeFooter ? `
<footer> ... </footer>` : '';

    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${htmlTitle}</title>
<style>
body { font-family:sans-serif; background:${backgroundColor}; color:${textColor}; font-size:${fontSize}px; }
.tabs button { margin-right:8px; padding:6px 12px; cursor:pointer; }
.tab-panel { padding:12px; border:1px solid #ccc; margin-top:8px; }
</style>
</head>
<body>
${navigationHTML}
<h1>${htmlTitle}</h1>
<div>
${tabsHTML}
</div>
<div id="main-content">${content.split('\n').map(line => `<p>${line || '&nbsp;'}</p>`).join('\n')}</div>
${footerHTML}
${jsCode}
</body>
</html>`;
    setGeneratedCode(fullHTML);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      alert('✅ HTML5 code copied!');
    } catch (err) {
      alert('❌ Failed to copy code');
    }
  };

  const downloadHTML = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${htmlTitle.replace(/\s+/g,'_').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main style={{ padding:'20px', maxWidth:'1400px', margin:'0 auto' }}>
      <h1>🔧 HTML5 Code Generator with Tabs</h1>

      {/* Tabs Editor */}
      <section style={{ margin:'20px 0', padding:'16px', border:'1px solid #ccc', borderRadius:'8px' }}>
        <h2>🗂️ Tabs Generator</h2>
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'8px' }}>
          {tabs.map((tab, i) => (
            <input
              key={tab.id}
              value={tab.title}
              onChange={e=>updateTabTitle(i,e.target.value)}
              style={{ padding:'6px', border:i===activeTab?'2px solid #667eea':'1px solid #ccc', borderRadius:'4px', minWidth:'80px' }}
              onClick={()=>setActiveTab(i)}
            />
          ))}
          <button onClick={addTab}>➕</button>
          <button onClick={removeTab}>➖</button>
        </div>
        {tabs.length>0 && (
          <textarea
            value={tabs[activeTab].content}
            onChange={e=>updateTabContent(activeTab,e.target.value)}
            rows={6}
            style={{ width:'100%', fontFamily:'monospace', padding:'8px', borderRadius:'6px' }}
          />
        )}
      </section>

      {/* Generate Button */}
      <button onClick={generateHTML5Code} style={{ margin:'10px', padding:'10px 20px' }}>🚀 Generate HTML5</button>
      {generatedCode && (
        <>
          <button onClick={copyToClipboard} style={{ margin:'10px', padding:'10px 20px' }}>📋 Copy</button>
          <button onClick={downloadHTML} style={{ margin:'10px', padding:'10px 20px' }}>💾 Download</button>
        </>
      )}

      {/* Code Output */}
      {generatedCode && (
        <pre style={{ background:'#1e1e1e', color:'#d4d4d4', padding:'16px', borderRadius:'8px', overflowX:'auto' }}>
          {generatedCode}
        </pre>
      )}
    </main>
  );
}
