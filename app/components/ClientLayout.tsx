
'use client';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
  if (typeof window === "undefined" || typeof document === "undefined") return; // ⛔ Skip on server

  // Load theme from system preference
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(systemTheme);

  // Apply theme using class instead of data-theme
  if (systemTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Load active tab from current path
  const currentPath = window.location.pathname;
  const pathToTab: { [key: string]: string } = {
    '/': 'home',
    '/about': 'about',
    '/escape-room': 'escape-room',
    '/coding-races': 'coding-races',
    '/court-room': 'court-room',
  };
  setActiveTab(pathToTab[currentPath] || 'home');
}, []);


  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Use classList instead of setAttribute for theme
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`Active tab changed to: ${tab}`);
  };

  return (
    <>
      <Header 
        theme={theme} 
        onThemeToggle={toggleTheme}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <div style={{ minHeight: 'calc(100vh - 140px)', paddingTop: '100px' }}>
        {children}
      </div>
      <Footer />
    </>
  );
}