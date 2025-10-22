'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Header({ theme, onThemeToggle, activeTab, onTabChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // <- added
  const pathname = usePathname();
  const studentNumber = '22465403';

  // --- Responsive check ---
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/escape-room', label: 'Escape Room', id: 'escape-room' },
    { href: '/coding-races', label: 'Coding Races', id: 'coding-races' },
    { href: '/court-room', label: 'Court Room', id: 'court-room' },
    { href: '/about', label: 'About', id: 'about' }
  ];

  const handleMenuClick = (id: string) => {
    onTabChange(id);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--header-bg)',
        borderBottom: '2px solid var(--border-color)',
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
      role="banner"
    >
      {/* Student Number - Top Left */}
      <div 
        style={{
          position: 'absolute',
          top: '8px',
          left: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          padding: '4px 8px',
          backgroundColor: 'var(--button-bg)',
          color: 'white',
          borderRadius: '4px',
          zIndex: 1001
        }}
        aria-label={`Student Number: ${studentNumber}`}
      >
        {studentNumber}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        marginTop: '20px'
      }}>
        {/* Logo/Title */}
        <Link 
          href="/"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'var(--text-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onClick={() => handleMenuClick('home')}
          aria-label="Go to homepage"
        >
          🔧 Code Generator
        </Link>

        {/* Desktop Navigation */}
        <nav 
          style={{ 
            display: !isMobile ? 'flex' : 'none', // <- changed
            alignItems: 'center', 
            gap: '20px' 
          }}
          aria-label="Main navigation"
        >
          <ul style={{
            display: 'flex',
            gap: '4px',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => handleMenuClick(item.id)}
                  style={{
                    display: 'block',
                    padding: '8px 16px',
                    textDecoration: 'none',
                    color: pathname === item.href ? 'white' : 'var(--text-color)',
                    backgroundColor: pathname === item.href ? 'var(--button-bg)' : 'transparent',
                    borderRadius: '6px',
                    fontWeight: pathname === item.href ? 'bold' : 'normal',
                    transition: 'all 0.2s ease',
                    border: '1px solid transparent'
                  }}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onMouseEnter={(e) => {
                    if (pathname !== item.href) {
                      e.currentTarget.style.backgroundColor = 'var(--header-bg)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== item.href) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-color)',
              borderRadius: '6px'
            }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
        </nav>

        {/* Hamburger Menu Button - Mobile */}
        <button
          onClick={toggleMenu}
          style={{
            display: isMobile ? 'flex' : 'none', // <- changed
            flexDirection: 'column',
            gap: '3px',
            padding: '8px',
            backgroundColor: 'transparent',
            border: '1px solid var(--border-color)',
            borderRadius: '4px'
          }}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
        >
          <span style={{ 
            width: '20px', 
            height: '2px', 
            backgroundColor: 'var(--text-color)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(45deg) translateY(5px)' : 'none'
          }}></span>
          <span style={{ 
            width: '20px', 
            height: '2px', 
            backgroundColor: 'var(--text-color)',
            transition: 'all 0.3s ease',
            opacity: menuOpen ? 0 : 1
          }}></span>
          <span style={{ 
            width: '20px', 
            height: '2px', 
            backgroundColor: 'var(--text-color)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none'
          }}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav 
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--header-bg)',
            border: '1px solid var(--border-color)',
            borderTop: 'none',
            padding: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
          aria-label="Mobile navigation"
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {menuItems.map((item) => (
              <li key={item.id} style={{ marginBottom: '8px' }}>
                <Link
                  href={item.href}
                  onClick={() => handleMenuClick(item.id)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    textDecoration: 'none',
                    color: 'var(--text-color)',
                    borderRadius: '6px',
                    backgroundColor: pathname === item.href ? 'var(--button-bg)' : 'transparent',
                    fontWeight: pathname === item.href ? 'bold' : 'normal'
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li style={{ marginTop: '16px' }}>
              <button
                onClick={onThemeToggle}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-color)'
                }}
              >
                {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
