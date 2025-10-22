'use client';
import React, { useState, useEffect } from 'react';

interface Tab {
  id: number;
  title: string;
  content: string;
}

const TabsGenerator: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  // Instrumentation helper
  const logEvent = (event: string, tab?: Tab) => {
    console.log(`[INSTRUMENTATION] Event: ${event}, tabId: ${tab?.id ?? 'N/A'}, timestamp: ${new Date().toISOString()}`);
  };

  // Load tabs from API
  useEffect(() => {
    fetch('/api/tabs')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setTabs(data);
        else setTabs([{ id: 1, title: 'Tab 1', content: 'This is Tab 1 content' }]);
      })
      .catch(error => {
        console.error('Failed to load tabs:', error);
        setTabs([{ id: 1, title: 'Tab 1', content: 'This is Tab 1 content' }]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Save tab to database
  const saveTab = async (tab: Tab) => {
    if (!tab) return;
    try {
      const method = tab.id ? 'PUT' : 'POST';
      await fetch('/api/tabs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tab),
      });
      logEvent('saveTab', tab);
    } catch (error) {
      console.error('Failed to save tab:', error);
    }
  };

  // Add new tab
  const addTab = async () => {
    const newTab = { title: `Tab ${tabs.length + 1}`, content: '' };
    try {
      const res = await fetch('/api/tabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTab),
      });
      const saved = await res.json();
      setTabs([...tabs, saved]);
      setActiveTab(tabs.length);
      logEvent('addTab', saved);
    } catch (error) {
      console.error('Failed to add tab:', error);
      const localTab = { ...newTab, id: Date.now() };
      setTabs([...tabs, localTab]);
      setActiveTab(tabs.length);
      logEvent('addTab', localTab);
    }
  };

  // Remove active tab
  const removeTab = async () => {
    if (tabs.length <= 1) return;
    const tabToDelete = tabs[activeTab];
    try {
      await fetch('/api/tabs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: tabToDelete.id }),
      });
    } catch (error) {
      console.error('Failed to delete tab:', error);
    }
    const newTabs = tabs.filter((_, i) => i !== activeTab);
    setTabs(newTabs);
    setActiveTab(Math.max(Math.min(activeTab, newTabs.length - 1), 0));
    logEvent('removeTab', tabToDelete);
  };

  // Update content live
  const updateTabContent = (index: number, content: string) => {
    if (index < 0 || index >= tabs.length) return;
    const updated = [...tabs];
    updated[index].content = content;
    setTabs(updated);
    logEvent('updateTabContent', updated[index]);
  };

  // Lambda function to generate dynamic HTML
  const generateHTMLPage = (tab: Tab) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${tab.title}</title>
<style>
  body { font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; }
  h1 { color: #667eea; }
  pre { background: #eee; padding: 10px; border-radius: 5px; }
</style>
</head>
<body>
  <h1>${tab.title}</h1>
  <pre>${tab.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>
`;

  // Open dynamic page in new window
  const openDynamicPage = (tab: Tab) => {
    const htmlString = generateHTMLPage(tab);
    const blob = new Blob([htmlString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    
    if (!newWindow) {
      alert('Pop-up blocked! Please allow pop-ups for this site.');
    } else {
      // Clean up the URL after a short delay
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
    
    logEvent('openDynamicPage', tab);
  };

  if (loading) return <p>Loading...</p>;
  if (tabs.length === 0) return <p>No tabs available</p>;

  const safeActiveTab = Math.min(activeTab, tabs.length - 1);
  const currentTab = tabs[safeActiveTab];

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {tabs.map((tab, index) => (
          <input
            key={tab.id}
            value={tab.title}
            onChange={(e) => {
              const updated = [...tabs];
              updated[index].title = e.target.value;
              setTabs(updated);
              logEvent('updateTabTitle', updated[index]);
            }}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: safeActiveTab === index ? '2px solid #667eea' : '1px solid #ccc',
              cursor: 'pointer',
              minWidth: '80px'
            }}
            onClick={() => setActiveTab(index)}
          />
        ))}

        <button onClick={addTab} style={{ padding: '6px 12px', borderRadius: '6px' }}>➕</button>
        <button 
          onClick={removeTab} 
          disabled={tabs.length <= 1}
          style={{ 
            padding: '6px 12px', 
            borderRadius: '6px',
            opacity: tabs.length <= 1 ? 0.5 : 1,
            cursor: tabs.length <= 1 ? 'not-allowed' : 'pointer'
          }}
        >
          ➖
        </button>
        <button
          onClick={() => saveTab(currentTab)}
          style={{ padding: '6px 12px', borderRadius: '6px', background: '#667eea', color: 'white' }}
        >
          💾 Save
        </button>

        <button
          onClick={() => openDynamicPage(currentTab)}
          style={{ padding: '6px 12px', borderRadius: '6px', background: '#22c55e', color: 'white' }}
        >
          🌐 Open Page
        </button>
      </div>

      <textarea
        value={currentTab.content}
        onChange={(e) => updateTabContent(safeActiveTab, e.target.value)}
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontFamily: 'monospace',
          resize: 'vertical'
        }}
      />
    </div>
  );
};

export default TabsGenerator;
