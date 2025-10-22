'use client';
import React from 'react';

export default function Footer() {
  const studentName = 'Trang Tran';
  const studentNumber = '22465403';
  const currentDate = new Date().toLocaleDateString('en-AU', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <footer 
      style={{
        backgroundColor: 'var(--footer-bg)',
        color: 'var(--footer-text)',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
        borderTop: '2px solid var(--border-color)'
      }}
      role="contentinfo"
    >
      <p style={{ margin: 0, fontSize: '14px' }}>
        &copy; {new Date().getFullYear()} <strong>{studentName}</strong> | 
        Student Number: <strong>{studentNumber}</strong> | 
        Created: <strong>{currentDate}</strong>
      </p>
    </footer>
  );
}
