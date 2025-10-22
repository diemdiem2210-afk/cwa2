'use client';
import React from 'react';

export default function EscapeRoomPage() {
  return (
    <main style={{ 
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <div style={{
        padding: '60px 40px',
        backgroundColor: 'var(--header-bg)',
        borderRadius: '12px',
        border: '2px dashed var(--border-color)',
        marginBottom: '30px'
      }}>
        <div style={{ fontSize: '72px', marginBottom: '20px' }}>🔒</div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--button-bg)' }}>
          Escape Room
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-color)', opacity: 0.8, marginBottom: '30px' }}>
          This page is under development and will feature an interactive escape room challenge.
        </p>
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--warning-color)',
          color: '#856404',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          🚧 Coming Soon: Puzzle-solving adventures and brain teasers!
        </div>
      </div>

      <div style={{
        padding: '24px',
        backgroundColor: 'var(--bg-color)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        textAlign: 'left'
      }}>
        <h2>🎮 Planned Features:</h2>
        <ul style={{ paddingLeft: '24px', lineHeight: '1.8' }}>
          <li>Interactive puzzle challenges</li>
          <li>Timer-based escape scenarios</li>
          <li>Multiple difficulty levels</li>
          <li>Progress tracking</li>
          <li>Leaderboard system</li>
        </ul>
      </div>
    </main>
  );
}
